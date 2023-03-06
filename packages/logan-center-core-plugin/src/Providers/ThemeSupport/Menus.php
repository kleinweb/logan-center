<?php

// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

namespace Klein\LoganCenter\Providers\ThemeSupport;

use Klein\LoganCenter\Interfaces\Provider;

use function esc_html__;
use function register_nav_menus;

class Menus implements Provider
{
    public function register()
    {
        add_action('after_setup_theme', [self::class, 'registerMenuLocations']);
    }

    /**
     * Register nav menu locations.
     */
    public static function registerMenuLocations(): void
    {
        register_nav_menus(
            [
                'footer-menu' => esc_html__('Footer Menu'),
                'header-menu' => esc_html__('Header Menu'),
            ]
        );
    }
}
