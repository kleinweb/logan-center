<?php

// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

/**
 * Gutenberg block editor configuration.
 */

namespace Klein\LoganCenter\Providers\Editor;

use Klein\LoganCenter\Interfaces\Provider;

class BlockEditor implements Provider
{
    /**
     * @return void
     */
    public function register(): void
    {
        $this->registerActions();
    }

    /**
     * Register actions with WordPress.
     * @return void
     */
    private function registerActions(): void
    {
        add_action('enqueue_block_editor_assets', [static::class, 'disableDefaultFullscreenEditor']);
        add_action('after_setup_theme', [static::class, 'disableEditorFeatures']);
    }

    /**
     * Disable some unwanted block editor features.
     * @return void
     */
    public static function disableEditorFeatures(): void
    {
        add_theme_support('editor-gradient-presets', []);
        add_theme_support('disable-custom-gradients');
    }

    /**
     * Disable the fullscreen editor as user default.
     *
     * @see https://jeanbaptisteaudras.com/en/2020/03/disable-block-editor-default-fullscreen-mode-in-wordpress-5-4/
     * @see <https://github.com/WordPress/wordpress-develop/blob/09a0db589773cb70da86aeea2ce7f8966f90522f/src/wp-admin/edit-form-blocks.php#L31-L37>
     */
    public static function disableDefaultFullscreenEditor(): void
    {
        $script = /** @lang JavaScript */
            "window.onload = function () {
              const isFullscreenMode = wp.data.select('core/edit-post').isFeatureActive('fullscreenMode')
              if (isFullscreenMode) { wp.data.dispatch('core/edit-post').toggleFeature('fullscreenMode') }
            }";
        wp_add_inline_script('wp-blocks', $script);
    }
}
