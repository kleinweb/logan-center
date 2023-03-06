<?php

// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

namespace Klein\LoganCenter\Providers;

use Exception;
use Klein\LoganCenter\Interfaces\Provider;
use WPGraphQL\Data\Connection\UserConnectionResolver;
use WPGraphQL\Model\Post;

class Authors implements Provider
{
    public function register()
    {
        add_action('plugins_loaded', [static::class, 'registerPostToAuthorsConnection']);
    }

    /**
     * Registers a connection between Posts and Coauthors in WPGraphQL.
     * @throws Exception
     */
    public static function registerPostToAuthorsConnection()
    {
        register_graphql_connection([
            'fromType' => 'Post',
            'toType' => 'User',
            'fromFieldName' => 'authors',
            'connectionTypeName' => 'PostToAuthorsConnection',
            'resolve' => function (Post $source, $args, $context, $info) {
                $coauthors = get_coauthors($source->ID);
                $coauthorIds = array_map(fn($coauthor) => $coauthor->ID, $coauthors);
                $resolver = (new UserConnectionResolver($source, $args, $context, $info))
                    ->set_query_arg('include', $coauthorIds);
                return $resolver->get_connection();
            },
        ]);
    }
}
