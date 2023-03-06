<?php

// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

namespace Klein\LoganCenter\ContentTypes;

use ExtCPTs\Args\PostType as PostTypeArgs;
use Klein\LoganCenter\Concerns\OnInit;
use Klein\LoganCenter\Concerns\RegistersPostType;
use function Klein\LoganCenter\Library\wrapRouteParam;

class Article
{
    use OnInit;
    use RegistersPostType;

    /**
     * Object type slug.
     */
    public const NAME = 'article';

    public static $rewrite_slug = 'article';

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
            self::LABELS
        );
    }

    public function getPermastruct(): string
    {
        $scope = wrapRouteParam(Scope::getRewriteSlug());
        $project = wrapRouteParam(Project::getRewriteSlug());
        $article = wrapRouteParam(self::getRewriteSlug());

        return "/themes/${scope}/${project}/${article}";
    }

    public static function getCoreObject(): \WP_Post_Type
    {
        return get_post_type_object(self::NAME);
    }

    public static function getRewriteSlug(): string
    {
        return self::$rewrite_slug;
    }

    /** Get the registration args for this object type. */
    public function getPostTypeRegistrarArgs(): array
    {
        $projectArgs = [
            'title' => Project::LABELS['singular'],
            'taxonomy' => Project::NAME,
        ];

        $args = new PostTypeArgs();
        $args->supports = ['title', 'editor', 'revisions', 'author', 'excerpt', 'thumbnail', 'custom-fields'];
        $args->hierarchical = false;
        $args->show_in_feed = true;
        // The post type must be exposed to the WP REST API for Gutenberg support.
        $args->show_in_rest = true;
        $args->block_editor = true;
        // Disable post archives -- Articles have no meaning outside of a Project or Scope.
        $args->has_archive = false;
        // Display Project in post list column
        $args->admin_cols = ['project' => $projectArgs];
        // Add Project filtering to the post list.
        $args->admin_filters = ['project' => $projectArgs];
        $args->delete_with_user = false;
        $args->query_var = self::getRewriteSlug();

        $args->rewrite = [
            'permastruct' => $this->getPermastruct(),
            'slug' => self::getRewriteSlug(),
            // Defaults to the value of `has_archive`, which we've disabled, but
            // feeds are useful to those who seek them out (i.e. journalists and power-readers).
            'feeds' => true,
            // Disable pagination support.
            'pages' => false,
            // TODO: maybe or not
            'with_front' => false,
        ];

        return array_merge($args->toArray(), [
            'show_in_graphql' => true,
            'graphql_single_name' => self::LABELS['singular'],
            'graphql_plural_name' => self::LABELS['plural'],
        ]);
    }
}
