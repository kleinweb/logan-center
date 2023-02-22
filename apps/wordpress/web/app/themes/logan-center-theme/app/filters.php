<?php

/**
 * Theme filters.
 */

namespace App;

/**
 * Add "… Continued" to the excerpt.
 *
 * @return string
 */
add_filter('excerpt_more', function () {
    return sprintf(' &hellip; <a href="%s">%s</a>', get_permalink(), __('Continued', 'logan-center'));
});

/**
 * Add post thumbnail into RSS feed.
 *
 * @param string $content Post content.
 * @return string
 */
add_filter('the_excerpt_rss', __NAMESPACE__ . '\\filter_the_excerpt_rss_add_post_thumbnail');
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
