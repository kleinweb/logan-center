<?php

// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

/**
 * Media functionality.
 *
 * @author  Klein Digital Initiatives <kleinweb@temple.edu>
 * @since   1.0.0
 * @package logan-center-core-plugin
 */

namespace Klein\LoganCenter\Providers\ThemeSupport;

use Klein\LoganCenter\Interfaces\Provider;

use function add_image_size;

class Media implements Provider
{
    public function register(): void
    {
        add_action('after_setup_theme', [static::class, 'customizeMedia']);

        /**
         * Disable WordPress core's "BIG Image" image autoscaling functionality.
         * @see <https://developer.wordpress.org/reference/hooks/big_image_size_threshold/>
         */
        add_filter('big_image_size_threshold', '__return_false');
    }

    /**
     * Add custom image sizes.
     */
    public static function customizeMedia(): void
    {
        add_theme_support('post-thumbnails');
        add_image_size('nineteen-twenty', 1920, 1080, true);
    }
}
