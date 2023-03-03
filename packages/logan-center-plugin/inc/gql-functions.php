<?php

declare(strict_types=1);

/**
 * Misc Graph QL functions, mostly filters used to extend the Schema
 */

/**
 * Give media items a `html` field that outputs the SVG element or an IMG element.
 * SEE https://github.com/wp-graphql/wp-graphql/issues/1035
 */
function kleinweb_add_media_element()
{
    // Add content field for media item
    register_graphql_field(
        'mediaItem',
        'element',
        [
            'type' => 'String',
            'resolve' => static function ($source, $args) {
                // phpcs:ignore
                if ($source->mimeType === 'image/svg+xml') {
                    $media_file = get_attached_file($source->ID);
                    if ($media_file) {
                        // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
                        $svg_file_content = file_get_contents($media_file);

                        $find_string = '<svg';
                        $position = strpos($svg_file_content, $find_string);

                        return trim(substr($svg_file_content, $position));
                    }

                    return 'File is missing';
                }

                return wp_get_attachment_image($source->ID, 'full');
            },
        ]
    );
}
add_action('graphql_register_types', 'kleinweb_add_media_element');

/**
 * Give each content node a field of HTML encoded to play nicely with wp-content Vue component
 * SEE https://github.com/wp-graphql/wp-graphql/issues/1035
 */
function add_encoded_content_field()
{
    register_graphql_field(
        'NodeWithContentEditor',
        'encodedContent',
        [
            'type' => 'String',
            'resolve' => static function ($post) {
                // phpcs:ignore WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
                $content = get_post($post->databaseId)->post_content;

                return ! empty($content) ? apply_filters('the_content', $content) : null;
            },
        ]
    );
}
add_action('graphql_register_types', 'add_encoded_content_field');

/**
 * Make all menus publicly accessible regardless of whether they are assigned to a location.
 *
 * @param  bool  $is_private   If the data is private.
 * @param  string  $model_name   Name of the model the filter is currently being executed in.
 * @return bool
 */
function enable_public_menus($is_private, $model_name)
{
    if ($model_name === 'MenuObject' || $model_name === 'MenuItemObject') {
        return false;
    }

    return $is_private;
}
add_filter('graphql_data_is_private', 'enable_public_menus', 10, 2);

/**
 * Allow any frontend domain to access the GQL endpoint.
 *
 * This mirrors how the WP REST API works.
 *
 * SEE https://developer.wordpress.org/reference/functions/rest_send_cors_headers/
 * SEE https://github.com/funkhaus/wp-graphql-cors/blob/master/includes/process-request.php
 *
 * @param  array  $headers Array of headers to filter.
 * @return array
 */
function set_wpgql_cors_response_headers($headers)
{
    // Abort if using Wp-GQL_CORS plugin for headers instead
    if (class_exists('WP_GraphQL_CORS')) {
        return $headers;
    }

    $origin = get_http_origin();

    // Cors protection check.
    $graphql_settings = get_option('graphql_general_settings');
    if (isset($graphql_settings['restrict_gql_endpoint_cors']) && $graphql_settings['restrict_gql_endpoint_cors'] === 'on') {
        // Set site url as allowed origin.
        $allowed_origins = [
            site_url(),
        ];

        $allowed_origins[] = KLEINWEB_FRONTEND_URL;

        $allowed_origins = apply_filters('kleinweb_allowed_origins', $allowed_origins);

        // Consider localhost case.
        $parsed_origin = wp_parse_url($origin);

        if (! in_array($origin, $allowed_origins, true) && $parsed_origin['host'] !== 'localhost') {
            $origin = $allowed_origins[0];
        }
    }

    $headers['Access-Control-Allow-Origin'] = $origin;
    $headers['Access-Control-Allow-Credentials'] = 'true';

    // Allow certain header types. Respect the defauls from WP-GQL too.
    $access_control_allow_headers = apply_filters(
        'graphql_access_control_allow_headers',
        ['Authorization', 'Content-Type', 'Preview']
    );
    $headers['Access-Control-Allow-Headers'] = implode(
        ', ',
        $access_control_allow_headers
    );

    return $headers;
}
add_filter('graphql_response_headers_to_send', 'set_wpgql_cors_response_headers');

