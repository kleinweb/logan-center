<?php

// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

namespace Klein\LoganCenter\Providers\Headless;

use Klein\LoganCenter\Interfaces\Provider;
use WP_Post;
use WP_REST_Response;

class PostPreview implements Provider
{
    const API_ENDPOINT = LOGAN_CENTER_FRONTEND_API_BASE . '/preview';

    public function register()
    {
        add_filter('preview_post_link', [$this, 'filterPreviewPostLink'], 10, 2);
        add_filter('rest_prepare_page', [$this, 'filterRestPreviewLink'], 10, 2);
        add_filter('rest_prepare_post', [$this, 'filterRestPreviewLink'], 10, 2);
    }

    /**
     * Prepare custom preview link.
     *
     * @param string $link WordPress preview link.
     * @param WP_Post $post Current post object.
     * @return string       The headless WordPress preview link.
     */
    public function filterPreviewPostLink(string $link, WP_Post $post): string
    {
        $args = kleinweb_prepare_post_preview_query_args($post)
            + [
                // FIXME: needs proper escaping...
                // 'uri' => sanitize_url(wp_make_link_relative($link))
            ];
        return add_query_arg($args, self::API_ENDPOINT);
    }

    /**
     * Include customized preview link in REST API post data responses.
     *
     * This is used within the block editor, which is the most likely place
     * that an editor will initiate a preview request.
     */
    public function filterRestPreviewLink(WP_REST_Response $response, WP_Post $post): WP_REST_Response
    {
        if ($post->post_status === 'draft') {
            $response->data['link'] = get_preview_post_link($post);
        }
        return $response;

        // TODO: might still need this
        // switch ($post->post_status) {
        //     case 'draft':
        //         break;
        //     case 'publish':
        //         // $baseUrl = untrailingslashit(LOGAN_CENTER_PLUGIN_URL);
        //         // $permalink = get_permalink($post);
        //         // $siteUrl = get_site_url();
        //         // if (false !== stristr($permalink, $siteUrl)) {
        //         //     $permalink = str_ireplace($siteUrl, $baseUrl, $permalink);
        //         // }
        //         // $response->data['link'] = $permalink;
        //         break;
        // }
    }
}
