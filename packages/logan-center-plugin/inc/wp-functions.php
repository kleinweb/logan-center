<?php

declare(strict_types=1);

/**
 * Misc WordPress functions.
 */

/**
 * Custom WP setup.
 */
function custom_wordpress_setup()
{
    // Enable tags for Pages
    register_taxonomy_for_object_type('post_tag', 'page');

    // Enable excerpts for pages
    add_post_type_support('page', 'excerpt');

    // Disable the hiding of big images
    add_filter('big_image_size_threshold', '__return_false');
    add_filter('max_srcset_image_width', '__return_false');
}
add_action('init', 'custom_wordpress_setup');

/**
 * Setup theme
 */
function custom_theme_setup()
{
    // Turn on menus
    add_theme_support('menus');

    // Enable HTML5 support
    add_theme_support('html5', ['gallery', 'caption']);
}
add_action('after_setup_theme', 'custom_theme_setup');

/**
 * Enqueue custom Admin Scripts
 */
function custom_admin_scripts()
{
    wp_enqueue_script('kleinweb-admin', KLEINWEB_BACKEND_PLUGIN_URL . '/resources/js/admin.js', ['jquery'], '1.1', true);
}
add_action('admin_enqueue_scripts', 'custom_admin_scripts');

/**
 * Style login page and dashboard
 *
 * @param  string  $url Default login header url.
 * @return string
 */
function custom_loginpage_logo_link($url)
{
    // Return a url; in this case the homepage url of WordPress
    return get_bloginfo('url');
}
add_filter('login_headerurl', 'custom_loginpage_logo_link');

/**
 * Custom login header text.
 *
 * @param  string  $message Default login header text.
 * @return string
 */
function custom_loginpage_logo_title($message)
{
    // Return title text for the logo to replace 'WordPress'; in this case, the blog name.
    return get_bloginfo('name');
}
add_filter('login_headertext', 'custom_loginpage_logo_title');

/**
 * Enqueue Custom login css.
 */
function custom_loginpage_styles()
{
    wp_enqueue_style(
        'login_css',
        KLEINWEB_BACKEND_PLUGIN_URL . '/resources/css/login.css',
        null,
        KLEINWEB_BACKEND_PLUGIN_VERSION
    );
}
add_action('login_head', 'custom_loginpage_styles');

/**
 * Enqueue Admin CSS.
 */
function custom_admin_styles()
{
    wp_enqueue_style(
        'admin-stylesheet',
        KLEINWEB_BACKEND_PLUGIN_URL . '/resources/css/admin.css',
        null,
        KLEINWEB_BACKEND_PLUGIN_VERSION
    );
}
add_action('admin_print_styles', 'custom_admin_styles');

/**
 * Add custom favicon.
 */
function custom_site_favicon()
{
    echo '<link rel="shortcut icon" href="' . esc_url(KLEINWEB_BACKEND_PLUGIN_URL . '/favicon.png') . '" />';
}
add_action('admin_head', 'custom_site_favicon');
add_action('login_head', 'custom_site_favicon');

/**
 * Add post thumbnail into RSS feed.
 *
 * @param  string  $content Post content.
 * @return string
 */
function rss_post_thumbnail($content)
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
add_filter('the_excerpt_rss', 'rss_post_thumbnail');

/**
 * Change the [...] that comes after excerpts.
 *
 * @param  string  $more Default more string.
 * @return string
 */
function custom_excerpt_ellipsis($more)
{
    return '...';
}
add_filter('excerpt_more', 'custom_excerpt_ellipsis');

/**
 * Change the word length of auto excerpts.
 *
 * @param  int  $length Default length.
 * @return int
 */
function kleinweb_custom_excerpt_length($length)
{
    return 20;
}
add_filter('excerpt_length', 'kleinweb_custom_excerpt_length', 99);

/**
 * Prevent Google from indexing any PHP generated part of the API.
 */
function add_nofollow_header()
{
    header('X-Robots-Tag: noindex, nofollow', true);
}
add_action('send_headers', 'add_nofollow_header');

/**
 * Add useful args to post/page preview URLs
 *
 * @param  string  $link URL used for the post preview.
 * @param  \WP_Post  $post Post object.
 * @return string
 */