/**
 * Register Restrict GraphQL endpoint access setting.
 */
function restrict_gql_endpoint_cors_settings_field()
{
    $name = 'restrict_gql_endpoint_cors';
    $section = 'graphql_general_settings';

    $options = get_option($section);
    $value = $options[$name] ?? '';

    $args = [
        'name' => $name,
        'section' => $section,
        'value' => $value,
        'desc' => __('Restrict GraphQL endpoint access to localhost, Site URL and Home URLs only', 'kleinweb'),
    ];

    add_settings_field(
        "{$section}[{$name}]",
        __('Restrict GraphQL endpoint access to localhost, Site URL and Home URLs only', 'kleinweb'),
        'restrict_gql_endpoint_cors_field',
        $section,
        $section,
        $args
    );
}
add_action('admin_init', 'restrict_gql_endpoint_cors_settings_field', 11);

/**
 * Restrict GraphQL endpoint access setting field markup.
 *
 * @param  array  $args Arguments for markup.
 */
function restrict_gql_endpoint_cors_field(array $args)
{
    $html = '<fieldset>';
    $html .= sprintf('<label for="wpuf-%1$s[%2$s]">', $args['section'], $args['name']);
    $html .= sprintf('<input type="hidden" name="%1$s[%2$s]" value="off">', $args['section'], $args['name']);
    $html .= sprintf('<input type="checkbox" class="checkbox" id="wpuf-%1$s[%2$s]" name="%1$s[%2$s]" value="on" %3$s>', $args['section'], $args['name'], checked($args['value'], 'on', false));
    $html .= sprintf('%1$s</label>', $args['desc']);
    $html .= '</fieldset>';
    echo $html; // phpcs:ignore
}

/**
 * Adds next post node to all the custom Post Types
 */
function gql_register_next_post()
{
    $post_types = WPGraphQL::get_allowed_post_types();

    if (empty($post_types) || ! is_array($post_types)) {
        return;
    }

    foreach ($post_types as $post_type) {
        $post_type_object = get_post_type_object($post_type);

        // Get the Type name with ucfirst
        $ucfirst = ucfirst($post_type_object->graphql_single_name);

        // Register a new Edge Type
        register_graphql_type(
            'Next'.$ucfirst.'Edge',
            [
                'fields' => [
                    'node' => [
                        'description' => __(
                            'The node of the next item',
                            'kleinweb'
                        ),
                        'type' => $ucfirst,
                        'resolve' => static function ($post_id, $args, $context) {
                            return \WPGraphQL\Data\DataSource::resolve_post_object(
                                $post_id,
                                $context
                            );
                        },
                    ],
                ],
            ]
        );

        // Register the next{$type} field
        register_graphql_field(
            $ucfirst,
            'next'.$ucfirst,
            [
                'type' => 'Next'.$ucfirst.'Edge',
                'description' => __(
                    'The next post of the current port',
                    'kleinweb'
                ),
                'args' => [
                    'inSameTerm' => [
                        'type' => 'Boolean',
                        'description' => __('Whether post should be in a same taxonomy term. Default value: false', 'kleinweb'),
                        'default' => false,
                    ],
                    'taxonomy' => [
                        'type' => 'String',
                        'description' => __('Taxonomy, if inSameTerm is true', 'kleinweb'),
                        'default' => 'category',
                    ],
                    'termNotIn' => [
                        'type' => 'String',
                        'description' => __('Comma-separated list of excluded term IDs.', 'kleinweb'),
                    ],
                    'termSlugNotIn' => [
                        'type' => 'String',
                        'description' => __('Comma-separated list of excluded term slugs.', 'kleinweb'),
                    ],
                    'loop' => [
                        'type' => 'Boolean',
                        'description' => __('Whether to return boundary post if on first or last. Default value: true', 'kleinweb'),
                        'default' => true,
                    ],
                ],
                'resolve' => static function ($post, $args, $context) {
                    $post = get_post($post->ID);
                    $loop = $args['loop'] ?? true;
                    $post_type = get_post_type($post);
                    $is_is_post_type_hierarchical = is_post_type_hierarchical($post_type);

                    if ($is_is_post_type_hierarchical) {
                        return kleinweb_get_next_prev_page($post, true, $loop);
                    }

                    // Assuming is a "post" type now
                    $in_same_term = $args['inSameTerm'] ?? false;
                    $taxonomy = $args['taxonomy'] ?? 'category';
                    $excluded_term_ids = $args['termNotIn'] ?? '';
                    $excluded_term_slugs = $args['termSlugNotIn'] ?? '';

                    return kleinweb_get_next_prev_post($post, true, $loop, $in_same_term, $excluded_term_ids, $excluded_term_slugs, $taxonomy);
                },
            ]
        );
    }
}
add_action('graphql_register_types', 'gql_register_next_post');

