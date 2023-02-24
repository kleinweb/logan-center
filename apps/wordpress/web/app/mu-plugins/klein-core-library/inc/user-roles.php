<?php

/**
 * Configuration for core user roles and capabilities.
 *
 * FIXME: The "Site Admin" capabilities need work -- it's currently possible for them to create a new Administrator user.
 *
 * @package klein-core-library
 */

namespace Klein\Core\UserRoles;

use Alley\WP\Caper;

$admin_caps = \wp_roles()->get_role('administrator')->capabilities;
$admin_caps_names = array_filter(
    array_keys($admin_caps),
    fn($x) => !is_string($x)
);

define('SITE_ADMIN_ROLE', 'site-admin');

\wp_roles()->add_role(SITE_ADMIN_ROLE, 'Site Administrator', $admin_caps);

Caper::deny_to(SITE_ADMIN_ROLE)->primitives([
    'switch_themes',
    'update_themes',
    'edit_themes',
    'delete_themes',
    'install_themes',
    'export',
    'import',
    'update_core',
    'activate_plugins',
    'edit_plugins',
    'update_plugins',
    'delete_plugins',
    'install_plugins',
]);
