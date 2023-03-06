<?php

// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

declare(strict_types=1);

namespace Klein\LoganCenter\ContentTypes;

use Klein\LoganCenter\Concerns\OnInit;
use Klein\LoganCenter\Concerns\RegistersTaxonomy;

class Project
{
    use OnInit;
    use RegistersTaxonomy;

    /**
     * Object type slug.
     */
    public const NAME = 'project';

    /**
     * Display labels for the object type.
     */
    public const LABELS = [
        'singular' => 'Project',
        'plural' => 'Projects',
    ];

    /**
     * Object types which can be connected to this taxonomy.
     */
    public const CONNECTED_OBJECT_TYPES = [Article::NAME];

    protected static $rewrite_slug = 'project';

    public function __construct()
    {
        $this->setupActions();
    }

    public static function getCoreObject(): \WP_Taxonomy
    {
        return get_taxonomy(self::NAME);
    }

    public static function getRewriteSlug(): string
    {
        return self::$rewrite_slug;
    }

    public function registerTaxonomy(): void
    {
        register_extended_taxonomy(
            self::NAME,
            self::CONNECTED_OBJECT_TYPES,
            $this->getTaxonomyRegistrarArgs(),
            self::LABELS
        );
    }

    /**
     * Get the set of arguments to pass to the object type registrar.
     */
    protected function getTaxonomyRegistrarArgs(): array
    {
        $args = new \ExtCPTs\Args\Taxonomy();

        $args->description = 'Collections of individual Reports describing a facet of a Scope.';
        $args->show_admin_column = true;
        $args->show_in_rest = true;
        $args->hierarchical = false;
        $args->exclusive = true;
        $args->meta_box = 'radio';
        $args->query_var = self::getRewriteSlug();
        $args->rewrite = [
            'slug' => self::getRewriteSlug(),
            'with_front' => true,
            'hierarchical' => false,

        ];

        // FIXME: unfortunately there seem to be some very recent
        // gutenberg-related issues surrounding the ability to *require*
        // selection of a term, where a "No <TERM NAME>" object becomes the
        // default instead of the term specified here... needs more investigation...
        // <https://github.com/johnbillion/extended-cpts/issues/95>
        // <https://github.com/helgatheviking/Radio-Buttons-for-Taxonomies/issues/60>
        // <https://wordpress.org/support/topic/unable-to-hide-the-no-taxonomy-name-option/#post-16470599>
        // NOTE: This default term will not get the association with a Theme like all the others!
        //       So be careful before making such an assumption.
        $args->default_term = [
            'name' => 'General Coverage',
            'slug' => 'general',
            'description' => 'Default catch-all Project.',
        ];

        return array_merge($args->toArray(), [
            'required' => true,
            'show_in_graphql' => true,
            'graphql_single_name' => self::LABELS['singular'],
            'graphql_plural_name' => self::LABELS['plural'],
        ]);
    }
}
