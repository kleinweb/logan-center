<?php

/**
 * Theme setup.
 */

namespace App;

use function Roots\bundle;

/**
 * Register the theme assets.
 *
 * @return void
 */
add_action(
    'wp_enqueue_scripts',
    function () {
        bundle('app')->enqueue();
    },
    100
);

/**
 * Register the theme assets with the block editor.
 *
 * @return void
 */
add_action(
    'enqueue_block_editor_assets',
    function () {
        // We don't need the custom fonts anywhere in wp-admin except the block editor.
        wp_enqueue_style(
            'typekit',
            'https://use.typekit.net/cwz8dss.css'
        );
        bundle('editor')->enqueue();
    },
    100
);

/**
 * Register the initial theme setup.
 *
 * @return void
 */
add_action(
    'after_setup_theme',
    function () {
        /**
         * Enable features from the Soil plugin if activated.
         *
         * @link https://roots.io/plugins/soil/
         */
        add_theme_support('soil', [
            // This one is quite helpful for a headless site.
            // <https://web.archive.org/web/20180529232418/http://www.456bereastreet.com/archive/201010/how_to_make_wordpress_urls_root_relative/>
            // Includes workaround for <https://github.com/roots/acorn/issues/226#issuecomment-1270450510>
            'relative-urls' => php_sapi_name() !== 'cli',
            'clean-up' => [
                'wp_obscurity',
                'disable_extra_rss',
                'disable_recent_comments_css',
                'disable_gallery_css',
                'clean_html5_markup',
            ],
        ]);

        /** Disable various Chaotic features. */
        remove_theme_support('block-templates');
        remove_theme_support('core-block-patterns');
        remove_theme_support('custom-background');
        remove_theme_support('custom-header');
        remove_theme_support('custom-logo');
        remove_theme_support('custom-line-height');

        /**
         * Register the navigation menus.
         *
         * @link https://developer.wordpress.org/reference/functions/register_nav_menus/
         */
        // register_nav_menus([
        //     'primary' => __('Primary', 'logan-center'),
        //     'footer' => __('Footer', 'logan-center'),
        // ]);

        // Let plugins manage the document title tag.
        add_theme_support('title-tag');

        add_theme_support('html5', [
            'caption',
            'comment-form',
            'comment-list',
            'gallery',
            'search-form',
            'script',
            'style',
        ]);

        add_theme_support('responsive-embeds');
        add_theme_support('wp-block-styles');
        add_theme_support('editor-styles');
        add_editor_style(bundle('editor')->css()->first());

        /**
         * Enable post thumbnail support and add common image sizes.
         *
         * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
         */
        add_theme_support('post-thumbnails');
        set_post_thumbnail_size(960, 540, false); // => `medium-preview`
        // Square thumbnail used by sharethis and facebook
        add_image_size('social-preview', 1200, 630, true);
        // You may want to change these, but these defaults cover most use cases
        // TODO: consider matching these to next.config.js ?
        add_image_size('small-preview', 375, 0, false);
        add_image_size('medium-preview', 960, 0, false);
        add_image_size('large-preview', 1280, 0, false);
        add_image_size('fullscreen-small', 1920, 0, false);
        add_image_size('fullscreen', 2560, 0, false);
        add_image_size('fullscreen-large', 3840, 0, false);
        add_image_size('fullscreen-xlarge', 6016, 0, false);


        /**
         * Enable selective refresh for widgets in customizer.
         *
         * @link https://developer.wordpress.org/reference/functions/add_theme_support/#customize-selective-refresh-widgets
         */
        add_theme_support('customize-selective-refresh-widgets');
    },
    20
);

/**
 * Register the theme widget areas.
 */
add_action('widgets_init', __NAMESPACE__ . '\action_widgets_init');
function action_widgets_init()
{
    $config = [
        'before_widget' => '<section class="widget %1$s %2$s">',
        'after_widget' => '</section>',
        'before_title' => '<h3>',
        'after_title' => '</h3>',
    ];

    register_sidebar(
        [
            'name' => __('Primary', 'logan-center'),
            'id' => 'sidebar-primary',
        ] + $config
    );

    register_sidebar(
        [
            'name' => __('Footer', 'logan-center'),
            'id' => 'sidebar-footer',
        ] + $config
    );
}

/**
 * Remove admin toolbar menu items.
 */
add_action(
    'admin_bar_menu',
    function (\WP_Admin_Bar $menu) {
        $menu->remove_node('comments'); // Comments
        $menu->remove_node('customize'); // Customize
        $menu->remove_node('dashboard'); // Dashboard
        $menu->remove_node('menus'); // Menus
        $menu->remove_node('new-content'); // New Content
        $menu->remove_node('search'); // Search
        $menu->remove_node('themes'); // Themes
        $menu->remove_node('updates'); // Updates
        $menu->remove_node('widgets'); // Widgets

        // $menu->remove_node('edit'); // Edit
        // $menu->remove_node('site-name'); // Site Name
        // $menu->remove_node('view-site'); // Visit Site
        // $menu->remove_node('view'); // View
        // $menu->remove_node('wp-logo'); // WordPress Logo
    },
    999
);

/**
 * Remove admin dashboard widgets.
 */
add_action('wp_dashboard_setup', function () {
    global $wp_meta_boxes;

    unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_activity']); // Activity
    unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_primary']); // WordPress Events and News

    // unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_right_now']); // At a Glance
    // unset($wp_meta_boxes['dashboard']['normal']['core']['dashboard_site_health']); // Site Health Status
    // unset($wp_meta_boxes['dashboard']['side']['core']['dashboard_quick_press']); // Quick Draft
});
