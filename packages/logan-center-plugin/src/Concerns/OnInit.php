<?php

// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

namespace Klein\LoganCenter\Concerns;

trait OnInit
{
    /**
     * Register WordPress action callbacks.
     */
    public function setupActions(): void
    {
        add_action('init', [$this, 'onInit']);
    }

    abstract public function onInit(): void;
}
