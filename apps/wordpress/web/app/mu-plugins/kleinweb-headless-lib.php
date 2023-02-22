<?php

// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

/**
 * Plugin Name:  Klein Headless Library
 * Plugin URI:   https://github.com/kleinweb
 * Description:  Core headless library plugin for Klein College WordPress sites.
 * Version:      0.1.0
 * Author:       Klein Digital Initiatives
 * Author URI:   https://klein.temple.edu
 * License:      GPL-3.0-or-later
 */

namespace Klein\Headless;


/**
 * Custom WP setup.
 */
function action_init_setup_wordpress()
{
    // Enable tags for Pages
    register_taxonomy_for_object_type('post_tag', 'page');

    // Enable excerpts for pages
    add_post_type_support('page', 'excerpt');

    // Disable the hiding of big images
    add_filter('big_image_size_threshold', '__return_false');
    add_filter('max_srcset_image_width', '__return_false');
}
add_action('init', __NAMESPACE__ . '\\action_init_setup_wordpress');

/**
 * Set permlinks on theme activate
 * @see <https://github.com/wp-graphql/wp-graphql/issues/1612>
 */
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
add_action('after_switch_theme', __NAMESPACE__ . '\\action_after_switch_theme_set_custom_permalinks');

/**
 * Add useful args to post/page preview URLs
 *
 * @param string   $link URL used for the post preview.
 * @param \WP_Post $post Post object.
 * @return string
 */
function filter_preview_post_link($link, $post)
{
    $args = array(
        'id'      => $post->ID,
        'type'    => get_post_type($post),
        'status'  => get_post_status($post),
        'preview' => 'true',
    );

    // Add slug and build path
    if ($post->post_name) {
        // Build out new Preview permalink
        if (!function_exists('get_sample_permalink')) {
            require_once ABSPATH . 'wp-admin/includes/post.php';
        }

        $link = get_sample_permalink($post->ID)[0] ?? '';
        $link = str_replace(
            array('%postname%', '%pagename%'),
            $post->post_name,
            $link
        );

        $args['slug'] = $post->post_name;
        $args['uri']  = wp_make_link_relative($link);
    }

    return add_query_arg($args, $link);
}
add_filter('preview_post_link', __NAMESPACE__ . '\\filter_preview_post_link', 10, 2);

/**
 * Includes preview link in post data for a response for Gutenberg preview link to work.
 *
 * @param \WP_REST_Response $response The response object.
 * @param \WP_Post          $post     Post object.
 * @return \WP_REST_Response
 */
function filter_rest_prepare_preview_link($response, $post)
{
    if ('draft' === $post->post_status) {
        $response->data['link'] = get_preview_post_link($post);
    }

    return $response;
}
add_filter('rest_prepare_post', __NAMESPACE__ . '\\filter_rest_prepare_preview_link', 10, 2);
add_filter('rest_prepare_page', __NAMESPACE__ . '\\filter_rest_prepare_preview_link', 10, 2);

/*
|--------------------------------------------------------------------------
| WPGraphQL ContentBlock Data Types
|--------------------------------------------------------------------------
|
| @see <https://github.com/Automattic/vip-decoupled-bundle/blob/2ddf6b27ca08cae88c743aea068c35cefaafc507/blocks/blocks.php>
*/

/**
 * The semver of the ContentBlock data type.
 *
 * @return string Version number.
 */
function get_block_version()
{
    return '0.2.0';
}

/**
 * Extract the content blocks and associated meta for a post.
 *
 * @param  WPGraphQL\Model\Post $post_model Post model for post.
 * @return array
 */
function get_content_blocks($post_model)
{
    $version = get_block_version();

    if (!function_exists('parse_blocks') || !function_exists('has_blocks')) {
        return [
            'blocks'      => [],
            'isGutenberg' => false,
            'version'     => $version,
        ];
    }

    // WPGraphQL's Post model restricts access to the raw post_content (contentRaw)
    // based on "edit_posts" cap. Since we want to serve blocks even to logged-out
    // users -- and because we are parsing this content before returning it --
    // we'll bypass the model and access the raw content directly.
    $post = \get_post($post_model->ID);

    $is_gutenberg = \has_blocks($post->post_content);
    $raw_blocks   = \parse_blocks($post->post_content);

    return [
        'blocks'      => process_content_blocks($raw_blocks),
        'isGutenberg' => $is_gutenberg,
        'version'     => $version,
    ];
}

/**
 * Provide additional data for image blocks.
 *
 * @param  array $block Content block.
 * @return array
 */
