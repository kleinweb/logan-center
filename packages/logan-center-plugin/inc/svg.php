<?php

declare(strict_types=1);

/**
 * Allow SVG uploads.
 * Off be default, only enable on sites that need SVG uploaded.
 */
function add_mime_types( $mimes )
{
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}

/**
 * Force SVG uploads!
 * This snippit will force SVGs to be allowed to upladed if the above code doesn't work.
 * I think this code will allow all files to be uploaded, so don't use it unless needed.
 */
function force_svg_uploads( $data, $file, $filename, $mimes )
{
    global $wp_version;
    $filetype = wp_check_filetype($filename, $mimes);

    return [
        'ext' => $filetype['ext'],
        'type' => $filetype['type'],
        'proper_filename' => $data['proper_filename'],
    ];
}

/**
 * Register and add settings field.
 */
function kleinweb_add_settings_field()
{
    register_setting(
        'writing',
        'svg_upload',
    );

    add_settings_field(
        'svg_upload',
        'SVG Upload',
        'kleinweb_render_svg_upload_field',
        'writing',
    );
}
add_action('admin_init', 'kleinweb_add_settings_field');

/**
 * Callback function for SVG upload checkbox.
 */
function kleinweb_render_svg_upload_field()
{
    $value = get_option('svg_upload');
    ?>

    <input id="checkbox-svg-upload" name="svg_upload" type="checkbox" <?php checked($value, 1); ?> value="1" />
    <label for="checkbox-svg-upload">Enable SVG Uploads. SVGs can contain executable code, so do not enable for sites with unknown authors.</label>

    <?php
}

/**
 * Check if SVG upload is allowed for the site and enable it.
 */
function kleinweb_init_svg_hooks()
{
    if (get_option('svg_upload') !== 1) {
        return;
    }

    add_filter('upload_mimes', 'add_mime_types');
    add_filter('wp_check_filetype_and_ext', 'force_svg_uploads', 10, 4);
}
add_action('init', 'kleinweb_init_svg_hooks');
