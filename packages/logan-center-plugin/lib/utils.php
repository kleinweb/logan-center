<?php

// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

namespace Klein\LoganCenter\Library;

use WP_Post_Type;
use WP_Taxonomy;

/**
 * Wrap a string in percent symbols as expected for use in WordPress permastructs.
 *
 * @param  string  $name Route parameter name.
 */
function wrapRouteParam(string $name): string
{
    return "%${name}%";
}

function getRewriteTag(WP_Taxonomy|WP_Post_Type $object): string
{
    return wrapRouteParam($object->rewrite['slug']);
}
