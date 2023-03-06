<?php

// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

/**
 * Link/redirection functionality.
 *
 * @author  Klein Digital Initiatives <kleinweb@temple.edu>
 * @since   1.0.0
 * @package logan-center-core-plugin
 */

namespace Klein\LoganCenter\Providers\Headless;

use Args\wp_update_post;
use Klein\LoganCenter\Interfaces\Provider;

use function add_action;
use function get_post;
use function is_admin;
use function remove_action;
use function wp_slash;
use function wp_update_post;
use function wp_upload_dir;

class Urls implements Provider
{
    public function register()
    {
        add_action('save_post', [static::class, 'overridePostLinks']);
        add_filter('home_url', [static::class, 'filterHomeUrl'], 10, 3);
    }

    /**
     * Customize WP home URL to point to frontend.
     *
     * @param string $url Complete home URL, including path.
     * @param string $path Path relative to home URL.
     * @param  ?string $scheme Context for home URL.
     * @return string         Frontend home URL.
     */
    public static function filterHomeUrl(string $url, string $path, ?string $scheme = ''): string
    {
        global $current_screen;

        // Don't redirect REST requests.
        if ('rest' === $scheme) {
            return $url;
        }

        // Don't redirect if in Block Editor.
        // FIXME: this logic seems slightly off -- could result in error
        if ((is_string($current_screen) || is_object($current_screen)) && method_exists($current_screen, 'is_block_editor')) {
            return $url;
        }

        // Don't redirect unless in WP admin.
        if (!is_admin()) {
            return $url;
        }

        $base_url = LOGAN_CENTER_FRONTEND_URL;

        if (!$path) {
            return $base_url;
        }

        // Remove excess slash from beginning of path.
        $path = ltrim($path, '/');

        return sprintf("%s%s", $base_url, $path);
    }


    /**
     * Override links within post content on save to point to headless client.
     *
     * @param int $postId Post ID.
     */
    public static function overridePostLinks(int $postId)
    {
        // Unhook function to avoid infinite loop.
        remove_action('save_post', [static::class, 'overridePostLinks']);

        $post = get_post($postId);

        if (!$post) {
            return;
        }

        $post_content = $post->post_content;

        // Check if post content contains WP links.
        if (false === stripos($post_content, WP_HOME)) {
            return;
        }

        // Remove excess slash from end of frontend domain.
        $frontend_domain = rtrim(LOGAN_CENTER_FRONTEND_URL, '/');

        // Replace WP domain with frontend domain.
        $new_post_content = str_ireplace(WP_HOME, $frontend_domain, $post_content);

        // Revert media links.
        $upload_dir = wp_upload_dir();
        $upload_dir = str_ireplace(WP_HOME, '', $upload_dir['baseurl']);
        $new_post_content = str_ireplace(
            search: sprintf('%s%s', $frontend_domain, $upload_dir),
            replace: sprintf('%s%s', WP_HOME, $upload_dir),
            subject: $new_post_content
        );

        // Revert plugin links.
        $plugin_dir = str_ireplace(search: WP_HOME, replace: '', subject: WP_PLUGIN_URL);
        $new_post_content = str_ireplace(
            search: sprintf('%s%s', $frontend_domain, $plugin_dir),
            replace: sprintf('%s%s', WP_HOME, $plugin_dir),
            subject: $new_post_content
        );

        $postArgs = new wp_update_post();
        $postArgs->ID = $postId;
        $postArgs->post_content = wp_slash($new_post_content);

        wp_update_post($postArgs->toArray());

        // Re-hook function.
        add_action('save_post', [static::class, 'overridePostLinks']);
    }
}
