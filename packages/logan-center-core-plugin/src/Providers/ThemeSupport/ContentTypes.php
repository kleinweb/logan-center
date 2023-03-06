<?php

// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

namespace Klein\LoganCenter\Providers\ThemeSupport;

use Klein\LoganCenter\Interfaces\Provider;

class ContentTypes implements Provider
{
    public function register()
    {
        add_action('after_setup_theme', [static::class, 'customizeEditor']);
    }

    /**
     * Customize settings for the page/post editor.
     */
    public static function customizeEditor(): void
    {
        add_post_type_support('page', 'excerpt');
    }
}
