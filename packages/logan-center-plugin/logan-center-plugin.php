<?php

// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

/*
 * Plugin Name: Logan Center Plugin
 * Description: Plugin for the Logan Center WordPress site.
 * Author: Klein Digital Initiatives
 * Author URI: https://github.com/logancenter
 * Version: 1.0.0
 * Plugin URI: https://github.com/logancenter/logan-center
 * GitHub Plugin URI: logancenter/logan-center
 * License: GPL-3.0-or-later
 */

declare(strict_types=1);

namespace Klein\LoganCenter;

/**
 * Exit if accessed directly.
 *
 * Prevent direct access to this file.
 *
 * @since 0.1.0
 */

if (! defined('ABSPATH')) {
    exit;
}

require_once __DIR__ . '/vendor/autoload.php';

define('KLEINWEB_BACKEND_PLUGIN_ACTIVATION_HOOK', 'activate_kleinweb_backend');
define('KLEINWEB_BACKEND_PLUGIN_DEACTIVATION_HOOK', 'deactivate_kleinweb_backend');

register_activation_hook(__FILE__, 'activate_kleinweb_backend');
register_deactivation_hook(__FILE__, 'deactivate_kleinweb_backend');

define('KLEINWEB_BACKEND_PLUGIN_NAME', 'logan-center-plugin');
define('KLEINWEB_BACKEND_PLUGIN_DIR', dirname(__FILE__));
// TODO: this plugin should have no idea that it's being loaded from mu-plugins -- how to get the url then?
// define('KLEINWEB_BACKEND_PLUGIN_URL', WP_PLUGIN_URL . '/' . KLEINWEB_BACKEND_PLUGIN_NAME);
define('KLEINWEB_BACKEND_PLUGIN_URL', WP_CONTENT_URL . '/mu-plugins/' . KLEINWEB_BACKEND_PLUGIN_NAME);
define('KLEINWEB_BACKEND_PLUGIN_VERSION', '1.0.0');

// TODO: this should be available, but figure out how to "do it right" without warnings
define('KLEINWEB_FRONTEND_URL', NEXT_FRONTEND_URL);

/**
 * Load all modules.
 */
require_once __DIR__ . '/inc/wp-functions.php';
require_once __DIR__ . '/inc/gql-functions.php';
require_once __DIR__ . '/inc/theme-config.php';
require_once __DIR__ . '/inc/gutenberg-functions.php';
require_once __DIR__ . '/inc/acf-functions.php';
// require_once __DIR__ . '/inc/cookie-manager.php';
require_once __DIR__ . '/inc/developer-role.php';
require_once __DIR__ . '/inc/widgets.php';
require_once __DIR__ . '/inc/svg.php';
