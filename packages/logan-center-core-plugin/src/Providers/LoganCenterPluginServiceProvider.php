<?php

// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

namespace Klein\LoganCenter\Providers;

use Klein\LoganCenter\Interfaces\Provider;

class LoganCenterPluginServiceProvider implements Provider
{
    protected function providers(): array
    {
        return [
            Authors::class,
            Urls::class,

            Editor\BlockEditor::class,
            Editor\Blocks::class,
            Editor\Editor::class,
            Headless\PostPreview::class,
            Headless\Revalidation::class,
            Headless\Urls::class,
            ThemeSupport\ContentTypes::class,
            ThemeSupport\Media::class,
            ThemeSupport\Menus::class,

            // FIXME: see notes in classes
            // Api::class,
            // Command::class,
        ];
    }

    public function register()
    {
        foreach ($this->providers() as $service) {
            (new $service())->register();
        }
    }

    public function boot()
    {
        //
    }
}
