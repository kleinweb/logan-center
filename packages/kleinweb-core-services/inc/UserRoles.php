<?php

// SPDX-FileCopyrightText: 2023 Temple University
// SPDX-FileCopyrightText: 2016-2023 Automattic
// SPDX-License-Identifier: GPL-3.0-or-later

namespace Klein\Core\UserRoles;

/**
 * Helper functions that make it easy to add roles for VIP sites.
 *
 * @see <https://docs.wpvip.com/how-tos/customize-user-roles/>
 * @see <https://github.com/Automattic/vip-go-mu-plugins/blob/fc82304269f814b25ddfb257075e0c7665f96fba/vip-helpers/vip-roles.php>
 */

/**
 * Get a list of capabilities for a role.
 *
 * @param string $role Role name
 * @return array Array of caps for the role
 */
function get_role_caps($role)
{
    $caps     = array();
    $role_obj = get_role($role);

    if ($role_obj && isset($role_obj->capabilities)) {
        $caps = $role_obj->capabilities;
    }

    return $caps;
}

/**
 * Add a new role
 *
 * Usage: add_role( 'super-editor', 'Super Editor', array( 'level_0' => true ) );
 *
 * @param string $role Role name
 * @param string $name Display name for the role
 * @param array $capabilities Key/value array of capabilities for the role
 */
function add_role($role, $name, $capabilities)
{
    if (array_is_list($capabilities) && !array_filter($capabilities, 'is_bool')) {
        $capabilities = array_flip($capabilities);
        $capabilities = array_map('__return_true', $capabilities);
    }

    $role_obj = get_role($role);

    if (!$role_obj) {
        // phpcs:ignore WordPressVIPMinimum.Functions.RestrictedFunctions.custom_role_add_role
        add_role($role, $name, $capabilities);

        _maybe_refresh_current_user_caps($role);
    } else {
        merge_role_caps($role, $capabilities);
    }
}

/**
 * Add new or change existing capabilities for a given role
 *
 * Usage: merge_role_caps( 'author', array( 'publish_posts' => false ) );
 *
 * @param string $role Role name
 * @param array $caps Key/value array of capabilities for this role
 */
function merge_role_caps($role, $caps)
{
    $role_obj = get_role($role);

    if (!$role_obj) {
        return;
    }

    $current_caps = (array) get_role_caps($role);
    $new_caps     = array_merge($current_caps, (array) $caps);

    foreach ($new_caps as $cap => $role_can) {
        if ($role_can) {
            $role_obj->add_cap($cap);
        } else {
            $role_obj->remove_cap($cap);
        }
    }

    _maybe_refresh_current_user_caps($role);
}

/**
 * Completely override capabilities for a given role
 *
 * Usage: override_role_caps( 'editor', array( 'level_0' => false ) );
 *
 * @param string $role Role name
 * @param array $caps Key/value array of capabilities for this role
 */
function override_role_caps($role, $caps)
{
    $role_obj = get_role($role);

    if (!$role_obj) {
        return;
    }

    $role_obj->capabilities = (array) $caps;

    $roles = wp_roles();

    $roles->roles[$role]['capabilities'] = $caps;
    update_option($roles->role_key, $roles->roles);

    _maybe_refresh_current_user_caps($role);
}

/**
 * Duplicate an existing role and modify some caps
 *
 * Usage: duplicate_role( 'administrator', 'station-administrator', 'Station Administrator', array( 'manage_categories' => false ) );
 *
 * @param string $from_role Role name
 * @param string $to_role_slug Role name
 * @param string $to_role_name Display name for the role
 * @param array $modified_caps Key/value array of capabilities for the role
 */
function duplicate_role($from_role, $to_role_slug, $to_role_name, $modified_caps)
{
    $caps = array_merge(get_role_caps($from_role), $modified_caps);
    add_role($to_role_slug, $to_role_name, $caps);
}

/**
 * Add capabilities to an existing role
 *
 * Usage: add_role_caps( 'contributor', array( 'upload_files' ) );
 *
 * @param string $role Role name
 * @param array $caps Capabilities to add to the role
 */
function add_role_caps($role, $caps)
{
    $filtered_caps = array();
    foreach ((array) $caps as $cap) {
        $filtered_caps[$cap] = true;
    }
    merge_role_caps($role, $filtered_caps);
}

/**
 * Remove capabilities from an existing role
 *
 * Usage: remove_role_caps( 'author', array( 'publish_posts' ) );
 *
 * @param string $role Role name
 * @param array $caps Capabilities to remove from the role
 */
function remove_role_caps($role, $caps)
{
    $filtered_caps = array();
    foreach ((array) $caps as $cap) {
        $filtered_caps[$cap] = false;
    }
    merge_role_caps($role, $filtered_caps);
}

/**
 * Force refreshes the current user's capabilities if they belong to the specified role.
 *
 * This is to prevent a race condition where the WP_User and its related caps are generated before or roles changes.
 *
 * @param string $role Role name
 */
function _maybe_refresh_current_user_caps($role)
{
    if (is_user_logged_in() && current_user_can($role)) {
        wp_get_current_user()->get_role_caps();
    }
}
