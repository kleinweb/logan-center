<?php

// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

namespace Klein\LoganCenter\Providers;

use Klein\LoganCenter\Commands\LoganCenterCommand;
use Klein\LoganCenter\Interfaces\Provider;
use WP_CLI;

class Command implements Provider
{
    public function register()
    {
        //        FIXME: undefined?! but this should be caught?
        if (constant('\WP_CLI')) {
            WP_CLI::add_command('plugin-name', LoganCenterCommand::class);
        }
    }
}
