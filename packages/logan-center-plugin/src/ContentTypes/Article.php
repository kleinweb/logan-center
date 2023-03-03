<?php

// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

namespace Klein\LoganCenter\ContentTypes;

use ExtCPTs\Args\PostType as PostTypeArgs;
use Klein\LoganCenter\Concerns\OnInit;
use Klein\LoganCenter\Concerns\RegistersPostType;

class Article
{
    use OnInit;
    use RegistersPostType;

    /**
     * Object type slug.
     */
    public const NAME = 'report_article';

    /**
     * Display labels for the object type.
     */
    public const LABELS = [
        'singular' => 'Article',
        'plural' => 'Articles',
    ];

    public function __construct()
    {
        $this->setupActions();
    }

    public function registerPostType(): void
    {
        register_extended_post_type(
            self::NAME,
            $this->getPostTypeRegistrarArgs(),
            self::LABELS + ['slug' => 'article']
        );
    }

    /** Get the registration args for this object type. */
    public function getPostTypeRegistrarArgs(): array
    {
        $projectArgs = [
            'title' => Project::LABELS['singular'],
            'taxonomy' => Project::NAME,
        ];

        $args = new PostTypeArgs();
        $args->hierarchical = false;
        $args->show_in_feed = true;
        // <https://developer.wordpress.org/resource/dashicons/#index-card>
        $args->menu_icon = 'dashicons-index-card';
        // The post type must be exposed to the WP REST API for Gutenberg support.
        $args->show_in_rest = true;
        $args->block_editor = true;
        // Disable post archives -- Articles have no meaning outside of a Project or Theme.
        $args->has_archive = false;
        // Display Project in post list column
        $args->admin_cols = ['project' => $projectArgs];
        // Add Project filtering to the post list.
        $args->admin_filters = ['project' => $projectArgs];

        return array_merge($args->toArray(), [
            'show_in_graphql' => true,
            'graphql_single_name' => self::LABELS['singular'],
            'graphql_plural_name' => self::LABELS['plural'],
        ]);
    }
}
