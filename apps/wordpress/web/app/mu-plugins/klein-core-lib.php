<?php

// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

/**
 * Plugin Name:  Klein Core Library
 * Plugin URI:   https://github.com/kleinweb
 * Description:  Core library plugin for Klein College WordPress sites.
 * Version:      0.1.0
 * Author:       Klein Digital Initiatives
 * Author URI:   https://klein.temple.edu
 * License:      GPL-3.0-or-later
 */

 namespace Klein\CoreLibrary;

/**
 * Register nav menu defaults.
 *
 * @author Kleinweb
 * @since 0.1.0
 */
function register_menus()
{
    add_theme_support('post-thumbnails');
    register_nav_menus(
        [
            'primary-menu' => esc_html__('Primary Menu'),
            'footer-menu'  => esc_html__('Footer Menu'),
        ]
    );
}
add_action('after_setup_theme', __NAMESPACE__ . '\register_menus');
