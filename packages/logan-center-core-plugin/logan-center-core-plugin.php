<?php

// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

/**
 * Plugin Name: Logan Center Core Plugin
 * Plugin URI:  https://github.com/kleinweb/logan-center/packages/logan-center-core-plugin
 * Description: Plugin providing core functionality for the Logan Center backend.
 * Version:     1.0.0
 * Author:      Klein Digital Initiatives <kleinweb@temple.edu>
 * Author URI:  https://github.com/kleinweb
 * License:     GPL-3.0-or-later OR MIT
 *
 * @package logan-center-core-plugin
 */

/** @noinspection PhpUndefinedConstantInspection */

declare(strict_types=1);

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    die;
}

const LOGAN_CENTER_PLUGIN_NAME = 'logan-center-core-plugin';
// const LOGAN_CENTER_PLUGIN_VERSION = '1.0.0';

// TODO: should not assume that it's being loaded from mu-plugins
define('LOGAN_CENTER_PLUGIN_URL', content_url('mu-plugins/' . LOGAN_CENTER_PLUGIN_NAME));
define('LOGAN_CENTER_PLUGIN_DIR', dirname(__FILE__));

define('LOGAN_CENTER_BACKEND_URL', untrailingslashit(WP_HOME));

// FIXME: `NEXT_FRONTEND_URL` *MUST* be defined for WordPress, but IDE reports as undefined
define('LOGAN_CENTER_FRONTEND_URL', untrailingslashit(NEXT_FRONTEND_URL));
const LOGAN_CENTER_FRONTEND_API_BASE = LOGAN_CENTER_FRONTEND_URL . '/api/wp';

// Load the plugin structures and Composer dependencies.
require_once __DIR__ . '/vendor/autoload.php';

// Initialize the plugin.
$LoganCenterPlugin = new Klein\LoganCenter\Providers\LoganCenterPluginServiceProvider();
$LoganCenterPlugin->register();

// Run plugin bootloader.
add_action('init', [$LoganCenterPlugin, 'boot']);
