<?php

/**
 * Theme functionality.
 *
 * @author Klein College of Media and Communication
 * @package logan-center-theme
 * @since 1.0.0
 */

namespace Klein\LoganCenterTheme;

// Remove admin menu items.
// FIXME: ajax errors when enabled
// component: "Theme"
// file: "wp-admin/includes/plugin.php"
// key: "480f56a71f77c3f6c9c5eee162b1a2b1"
// line: 1780
// message: "foreach() argument must be of type array|object, null given"
// stack: Array(3) [ "remove_menu_page()", "Klein\\LoganCenterTheme\\action_admin_init()", "do_action('admin_init')" ]
// 0: "remove_menu_page()"
// 1: "Klein\\LoganCenterTheme\\action_admin_init()"
// 2: "do_action('admin_init')"
// length: 3
// add_action('admin_init', __NAMESPACE__ . '\\action_admin_init');
function action_admin_init()
{
    remove_menu_page('edit-comments.php'); // Comments
    // remove_menu_page('edit.php?post_type=page'); // Pages
    // remove_menu_page('edit.php'); // Posts
    remove_menu_page('index.php'); // Dashboard
    remove_menu_page('upload.php'); // Media
}

// Remove admin toolbar menu items.
add_action('admin_bar_menu', function (\WP_Admin_Bar $menu) {
    $menu->remove_node('comments'); // Comments
    $menu->remove_node('customize'); // Customize
    $menu->remove_node('dashboard'); // Dashboard
    // $menu->remove_node('edit'); // Edit
    $menu->remove_node('menus'); // Menus
    $menu->remove_node('new-content'); // New Content
    $menu->remove_node('search'); // Search
    // $menu->remove_node('site-name'); // Site Name
    $menu->remove_node('themes'); // Themes
    $menu->remove_node('updates'); // Updates
    // $menu->remove_node('view-site'); // Visit Site
    $menu->remove_node('view'); // View
    $menu->remove_node('widgets'); // Widgets
    $menu->remove_node('wp-logo'); // WordPress Logo
}, 999);

// Remove admin dashboard widgets.
add_action('wp_dashboard_setup', function () {
    global $wp_meta_boxes;

    unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_activity']); // Activity
    // unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_right_now']); // At a Glance
    unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_site_health']); // Site Health Status
    unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_primary']); // WordPress Events and News
    unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_quick_press']); // Quick Draft
});

/** === THEME SUPPORT =========================================================================== */

/**
 * Setup image sizes that WordPress should generate on the server.
 */
function action_after_setup_theme()
{
    add_theme_support('post-thumbnails');
    set_post_thumbnail_size(960, 540, false);
    add_image_size('social-preview', 1200, 630, true); // Square thumbnail used by sharethis and facebook

    // You may want to change these, but these defaults cover most use cases
    add_image_size('small-preview', 375, 0, false);
    add_image_size('medium-preview', 960, 0, false);
    add_image_size('large-preview', 1280, 0, false);
    add_image_size('fullscreen-small', 1920, 0, false);
    add_image_size('fullscreen', 2560, 0, false);
    add_image_size('fullscreen-large', 3840, 0, false);
    add_image_size('fullscreen-xlarge', 6016, 0, false);
}
add_action('after_setup_theme', __NAMESPACE__ . '\\action_after_setup_theme');

/**
 * Custom WP setup.
 */
function action_init()
{
    // Enable tags for Pages
    register_taxonomy_for_object_type('post_tag', 'page');

    // Enable excerpts for pages
    add_post_type_support('page', 'excerpt');

    // Disable the hiding of big images
    add_filter('big_image_size_threshold', '__return_false');
    add_filter('max_srcset_image_width', '__return_false');
}
add_action('init', __NAMESPACE__ . '\\action_init');

/**
 * Add post thumbnail into RSS feed.
 *
 * @param string $content Post content.
 * @return string
 */
function filter_the_excerpt_rss_add_post_thumbnail($content)
{
    global $post;

    if (has_post_thumbnail($post->ID)) {
        $content =
            '<p><a href=' .
            get_permalink($post->ID) .
            '>' .
            get_the_post_thumbnail($post->ID) .
            '</a></p>' .
            $content;
    }

    return $content;
}
add_filter('the_excerpt_rss', __NAMESPACE__ . '\\filter_the_excerpt_rss_add_post_thumbnail');
