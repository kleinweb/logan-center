<?php

// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

/*
 * Plugin Name: Logan Center Plugin
 * Description: Plugin for the Logan Center WordPress site.
 * Author: Klein College of Media and Communication
 * Author URI: https://github.com/logancenter
 * Version: 1.0.0
 * Plugin URI: https://github.com/logancenter/logan-center
 * GitHub Plugin URI: logancenter/logan-center
 * License: GPL-3.0-or-later
 */

namespace Klein\LoganCenter;

add_action('after_setup_theme', __NAMESPACE__ . '\action_after_setup_theme');
function action_after_setup_theme()
{
    /**
     * Disable gutenberg features
     */
    add_theme_support('editor-gradient-presets', []);
    add_theme_support('disable-custom-gradients');
}

/**
 * Whitelist blocks for the Gutenberg editor.
 * SEE https://github.com/WordPress/gutenberg/tree/trunk/packages/block-library/src
 *
 * @param array $allowed_block_types Array of block type slugs.
 * @return array
 */
add_filter('allowed_block_types_all', __NAMESPACE__ . '\block_whitelist');
function block_whitelist($allowed_block_types)
{

    // Assuming you want all ACF custom blocks.
    $acf_blocks = array_filter(
        get_dynamic_block_names(),
        fn ($name) => strpos($name, 'acf/') !== false
    );

    // Add specific core blocks to whitelist
    $whitelist = [
        'core/embed',
        'core/heading',
        'core/image',
        'core/list-item', // NOTE: Requires `core/list` -- cannot be used directly
        'core/list', // NOTE: Requires `core/list-item` -- without it, only one list item can be created
        'core/media-text',
        'core/paragraph',
        'core/pullquote',
        'core/quote',
        'core/table',
        'core/verse',
        // 'core/spacer',
        // TODO: consider supporting since they come up frequently
        // 'core/buttons', // NOTE: Requires `core/button`
        // 'core/button', // Appears to be useless without `core/buttons`
    ];

    return array_merge($acf_blocks, $whitelist);
}

/**
 * Disable the fullscreen editor as user default.
 *
 * TODO: can this be added to `editor.js`?
 *
 * @see https://jeanbaptisteaudras.com/en/2020/03/disable-block-editor-default-fullscreen-mode-in-wordpress-5-4/
 * @see <https://github.com/WordPress/wordpress-develop/blob/09a0db589773cb70da86aeea2ce7f8966f90522f/src/wp-admin/edit-form-blocks.php#L31-L37>
 */
add_action('enqueue_block_editor_assets', __NAMESPACE__ . '\disable_editor_fullscreen_default');
function disable_editor_fullscreen_default()
{
    $script = "window.onload = function() { const isFullscreenMode = wp.data.select( 'core/edit-post' ).isFeatureActive( 'fullscreenMode' ); if ( isFullscreenMode ) { wp.data.dispatch( 'core/edit-post' ).toggleFeature( 'fullscreenMode' ); } }";
    wp_add_inline_script('wp-blocks', $script);
}
