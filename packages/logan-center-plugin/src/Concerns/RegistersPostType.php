<?php

// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

namespace Klein\LoganCenter\Concerns;

trait RegistersPostType
{
    use OnInit;

    /**
     * Invocations on the 'init' action hook.
     */
    public function onInit(): void
    {
        $this->registerPostType();
    }

    abstract public function registerPostType(): void;

    abstract protected function getPostTypeRegistrarArgs(): array;
}
