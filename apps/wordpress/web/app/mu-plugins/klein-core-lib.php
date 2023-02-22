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
 * Configure baseline feature support.
 */
add_action('after_setup_theme', __NAMESPACE__ . '\\after_setup_theme_add_baseline_feature_support');
function after_setup_theme_add_baseline_feature_support()
{
    add_theme_support('menus');
    add_theme_support('post-thumbnails');
}

/**
 * Early-loading custom defaults.
 */
add_action('init', __NAMESPACE__ . '\\action_init');
function action_init()
{
    // Enable tags for Pages
    register_taxonomy_for_object_type('post_tag', 'page');

    // Enable excerpts for pages
    add_post_type_support('page', 'excerpt');

    // Disable the hiding of big images
    add_filter('big_image_size_threshold', '__return_false');
    add_filter('max_srcset_image_width', '__return_false');
}
