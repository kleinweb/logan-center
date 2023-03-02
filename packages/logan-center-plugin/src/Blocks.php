<?php

// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

namespace Klein\LoganCenter\Blocks;

/**
 * Gutenberg blocks configuration.
 *
 * @package logan-center-plugin
 */

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
 *
 * @see <https://github.com/WordPress/gutenberg/tree/trunk/packages/block-library/src>
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
        'core/buttons', // NOTE: Requires `core/button`
        'core/button', // Appears to be useless without `core/buttons`
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
    ];

    return array_merge($acf_blocks, $whitelist);
}
