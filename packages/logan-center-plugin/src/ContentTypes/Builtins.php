<?php

declare(strict_types=1);

namespace Klein\LoganCenter\ContentTypes;

/**
 * Configure the builtin object types.
 *
 * - "Category" taxonomy: we don't want to use them, but since they're only
 *   registered to the `post` post type, leave it alone.
 * - "Post" post type: It's not possible to disable entirely without negative
 *   side effects, but we can hide it as much as possible. It's still possible
 *   to reach the default post editor by visiting the URL directly, but there
 *   would be no point since we never display them anywhere.
 *
 * @package logan-center-plugin
 */
class Builtins
{
    public function __construct()
    {
        $this->setupActions();
    }

    private function setupActions(): void
    {
        add_action('init', [ $this, 'onInit' ]);
        add_action('admin_menu', [ $this, 'removeBuiltinPostType' ]);
        add_action('admin_bar_menu', [ $this, 'removeNewPostFromAdminBar' ], 999);
    }

    /**
     * Loads all necessary admin bar items.
     *
     * @param \WP_Admin_Bar $wp_admin_bar The WP_Admin_Bar instance, passed by reference.
     */
    public function removeNewPostFromAdminBar(\WP_Admin_Bar $wp_admin_bar): void
    {
        $wp_admin_bar->remove_node('new-post');
    }

    /**
     * Fires before the administration menu loads in the admin.
     *
     * @param string $context Empty context.
     */
    public function removeBuiltinPostType(string $context): void
    {
        remove_menu_page('edit.php');
    }

    /**
     * Fires after WordPress has finished loading but before any headers are sent.
     */
    public function onInit(): void
    {
        unregister_taxonomy_for_object_type('post_tag', 'page');
    }
}