function transform_block_attributes($block)
{
    if ('core/image' === $block['name']) {
        $attachment_metadata = \wp_get_attachment_metadata($block['attributes']['id']);

        $block['attributes']['src']            = \wp_get_attachment_url($block['attributes']['id']);
        $block['attributes']['originalHeight'] = $attachment_metadata['height'];
        $block['attributes']['originalWidth']  = $attachment_metadata['width'];
        $block['attributes']['srcset']         = \wp_get_attachment_image_srcset($block['attributes']['id']);
        $block['attributes']['alt']            = trim(wp_strip_all_tags(\get_post_meta($block['attributes']['id'], '_wp_attachment_image_alt', true)));

        // If width and height attributes aren't exposed, add the default ones
        if (!isset($block['attributes']['height'])) {
            $block['attributes']['height'] = $attachment_metadata['height'];
        }

        if (!isset($block['attributes']['width'])) {
            $block['attributes']['width'] = $attachment_metadata['width'];
        }
    }

    return $block;
}
\add_filter('kleinweb_decoupled_graphql_content_block', __NAMESPACE__ . '\\transform_block_attributes', 10, 1);

/**
 * Parse the inner HTML and provide a version with the wrapping tag pulled out
 * into a seperate tagName property. The block resolver will deliver either the
 * original or the "unwrapped" version based on the passed field arguments. The
 * wrapping tag name allows the front-end implementor to delegate tag creation
 * to a component.
 *
 * @param  string $html Inner HTML of block.
 * @return array
 */
function parse_inner_html($html)
{
    $wrapping_tag_pattern = '#^\s*<([A-z][A-z0-9]*)\b([^>])*>(.*?)</\1>\s*$#s';
    $self_closing_pattern = '#^\s*<([A-z][A-z0-9]*)+?\b(.*?)\/>\s*$#s';
    $orphaned_tag_pattern = '#^[^<]*</[A-z][A-z0-9]*>#s';

    // Strip all the tags from the provided html, and compare it to the trimmed original html
    // to see if its the same or not. If it is the same, then there's no html provided
    $tagless_value = wp_strip_all_tags($html);

    // trim is necessary as the wp_strip_all_tags is removing all the linebreaks so this accounts for that
    if (trim($html) === $tagless_value) {
        return [
            'innerHTMLUnwrapped' => $tagless_value,
            'tagName'            => null,
        ];
    }

    if (preg_match($wrapping_tag_pattern, $html, $matches)) {
        // Check for orphaned tag that would indicate that we should not have
        // stripped the top-level wrapping tag. Example:
        // <div>1</div><div>2</div>
        if (1 === preg_match($orphaned_tag_pattern, $matches[3])) {
            return [
                'innerHTMLUnwrapped' => null,
                'tagName'            => null,
            ];
        }

        return [
            'innerHTMLUnwrapped' => $matches[3],
            'tagName'            => $matches[1],
        ];
    }

    if (preg_match($self_closing_pattern, $html, $self_closing_matches)) {
        return [
            'innerHTMLUnwrapped' => null,
            'tagName'            => $self_closing_matches[1],
        ];
    }

    return [
        'innerHTMLUnwrapped' => null,
        'tagName'            => null,
    ];
}

/**
 * Process content blocks to match expected shape of ContentBlock type and
 * remove unwanted data.
 *
 * @param  array $raw_blocks The raw blocks returned by parse_blocks.
 * @return array
 */
function process_content_blocks($raw_blocks)
{
    $blocks = array_map(
        function ($raw_block) {
            $block = $raw_block;

            // Classic editor blocks get a blockName of null with the raw post content
            // shoved inside. Set a usable block name and allow the client to use the
            // HTML as they see fit.
            if (null === $block['blockName']) {
                $block['blockName'] = 'core/classic-editor';
            }

            // However, Gutenberg can sometimes produce spurious empty blocks. Return
            // null and filter them out below.
            if ('core/classic-editor' === $block['blockName'] && empty(trim($block['innerHTML']))) {
                return null;
            }

            $block = array_merge(
                parse_inner_html($block['innerHTML']),
                [
                    'attributes'   => $block['attrs'],
                    'innerBlocks'  => process_content_blocks($block['innerBlocks']),
                    'innerContent' => $block['innerContent'],
                    'innerHTML'    => $block['innerHTML'],
                    'name'         => $block['blockName'],
                    'outerHTML'    => $block['innerHTML'],
                ]
            );

            /**
             * Filter content block before it is provided to the GraphQL resolver.
             *
             * @param  $block     ContentBlock data.
             * @param  $raw_block "Raw" block data from parse_blocks().
             * @param  $version   Block version.
             */
            $block = \apply_filters('kleinweb_decoupled_graphql_content_block', $block, $raw_block, get_block_version());

            // Attributes are much easier to work with as an associative array, but
            // must be provided to the GraphQL resolver as an array of key/value pairs.
            $block['attributes'] = array_map(
                function ($key) use ($block) {
                    $value = $block['attributes'][$key];
                    if (!is_string($value)) {
                        $value = \wp_json_encode($value);
                    }

                    return [
                        'name'  => $key,
                        'value' => $value,
                    ];
                },
                array_keys($block['attributes'])
            );

            return $block;
        },
        $raw_blocks
    );

    return array_filter($blocks);
}

