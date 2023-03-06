<?php

// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

/**
 * Gutenberg blocks configuration.
 *
 * @package logan-center-plugin
 */

namespace Klein\LoganCenter\Providers\Editor;

use Klein\LoganCenter\Interfaces\Provider;

use function get_dynamic_block_names;

const ALLOWED_BLOCKS = [
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

class Blocks implements Provider
{
    public function register()
    {
        /**
         * Whitelist blocks for the Gutenberg editor.
         *
         * @see <https://github.com/WordPress/gutenberg/tree/trunk/packages/block-library/src>
         * @param array $allowed_block_types Array of block type slugs.
         * @return array
         */
        add_filter('allowed_block_types_all', [static::class, 'filterAllowedBlockTypes']);
    }

    public static function filterAllowedBlockTypes($_allowedBlockTypes): array
    {
        return array_merge(self::getAcfBlocks(), ALLOWED_BLOCKS);
    }

    public static function getAcfBlocks(): array
    {
        return array_filter(get_dynamic_block_names(), fn($name) => str_contains($name, 'acf/'));
    }
}
