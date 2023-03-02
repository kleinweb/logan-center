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
     * Object types which can be connected to this object type.
     */
    const CONNECTED_OBJECT_TYPES = [Project::NAME];

    public function __construct()
    {
        $this->setupActions();
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

    /** Get the registration args for this object type. */
    public function getTaxonomyRegistrarArgs(): array
    {
        $args = new \ExtCPTs\Args\Taxonomy;
        $args->show_in_rest = true;
        // TODO
        $args->description = 'Areas of investigation into which Projects are grouped.';
        $args->hierarchical = false;

        // NOTE(2023-03-02): Currently, `exclusive` only forces a `radio` metabox, but it can be circumvented in the quick edit UI.
        // <https://github.com/johnbillion/extended-cpts/blob/e50e32113136646e48968ec15ef860d166328729/src/Args/Taxonomy.php#L49-L59>
        $args->exclusive = true;

        // type => ['radio', 'simple', 'dropdown'] | callable | null
        // default => null (standard metabox)
        // see: <https://github.com/johnbillion/extended-cpts/blob/e50e32113136646e48968ec15ef860d166328729/src/Args/Taxonomy.php#L8-L22>
        // NOTE: redundant when `exclusive === true`
        // $args->meta_box = 'dropdown';

        return array_merge($args->toArray(), [
            'required' => true, // <- NOTE: From ExCPTs, but not available in \ExCPTs\Args\Taxonomy
            'show_in_graphql' => true,
            'graphql_single_name' => self::LABELS['singular'],
            'graphql_plural_name' => self::LABELS['plural'],
        ]);
    }
}