function add_custom_preview_link($link, $post)
{
    $args = [
        'id' => $post->ID,
        'type' => get_post_type($post),
        'status' => get_post_status($post),
        'preview' => 'true',
    ];

    // Add slug and build path
    if ($post->post_name) {
        // Build out new Preview permalink
        if (! function_exists('get_sample_permalink')) {
            require_once ABSPATH . 'wp-admin/includes/post.php';
        }

        $link = get_sample_permalink($post->ID)[0] ?? '';
        // FIXME: does this work with custom post types?
        $link = str_replace(
            ['%postname%', '%pagename%'],
            $post->post_name,
            $link
        );

        $args['slug'] = $post->post_name;
        $args['uri'] = wp_make_link_relative($link);
    }

    return add_query_arg($args, $link);
}
add_filter('preview_post_link', 'add_custom_preview_link', 10, 2);

/**
 * Includes preview link in post data for a response for Gutenberg preview link to work.
 *
 * @param  \WP_REST_Response  $response The response object.
 * @param  \WP_Post  $post     Post object.
 * @return \WP_REST_Response
 */
function kleinweb_preview_link_in_rest_response($response, $post)
{
    if ($post->post_status === 'draft') {
        $response->data['link'] = get_preview_post_link($post);
    }

    return $response;
}
add_filter('rest_prepare_post', 'kleinweb_preview_link_in_rest_response', 10, 2);
add_filter('rest_prepare_page', 'kleinweb_preview_link_in_rest_response', 10, 2);

/**
 * Polyfill functions to not throw errors on ACF import
 */
function kleinweb_polyfill_functions()
{
    if (! function_exists('cp_purge_cache')) {
        // phpcs:ignore
        function cp_purge_cache()
        {
        }
    }
    if (function_exists('nd_debounce_deploy')) {
        return;
    }

    // phpcs:ignore
    function nd_debounce_deploy()
    {
    }
}
add_action('wp_dashboard_setup', 'kleinweb_polyfill_functions');

/**
 * Set permlinks on theme activate
 * SEE https://github.com/wp-graphql/wp-graphql/issues/1612
 */
function set_custom_permalinks()
{
    $current_setting = get_option('permalink_structure');

    // Abort if already saved to something else
    if ($current_setting) {
        return;
    }

    // Save permalinks to a custom setting, force create of rules file
    global $wp_rewrite;
    update_option('rewrite_rules', false);
    $wp_rewrite->set_permalink_structure('/themes/%category%/%postname%/');
    $wp_rewrite->set_category_base('/themes');
    $wp_rewrite->flush_rules(true);
}

add_action(KLEINWEB_BACKEND_PLUGIN_ACTIVATION_HOOK, 'set_custom_permalinks');
// add_action('init', 'set_custom_permalinks');

/**
 * Strip quotes from oEmbed title html attributes
 *
 * @param  string  $return The returned oEmbed HTML.
 * @param  object  $data   A data object result from an oEmbed provider.
 * @param  string  $url    The URL of the content to be embedded.
 * @return string
 */
function filter_oembed_attributes($return, $data, $url)
{
    // Remove the title attribute, as often times it has a quote in it.
    $return = preg_replace('/title="[\\s\\S]*?"/', '', $return);

    // Strip quotes from title
    $title = str_replace('"', '', $data->title ?: '');

    return str_replace('<iframe', '<iframe title="' . $title . '"', $return);
}
add_filter('oembed_dataparse', 'filter_oembed_attributes', 10, 4);

/**
 * Customize WP home URL to point to frontend.
 *
 * @author Greg Rickaby
 * @link <https://github.com/gregrickaby/nextjs-wordpress/blob/f165489831126c6a928b8f74fec8779e489ec0b1/packages/nextjs-wordpress-plugin/inc/links.php#LL44-L85C75>
 * @param  string $url    Complete home URL, including path.
 * @param  string $path   Path relative to home URL.
 * @param  string $scheme Context for home URL.
 * @return string         Frontend home URL.
 */
function kleinweb_set_headless_home_url( string $url, string $path, $scheme = null )
{
    global $current_screen;

    if (! defined('KLEINWEB_FRONTEND_URL')) {
        return $url;
    }

    // Don't redirect REST requests.
    if ($scheme === 'rest') {
        return $url;
    }

    // Don't redirect if in Block Editor.
    if (( is_string($current_screen) || is_object($current_screen) ) && method_exists($current_screen, 'is_block_editor')) {
        return $url;
    }

    // Don't redirect unless in WP admin.
    if (! \is_admin()) {
        return $url;
    }

    $base_url = KLEINWEB_FRONTEND_URL;

    if (! $path) {
        return $base_url;
    }

    // Remove excess slash from beginning of path.
    $path = ltrim($path, '/');

    // We do not support trailing slashes on the frontend.
    $url = untrailingslashit("{$base_url}{$path}");

    return $url;
}
add_filter('home_url', 'kleinweb_set_headless_home_url', 10, 3);