/**
 * Adds previous post node to all the custom Post Types
 */
function gql_register_previous_post()
{
    $post_types = WPGraphQL::get_allowed_post_types();

    if (empty($post_types) || ! is_array($post_types)) {
        return;
    }

    foreach ($post_types as $post_type) {
        $post_type_object = get_post_type_object($post_type);

        // Get the Type name with ucfirst
        $ucfirst = ucfirst($post_type_object->graphql_single_name);

        // Register a new Edge Type
        register_graphql_type(
            'Previous'.$ucfirst.'Edge',
            [
                'fields' => [
                    'node' => [
                        'description' => __(
                            'The node of the previous item',
                            'kleinweb'
                        ),
                        'type' => $ucfirst,
                        'resolve' => static function ($post_id, $args, $context) {
                            return \WPGraphQL\Data\DataSource::resolve_post_object(
                                $post_id,
                                $context
                            );
                        },
                    ],
                ],
            ]
        );

        // Register the next{$type} field
        register_graphql_field(
            $ucfirst,
            'previous'.$ucfirst,
            [
                'type' => 'Previous'.$ucfirst.'Edge',
                'description' => __(
                    'The previous post of the current post',
                    'kleinweb'
                ),
                'args' => [
                    'inSameTerm' => [
                        'type' => 'Boolean',
                        'description' => __('Whether post should be in a same taxonomy term. Default value: false', 'kleinweb'),
                        'default' => false,
                    ],
                    'taxonomy' => [
                        'type' => 'String',
                        'description' => __('Taxonomy, if inSameTerm is true', 'kleinweb'),
                        'default' => 'category',
                    ],
                    'termNotIn' => [
                        'type' => 'String',
                        'description' => __('Comma-separated list of excluded term IDs.', 'kleinweb'),
                    ],
                    'termSlugNotIn' => [
                        'type' => 'String',
                        'description' => __('Comma-separated list of excluded term slugs.', 'kleinweb'),
                    ],
                    'loop' => [
                        'type' => 'Boolean',
                        'description' => __('Whether to return boundary post if on first or last. Default value: true', 'kleinweb'),
                        'default' => true,
                    ],
                ],
                'resolve' => static function ($post, $args, $context) {
                    $post = get_post($post->ID);
                    $loop = $args['loop'] ?? true;
                    $post_type = get_post_type($post);
                    $is_is_post_type_hierarchical = is_post_type_hierarchical($post_type);

                    if ($is_is_post_type_hierarchical) {
                        return kleinweb_get_next_prev_page($post, false, $loop);
                    }

                    // Assuming is a "post" type now
                    $in_same_term = $args['inSameTerm'] ?? false;
                    $taxonomy = $args['taxonomy'] ?? 'category';
                    $excluded_term_ids = $args['termNotIn'] ?? '';
                    $excluded_term_slugs = $args['termSlugNotIn'] ?? '';

                    return kleinweb_get_next_prev_post($post, false, $loop, $in_same_term, $excluded_term_ids, $excluded_term_slugs, $taxonomy);
                },
            ]
        );
    }
}
add_action('graphql_register_types', 'gql_register_previous_post');

