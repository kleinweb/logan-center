<?php

// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

namespace Klein\LoganCenter\Providers\Headless;

use Klein\LoganCenter\Interfaces\Provider;
use WP_Post;

use function add_action;
use function add_query_arg;
use function esc_url_raw;
use function wp_remote_post;

class Revalidation implements Provider
{
    const API_ENDPOINT = LOGAN_CENTER_FRONTEND_API_BASE . '/revalidate';

    public function register()
    {
        add_action('transition_post_status', [$this, 'onPostStatusTransition'], 10, 3);
    }

    /**
     * Send a revalidation request on non-draft post status transitions.
     */
    public function onPostStatusTransition($new_status, $old_status, $post)
    {
        // TODO: hmm, what state transition is this reflecting?
        if ('draft' === $new_status && 'draft' === $old_status) {
            return;
        }
        self::request($post);
    }

    /**
     * Flush the frontend cache when a post is updated.
     *
     * This function will fire anytime a post is updated.
     * Including: the post status, comments, meta, terms, etc.
     *
     * The slug MUST have a leading slash and MUST NOT have a trailing slash!
     *
     * @usage https://nextjswp.com/api/wordpress/revalidate?token=123&slug=/the-slug
     *
     * @see    https://developer.wordpress.org/reference/hooks/edit_post/
     * @see    https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#using-on-demand-revalidation
     * @since  1.0.0
     * @author Greg Rickaby
     * @param WP_Post $post The post object.
     */
    public function request(WP_Post $post)
    {
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }

        $requestArgs = kleinweb_prepare_post_preview_query_args($post);
        $apiUrl = add_query_arg($requestArgs, self::API_ENDPOINT);
        $response = wp_remote_post(
            esc_url_raw($apiUrl),
            // FIXME: this may no longer be a thing in current Next.js app directory
            ['blocking' => true,]
        );

        // TODO: will this be handled by sentry or something?
        if (is_wp_error($response)) {
            $error_message = $response->get_error_message();
            error_log('Revalidation error: ' . $error_message); // phpcs:ignore
        }
    }
}
