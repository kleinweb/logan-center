<?php

// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

/**
 * Block editor configuration.
 *
 * @package logan-center-plugin
 */

declare(strict_types=1);

namespace Klein\LoganCenter\BlockEditor;

/**
 * Disable the fullscreen editor as user default.
 *
 * TODO: can this be added to `editor.js`?
 *
 * @see https://jeanbaptisteaudras.com/en/2020/03/disable-block-editor-default-fullscreen-mode-in-wordpress-5-4/
 * @see <https://github.com/WordPress/wordpress-develop/blob/09a0db589773cb70da86aeea2ce7f8966f90522f/src/wp-admin/edit-form-blocks.php#L31-L37>
 */
add_action('enqueue_block_editor_assets', __NAMESPACE__ . '\disable_editor_fullscreen_default');
function disable_editor_fullscreen_default()
{
    $script = "window.onload = function() { const isFullscreenMode = wp.data.select( 'core/edit-post' ).isFeatureActive( 'fullscreenMode' ); if ( isFullscreenMode ) { wp.data.dispatch( 'core/edit-post' ).toggleFeature( 'fullscreenMode' ); } }";
    wp_add_inline_script('wp-blocks', $script);
}
