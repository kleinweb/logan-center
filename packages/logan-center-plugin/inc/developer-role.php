<?php

declare(strict_types=1);

/**
 * Handles Developer role.
 */

/**
 * Add Developer role
 */
function custom_add_developer_role()
{
    global $wp_roles;

    $role = $wp_roles ?? new WP_Roles();
    $adminRole = $role->get_role('administrator');

    add_role('developer', __('Developer', 'kleinweb'), $adminRole->capabilities);

    // Set initial user to Developer
    $user = new WP_User(1);
    $user->set_role('developer');
    $user->add_role('administrator');
}

// add_action(KLEINWEB_BACKEND_PLUGIN_ACTIVATION_HOOK, 'custom_add_developer_role');
add_action('init', 'custom_add_developer_role');

/**
 * Prevent non-dev from deleting locked pages/posts.
 *
 * @param  int  $target_post Post ID.
 */
function check_custom_post_lock($target_post)
{
    $target_post = get_post($target_post);

    // Abort if just trashing a revision
    if (wp_is_post_revision($target_post)) {
        return;
    }

    if (! is_user_developer() && $target_post->prevent_deletion) {
        echo 'Only a user with the Developer role can delete this page.<br/><br/>';
        echo '<a href="javascript:history.back()">Back</a>';
        exit;
    }
}
add_action('wp_trash_post', 'check_custom_post_lock', 10, 1);
add_action('before_delete_post', 'check_custom_post_lock', 10, 1);

/**
 * Conditional to test if current user is a developer.
 *
 * @return bool True if developer or false.
 */
function is_user_developer()
{
    $roles = wp_get_current_user()->roles;

    return in_array('developer', $roles);
}

/**
 * Makes sure Developer role can sort Nested Pages automatically.
 */
function give_developer_ordering_permissions()
{
    if (! is_plugin_active('wp-nested-pages/nestedpages.php')) {
        return;
    }

    $allowed_to_sort = get_option('nestedpages_allowsorting');

    if (! $allowed_to_sort) {
        $allowed_to_sort = [];
    }

    if (in_array('developer', $allowed_to_sort)) {
        return;
    }

    $allowed_to_sort[] = 'developer';
    update_option('nestedpages_allowsorting', $allowed_to_sort);
}
add_action('admin_init', 'give_developer_ordering_permissions', 1);

/**
 * Add 'is-developer' class to WP admin pages if we're a developer.
 *
 * @param  string  $classes Space-separated list of CSS classes.
 * @return string
 */
function add_developer_admin_body_class($classes)
{
    global $post;

    if (is_user_developer()) {
        $classes .= ' is-developer';
    }
    if (! empty($post->prevent_deletion)) {
        $classes .= ' is-developer-locked';
    }
    if (empty($post->post_name)) {
        $classes .= ' no-slug';
    }

    return $classes;
}
add_filter('admin_body_class', 'add_developer_admin_body_class');
