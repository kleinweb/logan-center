<?php

declare(strict_types=1);

/**
 * ACF custom location rules for Custom Post Types.
 */

namespace Klein\LoganCenter;

/**
 * ACF rules for custom post type
 */
class Acf
{
    /**
     * Custom location rule prefix.
     */
    private string $prefix = 'kleinweb';

    /**
     * Custom location rule "CPT Parent" suffix.
     */
    private string $suffixParent = 'parent';

    /**
     * Custom location rule "CPT belongs to tree" suffix.
     */
    private string $suffixTree = 'tree';

    /**
     * Location rule name for post is tree.
     */
    private string $postIsTree = 'post-is-tree';

    /**
     * Location rule name for page is tree.
     */
    private string $pageIsTree = 'page-is-tree';

    /**
     * Location rule name for post has child.
     */
    private string $postHasChild = 'post-has-child';

    /**
     * Location rule name for page has child.
     */
    private string $pageHasChild = 'page-has-child';

    /**
     * Custom post types array. Used for caching purpose.
     */
    private array $cptArray;

    /**
     * Constructor.
     */
    public function __construct()
    {
        add_action('acf/init', [$this, 'add_options']);

        add_filter('acf/location/rule_types', [$this, 'location_rule_types']);

        // Adds custom location rule types for post and page tree.
        add_filter('acf/location/rule_values/' . $this->postIsTree, [$this, 'tree_location_rules_values'], 10, 2);
        add_filter('acf/location/rule_values/' . $this->pageIsTree, [$this, 'tree_location_rules_values'], 10, 2);

        add_filter('acf/location/rule_match/' . $this->postIsTree, [$this, 'tree_location_rule_match'], 10, 3);
        add_filter('acf/location/rule_match/' . $this->pageIsTree, [$this, 'tree_location_rule_match'], 10, 3);

        // Adds custom location rule types for post and page has children.
        add_filter('acf/location/rule_values/' . $this->postHasChild, [$this, 'has_child_location_rules_values'], 10, 2);
        add_filter('acf/location/rule_values/' . $this->pageHasChild, [$this, 'has_child_location_rules_values'], 10, 2);

        add_filter('acf/location/rule_match/' . $this->postHasChild, [$this, 'has_child_location_rule_match'], 10, 3);
        add_filter('acf/location/rule_match/' . $this->pageHasChild, [$this, 'has_child_location_rule_match'], 10, 3);

        // Adds custom location rule types.
        add_filter('acf/location/rule_values', [$this, 'cpt_location_rule_values'], 10, 2);
        add_filter('acf/location/rule_match', [$this, 'cpt_location_rule_match'], 10, 4);

        add_filter('acf/fields/relationship/result', [$this, 'acf_fields_relationship_result'], 10, 2);
    }

    /**
     * Add custom site options panel.
     *
     * @return void
     */
    public function add_options()
    {
        acf_add_options_page(
            [
                'page_title' => 'Site Options',
                'menu_title' => 'Site Options',
                'menu_slug' => 'site-options',
                'capability' => 'edit_posts',
                'redirect' => false,
                'show_in_graphql' => true,
                'position' => '60.1',
            ]
        );
    }

    /**
     * This adds the options on the right <select>.
     * You can add more options for top level pages to test agaisnt here.
     *
     * @param  array  $values Rule values.
     * @param  array  $rule   Rule.
     * @return array
     */
    public function tree_location_rules_values($values, $rule)
    {
        // Get any public custom post types that is hierarchical in nature.
        $args = [
            'public' => true,
            '_builtin' => false,
            'hierarchical' => true,
        ];

        // Use CPTs, or page.
        $post_types[] = 'page';
        if ($this->postIsTree === $rule['param']) {
            $post_types = array_keys(get_post_types($args));
        }

        // Get all top level pages/CPTs.
        $args = [
            'post_parent' => 0,
            'post_type' => $post_types,
            'posts_per_page' => 1000, // Limit this just in case.
            'orderby' => 'type name',
            'order' => 'ASC',
        ];
        $pages = get_posts($args);

        // Build menu for ACF filter rule.
        $slugs = [];
        foreach ($pages as $page) {
            // Value => Label.
            $slugs['post_id_' . $page->ID] = $page->post_type . ': ' . $page->post_title;
        }

        return array_merge($values, $slugs);
    }

