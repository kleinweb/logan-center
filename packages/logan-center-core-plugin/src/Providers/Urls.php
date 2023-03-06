<?php

// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

namespace Klein\LoganCenter\Providers;

use Klein\LoganCenter\Interfaces\Provider;

class Urls implements Provider
{
    const CATEGORY_BASE = '/themes';

    const CATEGORY_TAG = '%category%';

    const POST_TAG = '%postname%';

    const PAGE_TAG = '%pagename%';

    public function register()
    {
        /**
         * @see <https://github.com/wp-graphql/wp-graphql/issues/1612>
         */
        add_action('init', [self::class, 'maybeEnsureCustomPermalinks']);
    }

    public static function maybeEnsureCustomPermalinks(): void
    {
        if (!get_option('permalink_structure')) {
            self::ensureCustomPermalinks();
        }
    }

    /**
     * Save permalinks to a custom setting.
     */
    public static function ensureCustomPermalinks(): void
    {
        // FIXME: avoid accessing wp globals directly, this is very dangerous
        global $wp_rewrite;
        update_option('rewrite_rules', false);
        $wp_rewrite->set_permalink_structure(sprintf(
            '%s/%s/%s',
            self::CATEGORY_BASE,
            self::CATEGORY_TAG,
            self::POST_TAG
        ));
        $wp_rewrite->set_category_base(self::CATEGORY_BASE . '/');
        $wp_rewrite->flush_rules();
    }
}