/**
 * Get the next/previous hierarchical post type (eg: Pages)
 */
function kleinweb_get_next_prev_page($post, $is_next = true, $loop = true)
{
    // Get all siblings pages
    // Yes this is isn't effienct to query all pages,
    // but actually it works well for thousands of pages in practice.
    $args = [
        'post_type' => get_post_type($post),
        'posts_per_page' => -1,
        'fields' => 'ids',
        'orderby' => 'menu_order',
        'order' => 'ASC',
        'post_parent' => $post->post_parent,
    ];

    // Get all siblings
    $siblings = get_posts($args);

    // Find where current posts exists in Siblings
    $index = array_search($post->ID, $siblings);

    if ($is_next) {
        $on_last = $index === count($siblings) - 1;

        // If on last element, then return first, or null if not looping
        if ($loop && $on_last) {
            return $siblings[0];
        }

        if (! $loop && $on_last) {
            return null;
        }

        // Get next
        return $siblings[$index + 1];
    }

    $on_first = $index === 0;

    // If on first, then return last, or null if not looping
    if ($loop && $on_first) {
        return end($siblings);
    }

    if (! $loop && $on_first) {
        return null;
    }

    // Get previous
    return $siblings[$index - 1];
}

/**
 * Get the next/previous date-based post type (eg: Posts)
 */
function kleinweb_get_next_prev_post(
    $post,
    $is_next = true,
    $loop = true,
    $in_same_term = false,
    $excluded_term_ids = '',
    $excluded_term_slugs = '',
    $taxonomy = 'category'
) {
    // Get IDs of slugs, and merge with any IDs we were given as args
    if (! empty($excluded_term_slugs)) {
        $slugs_as_ids = array_map(
            static function ($slug) use ($taxonomy) {
                $term = get_term_by('slug', $slug, $taxonomy);
                if ($term) {
                    return $term->term_id;
                }

                return false;
            },
            $excluded_term_slugs
        );

        $excluded_term_ids = array_merge($excluded_term_ids, array_filter($slugs_as_ids));
    }

    // Return the adjacent post
    $adjacent_post = get_adjacent_post($in_same_term, $excluded_term_ids, ! $is_next, $taxonomy);
    if (! empty($adjacent_post)) {
        return $adjacent_post->ID;
    }

    // If looping, and we won't have $adjacent_post above so get boundry post now
    if ($loop) {
        $boundary_post = get_boundary_post($in_same_term, $excluded_term_ids, $is_next, $taxonomy);

        return $boundary_post[0]->ID ?? null;
    }

    return null;
}

/**
 * Set the default ordering of quieres in WP-GQL
 *
 * @param  array  $query_args The args that will be passed to the WP_Query.
 * @return array
 */
function custom_default_where_args($query_args)
{
    $post_types = $query_args['post_type'];
    $gql_args = $query_args['graphql_args'];

    if (isset($gql_args['where'])) {
        // Where args set, so use them
        return $query_args;
    }

    if (
        is_array($post_types) &&
        count($post_types) === 1 &&
        in_array('post', $post_types, true)
    ) {
        // Is just Posts, so use defaults
        return $query_args;
    }

    // Is anything else, so set to menu_order
    $query_args['orderby'] = 'menu_order';
    $query_args['order'] = 'ASC';

    return $query_args;
}
add_filter('graphql_post_object_connection_query_args', 'custom_default_where_args', 10, 1);
