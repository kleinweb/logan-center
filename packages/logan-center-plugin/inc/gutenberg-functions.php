<?php

declare(strict_types=1);

/**
 * Extends WP-Gutenberg-GraphQL function.
 *
 * @package KleinBackend
 */

/**
 * Whitelist blocks for the Gutenberg editor.
 * SEE https://github.com/WordPress/gutenberg/tree/trunk/packages/block-library/src
 *
 * @param array $allowed_block_types Array of block type slugs.
 * @return array
 */
function kleinweb_block_whitelist($allowed_block_types)
{
    // Assuming you want all ACF custom blocks.
    $acf_blocks = array_filter(
        get_dynamic_block_names(),
        static function ($name) {
            return strpos($name, 'acf/') !== false;
        }
    );

    // Add specific core blocks to whitelist
    $whitelist = [
        'core/paragraph',
        'core/image',
        'core/heading',
        'core/list',
        'core/list-item',
        'core/quote',
        'core/embed',
        'core/spacer',
        'core/buttons',
        'core/button',
    ];

    return array_merge($acf_blocks, $whitelist);
}
add_filter('allowed_block_types_all', 'kleinweb_block_whitelist');

/**
 * Disable the fullscreen editor as default
 * SEE: https://jeanbaptisteaudras.com/en/2020/03/disable-block-editor-default-fullscreen-mode-in-wordpress-5-4/
 */
function kleinweb_disable_editor_fullscreen_default()
{
    $script = "window.onload = function() { const isFullscreenMode = wp.data.select( 'core/edit-post' ).isFeatureActive( 'fullscreenMode' ); if ( isFullscreenMode ) { wp.data.dispatch( 'core/edit-post' ).toggleFeature( 'fullscreenMode' ); } }";
    wp_add_inline_script('wp-blocks', $script);
}
add_action('enqueue_block_editor_assets', 'kleinweb_disable_editor_fullscreen_default');

/**
 * Disable gutenberg features
 */
add_theme_support('editor-gradient-presets', []);
add_theme_support('disable-custom-gradients');