/**
 * Customize the REST preview link to point to the headless client.
 *
 * @author Greg Rickaby
 * @see <https://github.com/gregrickaby/nextjs-wordpress/blob/f165489831126c6a928b8f74fec8779e489ec0b1/packages/nextjs-wordpress-plugin/inc/links.php#LL87-L123C93>
 * @param \WP_REST_Response $response Response object.
 * @param \WP_Post $post Current post object.
 * @return \WP_REST_Response Response object.
 */
function kleinweb_set_headless_rest_preview_link( WP_REST_Response $response, WP_Post $post )
{
    if ($post->post_status === 'draft') {
        // Manually call preview filter for draft posts.
        $response->data['link'] = \get_preview_post_link($post);
    } elseif ($post->post_status === 'publish') {
        // Override view link for published posts.
        if (! defined('KLEINWEB_FRONTEND_URL')) {
            return $response;
        }

        $baseUrl = untrailingslashit(KLEINWEB_FRONTEND_URL);
        $permalink = \get_permalink($post);
        $siteUrl = \get_site_url();

        // Replace site URL if present.
        if (stristr($permalink, $siteUrl) !== false) {
            $permalink = str_ireplace($siteUrl, $baseUrl, $permalink);
        }

        // Return URL based on post name.
        $response->data['link'] = $permalink;
    }

    return $response;
}
add_filter('rest_prepare_page', 'kleinweb_set_headless_rest_preview_link', 10, 2);
add_filter('rest_prepare_post', 'kleinweb_set_headless_rest_preview_link', 10, 2);
// add_filter('rest_prepare_page', __NAMESPACE__ . '\set_headless_rest_preview_link', 10, 2);
// add_filter('rest_prepare_post', __NAMESPACE__ . '\set_headless_rest_preview_link', 10, 2);

/**
 * Override links within post content on save to point to headless client.
 *
 * @param int $post_id Post ID.
 */
function kleinweb_override_post_links( $post_id )
{
    // Unhook function to avoid infinite loop.
    \remove_action('save_post', __NAMESPACE__ . '\override_post_links');

    $post = \get_post($post_id);

    if (! $post || ! defined('HEADLESS_FRONTEND_URL')) {
        return;
    }

    $post_content = $post->post_content;
    $backend_domain = \get_site_url();

    // Check if post content contains WP links.
    if (stripos($post_content, $backend_domain) === false) {
        return;
    }

    $frontend_domain = HEADLESS_FRONTEND_URL;
    $new_post_content = $post_content;

    // Remove excess slash from end of frontend domain.
    $frontend_domain = rtrim($frontend_domain, '/');

    // Replace WP domain with FE domain.
    $new_post_content = str_ireplace($backend_domain, $frontend_domain, $post_content);

    // Revert media links.
    $upload_dir = \wp_upload_dir();
    $upload_dir = str_ireplace($backend_domain, '', $upload_dir['baseurl']);
    $new_post_content = str_ireplace("{$frontend_domain}{$upload_dir}", "{$backend_domain}{$upload_dir}", $new_post_content);

    // Revert plugin links.
    $plugin_dir = defined('WP_PLUGIN_URL') ? WP_PLUGIN_URL : '/wp-content/plugins';
    $plugin_dir = str_ireplace($backend_domain, '', $plugin_dir);
    $new_post_content = str_ireplace("{$frontend_domain}{$plugin_dir}", "{$backend_domain}{$plugin_dir}", $new_post_content);

    // Save post.
    \wp_update_post(
        [
            'ID' => $post_id,
            'post_content' => \wp_slash($new_post_content),
        ]
    );

    // Re-hook function.
    \add_action('save_post', __NAMESPACE__ . '\override_post_links');
}
add_action('save_post', __NAMESPACE__ . '\override_post_links');

/**
 * Update the Site Address value in General Settings panel to return kleinweb override
 *
 * @param  string  $value Site address value.
 * @return string
 */
function kleinweb_filter_home_option($value)
{
    global $pagenow;
    if ($pagenow === 'options-general.php') {
        $value = KLEINWEB_FRONTEND_URL;
    }

    return $value;
}
add_filter('option_home', 'kleinweb_filter_home_option', 99, 1);

/**
 * Whitelist siteurl for wp_safe_redirect.
 *
 * @param  array<string>  $hosts An array of allowed host names.
 * @return array<string>
 */
function kleinweb_allow_siteurl_safe_redirect($hosts)
{
    $wpp = wp_parse_url(site_url());

    // NOTE: this might not be a reliable value -- i've seen 'host' not available in some removed code
    return array_merge($hosts, [$wpp['host']]);
}
add_filter('allowed_redirect_hosts', 'kleinweb_allow_siteurl_safe_redirect');