    /**
     * Custom ACF rule match.
     *
     * @param  bool  $result The match result.
     * @param  array  $rule The location rule.
     * @param  array  $screen The screen args.
     * @return array
     */
    public function tree_location_rule_match($result, $rule, $screen)
    {
        // Abort if no post ID.
        if (! isset($screen['post_id'])) {
            return $result;
        }

        // Current and selected vars.
        $current_post = get_post($screen['post_id']);
        $tree_id = (int)str_replace('post_id_', '', $rule['value']);

        // Is current post in the selected tree?
        $ancestors = get_ancestors($current_post->ID, $current_post->post_type);
        $in_tree = ($current_post->ID === $tree_id) || in_array($tree_id, $ancestors);

        switch ($rule['operator']) {
            case '==':
                $result = $in_tree === true;
                break;
            case '!=':
                $result = $in_tree !== true;
                break;
        }

        return $result;
    }

    /**
     * This adds the options on the right <select>.
     * You can add more options for top level pages to test agaisnt here.
     *
     * @param  array  $values Rule values.
     * @param  array  $rule   Rule.
     * @return array
     */
    public function has_child_location_rules_values($values, $rule)
    {
        return 'Has Children';
    }

    /**
     * Custom ACF rule match.
     *
     * @param  bool  $result The match result.
     * @param  array  $rule The location rule.
     * @param  array  $screen The screen args.
     * @return array
     */
    public function has_child_location_rule_match($result, $rule, $screen)
    {
        // Abort if no post ID.
        if (! isset($screen['post_id'])) {
            return $result;
        }

        $post_id = $screen['post_id'];
        $post_type = get_post_type($post_id);

        // Current and selected vars.
        $current_post = get_post($post_id);
        $children = get_children(
            [
                'post_parent' => $post_id,
                'post_type' => $post_type,
            ]
        );

        switch ($rule['operator']) {
            case '==':
                $result = ! empty($children);
                break;
            case '!=':
                $result = empty($children);
                break;
        }

        return $result;
    }

    /**
     * Custom ACF filter rules.
     * This adds the label to the first <select> in the Field Group screen.
     *
     * @param  array  $types Rule types.
     * @return array
     */
    public function location_rule_types($types)
    {
        // Adds Parent and Tree rule types.
        $cpt_arr = $this->get_cpt_array();
        if (count($cpt_arr)) {
            foreach ($cpt_arr as $cpt) {
                $types[$cpt['label']] = [
                    $cpt['rules']['parent']['key'] => $cpt['rules']['parent']['label'],
                    $cpt['rules']['tree']['key'] => $cpt['rules']['tree']['label'],
                ];
            }
        }

        // Adds Tree rule types to Post and Page.
        $types['Post'][$this->postIsTree] = 'Post belongs to tree';
        $types['Page'][$this->pageIsTree] = 'Page belongs to tree';

        // Adds Tree rule types to Post and Page.
        $types['Post'][$this->postHasChild] = 'Post has children';
        $types['Page'][$this->pageHasChild] = 'Page has children';

        return $types;
    }

    /**
     * Custom ACF filter values.
     * This adds the options on the right <select>.
     *
     * @param  array  $values Rule values.
     * @param  array  $rule   Rule.
     * @return array
     */
    public function cpt_location_rule_values($values, $rule)
    {
        $rule_arr = $this->parse_key($rule['param']);
        if ($rule_arr && in_array($rule_arr['cpt_name'], array_column($this->get_cpt_array(), 'name'))) {
            $args = [
                'post_type' => $rule_arr['cpt_name'],
                'posts_per_page' => 1000,
                'paged' => 0,
                'orderby' => 'menu_order title',
                'order' => 'ASC',
                'post_status' => 'any',
                'no_found_rows' => true,
                'update_post_meta_cache' => false,
                'update_post_term_cache' => false,
            ];
            $pages = get_posts($args);

            foreach ($pages as $page) {
                $values[$page->ID] = $page->post_title;
            }
        }

        return $values;
    }

