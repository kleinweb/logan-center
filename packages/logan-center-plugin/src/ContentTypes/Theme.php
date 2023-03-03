<?php

declare(strict_types=1);

namespace Klein\LoganCenter\ContentTypes;

use Klein\LoganCenter\Concerns\OnInit;
use Klein\LoganCenter\Concerns\RegistersTaxonomy;

class Theme
{
    use OnInit, RegistersTaxonomy;

    /**
     * Object type slug.
     */
    const NAME = 'reporting_theme';

    /**
     * Display labels for the object type.
     */
    const LABELS = [
        'singular' => 'Theme',
        'plural' => 'Themes',
    ];

    /**
     * Terms allowed by the controlled taxonomy.
     *
     * N.B. All other terms in the taxonomy will be deleted!
     */
    const ALLOWED_TERMS = [
        'education' => 'Education Disparities',
        'gun-violence' => 'Gun Violence',
        'housing' => 'Housing',
    ];

    /**
     * Object types which can be connected to this object type.
     */
    const CONNECTED_OBJECT_TYPES = [Project::NAME];

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
            // TODO: perhaps expose these through some central admin UI field?
            //       also, these will need to be way more than just a name and
            //       description one day...
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
            self::LABELS + ['slug' => 'theme']
        );
    }

    /**
     * Get the registration args for this object type.
     */
    public function getTaxonomyRegistrarArgs(): array
    {
        $args = new \ExtCPTs\Args\Taxonomy;
        $args->show_in_rest = true;
        $args->description = 'Areas of investigation into which Projects are grouped.';
        $args->hierarchical = false;

        // These bogus capabilities intentionally prevent all users from
        // changing the terms in the controlled taxonomy.
        $args->capabilities = [
            'manage_terms' => 'nobody',
            'edit_terms' => 'nobody',
            'delete_terms' => 'nobody',
            'assign_terms' => 'nobody',
        ];

        // NOTE(2023-03-02): Currently, `exclusive` only forces a `radio` metabox, but it can be circumvented in the quick edit UI.
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
