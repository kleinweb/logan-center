<?php

namespace Klein\LoganCenter\Concerns;

trait RegistersTaxonomy
{
    use OnInit;

    /**
     * Invocations on the 'init' action hook.
     */
    public function onInit(): void
    {
        $this->registerTaxonomy();
    }

    abstract public function registerTaxonomy(): void;

    abstract protected function getTaxonomyRegistrarArgs(): array;
}