    /**
     * Custom ACF rule match.
     *
     * @param  bool  $result The match result.
     * @param  array  $rule The location rule.
     * @param  array  $screen The screen args.
     * @param  array  $field_group The field group array.
     * @return array
     */
    public function cpt_location_rule_match($result, $rule, $screen, $field_group)
    {
        // Abort if no post ID.
        if (! isset($screen['post_id'])) {
            return $result;
        }

        $post_id = $screen['post_id'];
        $post_type = get_post_type($post_id);

        $rule_arr = $this->parse_key($rule['param']);
        if ($rule_arr && $rule_arr['cpt_name'] === $post_type) {
            switch ($rule_arr['suffix']) {
                case $this->suffixParent:
                    $parent = get_post_parent($post_id);
                    if ($parent) {
                        return $parent->ID === $rule['value'];
                    }

                    return false;
                case $this->suffixTree:
                    $ancestors = get_ancestors($post_id, $post_type, 'post_type');
                    $ancestor_id = $rule['value'];
                    $in_tree = ($ancestor_id === $post_id) || in_array($ancestor_id, $ancestors);

                    switch ($rule['operator']) {
                        case '==':
                            return $in_tree;
                        case '!=':
                            return ! $in_tree;
                    }

                    return false;
            }
        }

        return $result;
    }

    /**
     * Get all custom post types excluding registered by ACF ones.
     *
     * @return array Custom post types array.
     *               array( 'name' => String, 'label' => String, 'rules' => array() )
     */
    private function get_cpt_array()
    {
        // Caching the query for a better performance.
        if (is_null($this->cptArray)) {
            $cpt_arr = get_post_types(
                [
                    '_builtin' => false, // Custom post types only.
                    'hierarchical' => true, // Hierarchical ones only.
                    'public' => true, // Exclude CPTs by ACF because those are private ones.
                ],
                'objects'
            );

            $this->cptArray = [];
            foreach ($cpt_arr as $cpt) {
                $this->cptArray[] = [
                    'name' => $cpt->name,
                    'label' => $cpt->label,
                    'rules' => [
                        'parent' => [
                            'key' => $this->get_key_parent($cpt->name),
                            'label' => $cpt->label . ' Parent',
                        ],
                        'tree' => [
                            'key' => $this->get_key_tree($cpt->name),
                            'label' => $cpt->label . ' belongs to tree',
                        ],
                    ],
                ];
            }
        }

        return $this->cptArray;
    }

    /**
     * Get CPT Parent rule key name.
     *
     * @param  string  $cpt_name Custom post type name.
     * @return string
     */
    private function get_key_parent($cpt_name)
    {
        return $this->prefix . '_' . $cpt_name . '_' . $this->suffixParent;
    }

    /**
     * Get CPT Is Tree rule key name.
     *
     * @param  string  $cpt_name Custom post type name.
     * @return string
     */
    private function get_key_tree($cpt_name)
    {
        return $this->prefix . '_' . $cpt_name . '_' . $this->suffixTree;
    }

    /**
     * Check if key is for custom location rule by comparing key.
     *
     * @param  string  $key String to check if custom key.
     * @return bool false|array [cpt_name, suffix]
     */
    private function parse_key($key)
    {
        $arr = explode('_', $key);

        // Validate key value.
        if (count($arr) < 3 || $arr[0] !== $this->prefix) {
            return false;
        }

        // remove prefix.
        array_shift($arr);

        $suffix = array_pop($arr);
        $cpt_name = implode('_', $arr);

        return [
            'cpt_name' => $cpt_name,
            'suffix' => $suffix,
        ];
    }

    /**
     * Adds a hover state to Relationship selectors that shows the URI.
     *
     * @param  string  $text The text displayed for this post (the post title).
     * @param  \WP_Post  $post The Relationship.
     * @return string
     */
    public function acf_fields_relationship_result($text, $post)
    {
        $uri = get_page_uri($post);

        return '<span title="/' . $uri . '">' . $text . '</span>';
    }
}

new Acf();
