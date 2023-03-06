<?php

// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

declare(strict_types=1);

namespace Klein\LoganCenter\ContentTypes;

use ExtCPTs\Args\Taxonomy as TaxonomyArgs;
use Klein\LoganCenter\Concerns\OnInit;
use Klein\LoganCenter\Concerns\RegistersTaxonomy;

class Scope
{
    use OnInit;
    use RegistersTaxonomy;

    /**
     * Object type slug.
     */
    public const NAME = 'scope';

    /**
     * Display labels for the object type.
     */
    public const LABELS = [
        'singular' => 'Theme',
        'plural' => 'Themes',
    ];

    /**
     * Terms allowed by the controlled taxonomy.
     *
     * N.B. All other terms in the taxonomy will be deleted!
     */
    public const ALLOWED_TERMS = [
        'education' => 'Education Disparities',
        'gun-violence' => 'Gun Violence',
        'housing' => 'Housing',
    ];

    /**
     * Object types which can be connected to this object type.
     */
    public const CONNECTED_OBJECT_TYPES = [Article::NAME, Project::NAME];

    /**
     * URL base for this taxonomy.
     *
     * @var string
     */
    protected static $rewrite_base = 'scopes';

    protected static $rewrite_slug = 'scope';

    public function __construct()
    {
        $this->setupActions();
    }

    /**
     * Register WordPress action callbacks.
     */
    public function setupActions(): void
    {
        add_action('init', [$this, 'onInit']);
    }

    public function onInit(): void
    {
        $this->registerTaxonomy();
        $this->createAllowedTerms();
        $this->deleteDisallowedTerms();
    }

    public static function getCoreObject(): \WP_Taxonomy
    {
        return get_taxonomy(self::NAME);
    }

    public static function getRewriteSlug(): string
    {
        return self::$rewrite_slug;
    }

    /**
     * Create all terms allowed by the controlled taxonomy.
     */
    private function createAllowedTerms(): void
    {
        // Ensure allowed terms exist.
        foreach (self::ALLOWED_TERMS as $name => $label) {
            if (term_exists($name, self::NAME)) {
                continue;
            }
            $allowedTermsArgs = new \Args\wp_insert_term();
            // TODO: perhaps expose these through some central admin UI field
            // $termArgs->description = '';
            $allowedTermsArgs->slug = $name;
            wp_insert_term($label, self::NAME, $allowedTermsArgs->toArray());
        }
    }

    /**
     * Delete all terms disallowed by the controlled taxonomy.
     */
    private function deleteDisallowedTerms(): void
    {
        $allTermsArgs = new \Args\get_terms();
        $allTermsArgs->hide_empty = false;
        $allTermsArgs->taxonomy = self::NAME;
        foreach (get_terms($allTermsArgs->toArray()) as $term) {
            if (isset(self::ALLOWED_TERMS[$term->slug])) {
                continue;
            }
            wp_delete_term($term->term_id, self::NAME);
        }
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
     * Get the registration args for this object type.
     */
    public function getTaxonomyRegistrarArgs(): array
    {
        $args = new TaxonomyArgs();
        $args->show_in_rest = true;
        $args->description = 'Themes of investigative coverage within which Projects are Scoped.';
        $args->hierarchical = false;
        $args->query_var = self::getRewriteSlug();
        $args->rewrite = ['slug' => self::getRewriteSlug()];

        // These bogus capabilities intentionally prevent all users from
        // changing the terms in the controlled taxonomy.
        $args->capabilities = [
            'manage_terms' => 'nobody',
            'edit_terms' => 'nobody',
            'delete_terms' => 'nobody',
            // TODO: does this need to be assigned explicitly or will it be merged with a sane default?
            //            'assign_terms' => 'nobody',
        ];

        // NOTE(2023-03-02): Currently, "exclusive" only forces a "radio" metabox,
        // but it can be circumvented in the quick edit UI.
        // <https://github.com/johnbillion/extended-cpts/blob/e50e32113136646e48968ec15ef860d166328729/src/Args/Taxonomy.php#L49-L59>
        $args->exclusive = true;

        return array_merge($args->toArray(), [
            'required' => true, // <- NOTE: From ExCPTs, but not available in \ExCPTs\Args\Taxonomy ??
            'show_in_graphql' => true,
            'graphql_single_name' => self::LABELS['singular'],
            'graphql_plural_name' => self::LABELS['plural'],
        ]);
    }
}
