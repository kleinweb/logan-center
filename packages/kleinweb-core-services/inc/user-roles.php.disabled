<?php

// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

/**
 * Configuration for core user roles and capabilities.
 *
 * FIXME: The "Site Admin" capabilities need work -- it's currently possible for them to create a new Administrator user.
 *
 * @package kleinweb-core-services
 */

namespace Klein\Core\UserRoles;

use Alley\WP\Caper;

$admin_caps = \wp_roles()->get_role('administrator')->capabilities;
$admin_caps_names = array_filter(
    // FIXME: fatal error: must be of type array, null given
    // │[24-Feb-2023 03:55:30 UTC] PHP Warning:  Attempt to read property "capabilities" on null in /var/www/html/apps/wordpress/web/app/mu-plugins/klein-core-library/inc/user-roles.php on line 13        │
    // │[24-Feb-2023 03:55:30 UTC] PHP Fatal error:  Uncaught TypeError: array_keys(): Argument #1 ($array) must be of type array, null given in /var/www/html/apps/wordpress/web/app/mu-plugins/klein-core-│
    array_keys($admin_caps),
    fn ($x) => !is_string($x)
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
