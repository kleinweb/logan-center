<?php

// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

namespace Klein\LoganCenter\Commands;

use WP_CLI;
use WP_CLI_Command;

class LoganCenterCommand extends WP_CLI_Command
{
    public function __construct()
    {
        parent::__construct();
    }

    public function hello()
    {
        WP_CLI::success('Hello.');
    }
}