/**
 * Register types and fields for content blocks.
 *
 * @return void
 */
function register_types()
{
    \register_graphql_object_type(
        'ContentBlockAttribute',
        [
            'description' => 'Content block attribute',
            'fields'      => [
                'name'  => [
                    'type'        => 'String',
                    'description' => 'Content block attribute name',
                ],
                'value' => [
                    'type'        => 'String',
                    'description' => 'Content block attribute value',
                ],
            ],
        ],
    );

    \register_graphql_object_type(
        'ContentBlock',
        [
            'description' => 'Content block',
            'fields'      => [
                'attributes'   => [
                    'type'        => ['list_of' => 'ContentBlockAttribute'],
                    'description' => 'Content block attributes',
                ],
                'innerBlocks'  => [
                    'type'        => ['list_of' => 'ContentBlock'],
                    'description' => 'Inner blocks of this block',
                ],
                'innerContent' => [
                    'type'        => ['list_of' => 'String'],
                    'description' => 'List of string fragments and null markers where inner blocks were found',
                ],
                'innerHTML'    => [
                    'args'        => [
                        'removeWrappingTag' => [
                            'type'        => 'Boolean',
                            'description' => 'Remove wrapping tag from innerHTML, if possible. Default: false',
                        ],
                    ],
                    'type'        => 'String',
                    'description' => 'Content block inner HTML (without wrapping tag)',
                    'resolve'     => function ($block, $args) {
                        if (isset($args['removeWrappingTag']) && true === $args['removeWrappingTag']) {
                            return $block['innerHTMLUnwrapped'];
                        }

                        return $block['innerHTML'];
                    },
                ],
                'name'         => [
                    'type'        => 'String',
                    'description' => 'Content block name',
                ],
                'outerHTML'    => [
                    'type'              => 'String',
                    'deprecationReason' => 'Deprecated in favor of consolidating HTML output in innerHTML using field directives to control whether the wrapping tag is included',
                    'description'       => 'Content block HTML (with wrapping tag)',
                ],
                'tagName'      => [
                    'type'        => 'String',
                    'description' => 'Content block HTML wrapping tag name',
                ],
            ],
        ],
    );

    \register_graphql_object_type(
        'ContentBlocks',
        [
            'description' => 'Content block',
            'fields'      => [
                'blocks'      => [
                    'type'        => ['list_of' => 'ContentBlock'],
                    'description' => 'Content block attributes',
                ],
                'isGutenberg' => [
                    'type'        => 'Boolean',
                    'description' => 'Whether the post was created with the Gutenberg editor',
                ],
                'version'     => [
                    'type'        => 'String',
                    'description' => 'Content block version',
                ],
            ],
        ],
    );

    // Register the field on every post type that supports 'editor'.
    \register_graphql_field(
        'NodeWithContentEditor',
        'contentBlocks',
        [
            'type'        => 'ContentBlocks',
            'description' => 'A block representation of post content',
            'resolve'     => __NAMESPACE__ . '\\get_content_blocks',
        ]
    );
}
\add_action('graphql_register_types', __NAMESPACE__ . '\\register_types', 10, 0);

/*
|--------------------------------------------------------------------------
| WPGraphQL: Register custom post types
|--------------------------------------------------------------------------
|
| @see <https://github.com/Automattic/vip-decoupled-bundle/blob/2ddf6b27ca08cae88c743aea068c35cefaafc507/registration/registration.php>
|
*/

/**
 * Filter custom post type args and auto-register post types that are public, not
 * built-in, and don't already have a "show_in_graphql" value set.
 *
 * @param  array  $args      Custom post type registration args.
 * @param  string $post_type Post type slug.
 * @return array
 */
function register_custom_post_types($args, $post_type)
{
    // Already available in GraphQL.
    if (isset($args['show_in_graphql'])) {
        return $args;
    }

    // Don't show "built-in" post types like nav menus.
    if (isset($args['_builtin']) && true === $args['_builtin']) {
        return $args;
    }

    // Don't show post types that are marked not public.
    if (isset($args['public']) && false === $args['public']) {
        return $args;
    }

    $slug = str_replace(
        [' ', '-', '_'],
        '',
        ucwords(trim($post_type), ' _-')
    );

    if ('s' === substr($slug, -1) && strlen($slug) > 1) {
        $slug = substr($slug, 0, -1);
    }

    $args['show_in_graphql']     = true;
    $args['graphql_single_name'] = $slug;
    $args['graphql_plural_name'] = sprintf('%s%s', $slug, 's');

    return $args;
}
add_filter('register_post_type_args', __NAMESPACE__ . '\\register_custom_post_types', 10, 2);
