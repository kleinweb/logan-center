<?php

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
