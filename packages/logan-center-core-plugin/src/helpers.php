<?php

// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

/**
 * Prepare a set of standard preview link URL params for a post.
 * @param WP_Post $post
 * @return array
 */
function kleinweb_prepare_post_preview_query_args(WP_Post $post): array
{
    return [
        'id' => $post->ID,
        'postType' =>
            get_post_type_object($post->post_type)
                ->graphql_single_name
            ?? $post->post_type,
        'preview' => 'true',
        'slug' => strlen($post->post_name) > 0
            ? $post->post_name
            : sanitize_title($post->post_title),
        'status' => get_post_status($post),
    ];
}
