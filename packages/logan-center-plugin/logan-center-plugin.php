<?php

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
    // TODO: Media & Text ?
    $whitelist = [
        'core/verse',
        'core/pullquote',
        'core/paragraph',
        'core/table',
        'core/image',
        'core/heading',
        'core/list',
        // 'core/list-item', // TODO: is this an inner-block of `core/list`? do we need it?
        'core/quote',
        // 'core/embed', // TODO: do we need to support this specifically? any concerts?
        'core/video',
        // 'core/spacer',
        // 'core/button',
    ];

    return array_merge($acf_blocks, $whitelist);
}

/**
 * Disable the fullscreen editor as user default.
 *
 * @see https://jeanbaptisteaudras.com/en/2020/03/disable-block-editor-default-fullscreen-mode-in-wordpress-5-4/
 */
add_action('enqueue_block_editor_assets', __NAMESPACE__ . '\disable_editor_fullscreen_default');
function disable_editor_fullscreen_default()
{
    $script = "window.onload = function() { const isFullscreenMode = wp.data.select( 'core/edit-post' ).isFeatureActive( 'fullscreenMode' ); if ( isFullscreenMode ) { wp.data.dispatch( 'core/edit-post' ).toggleFeature( 'fullscreenMode' ); } }";
    wp_add_inline_script('wp-blocks', $script);
}
