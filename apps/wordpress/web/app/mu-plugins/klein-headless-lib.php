<?php

// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-FileCopyrightText: 2021-2022 Automattic
// SPDX-License-Identifier: GPL-3.0-or-later OR MIT

/**
 * Plugin Name:  Klein Headless Library
 * Plugin URI:   https://github.com/kleinweb
 * Description:  Core headless library plugin for Klein College WordPress sites.
 * Version:      0.1.0
 * Author:       Klein Digital Initiatives
 * Author URI:   https://klein.temple.edu
 * License:      GPL-3.0-or-later OR MIT
 */

namespace Klein\Headless;

use WPGraphQL\Data\Connection\UserConnectionResolver;

/**
 * Set permlinks on theme activate
 * @see <https://github.com/wp-graphql/wp-graphql/issues/1612>
 */
// add_action(
//     'after_switch_theme',
//     __NAMESPACE__ . '\action_after_switch_theme_set_custom_permalinks'
// );
function action_after_switch_theme_set_custom_permalinks()
{
    $current_setting = get_option('permalink_structure');

    // Abort if already saved to something else
    if ($current_setting) {
        return;
    }

    // Save permalinks to a custom setting, force create of rules file
    global $wp_rewrite;
    update_option('rewrite_rules', false);
    $wp_rewrite->set_permalink_structure('/p/%postname%/');
    $wp_rewrite->set_category_base('/topics/');
    $wp_rewrite->flush_rules(true);
}

/**
 * Add useful args to post/page preview URLs
 *
 * @param string   $link URL used for the post preview.
 * @param \WP_Post $post Post object.
 * @return string
 */
// add_filter(
//     'preview_post_link',
//     __NAMESPACE__ . '\filter_preview_post_link',
//     10,
//     2
// );
function filter_preview_post_link($link, $post)
{
    $args = [
        'id' => $post->ID,
        'type' => get_post_type($post),
        'status' => get_post_status($post),
        'preview' => 'true',
    ];

    // Add slug and build path
    if ($post->post_name) {
        // Build out new Preview permalink
        if (!function_exists('get_sample_permalink')) {
            require_once ABSPATH . 'wp-admin/includes/post.php';
        }

        $link = get_sample_permalink($post->ID)[0] ?? '';
        $link = str_replace(
            ['%postname%', '%pagename%'],
            $post->post_name,
            $link
        );

        $args['slug'] = $post->post_name;
        $args['uri'] = wp_make_link_relative($link);
    }

    return add_query_arg($args, $link);
}

/**
 * Includes preview link in post data for a response for Gutenberg preview link to work.
 *
 * @param \WP_REST_Response $response The response object.
 * @param \WP_Post          $post     Post object.
 * @return \WP_REST_Response
 */
// add_filter(
//     'rest_prepare_post',
//     __NAMESPACE__ . '\filter_rest_prepare_preview_link',
//     10,
//     2
// );
// add_filter(
//     'rest_prepare_page',
//     __NAMESPACE__ . '\filter_rest_prepare_preview_link',
//     10,
//     2
// );
function filter_rest_prepare_preview_link($response, $post)
{
    if ('draft' === $post->post_status) {
        $response->data['link'] = get_preview_post_link($post);
    }

    return $response;
}

/**
 * Registers a connection to Co Authors Plus in WPGraphQL
 */
add_action('plugins_loaded', __NAMESPACE__ . '\action_plugins_loaded_register_coauthors_plus_wpgraphql_connection');
function action_plugins_loaded_register_coauthors_plus_wpgraphql_connection()
{
    if (
        !function_exists('register_graphql_connection') ||
        !function_exists('get_coauthors')
    ) {
        return;
    }
    register_graphql_connection([
        'fromType' => 'Post',
        'toType' => 'User',
        'fromFieldName' => 'authors',
        'connectionTypeName' => 'PostToAuthorsConnection',
        'resolve' => function (
            \WPGraphQL\Model\Post $source,
            $args,
            $context,
            $info
        ) {
            $resolver = new UserConnectionResolver(
                $source,
                $args,
                $context,
                $info
            );
            $coauthor_ids = array_map(
                fn ($coauthor) => $coauthor->ID,
                get_coauthors($source->ID)
            );
            $resolver->set_query_arg('include', $coauthor_ids);
            return $resolver->get_connection();
        },
    ]);
}
