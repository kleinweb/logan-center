<?php

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
}
