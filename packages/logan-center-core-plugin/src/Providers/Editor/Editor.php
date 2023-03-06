<?php

// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

/**
 * Generic post editor functionality.
 */

namespace Klein\LoganCenter\Providers\Editor;

use Klein\LoganCenter\Interfaces\Provider;

class Editor implements Provider
{
    public function register(): void
    {
        add_filter('embed_oembed_html', [static::class, 'embedWrapper'], 10, 4);
    }

    /**
     * Wrap WYSIWYG embed in a div wrapper for responsive embeds.
     * TODO: does this actually matter on a headless site?
     */
    public static function embedWrapper($html, $_url, $_attr, $_id): string
    {
        return '<div class="iframe-wrapper">' . $html . '</div>';
    }
}
