<?php

// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

namespace Klein\LoganCenter\Providers;

// use const Klein\LoganCenter\API_URL_BASE;

use Klein\LoganCenter\Interfaces\Provider;

class Api implements Provider
{
    public function register()
    {
        // add_action('rest_api_init', function () {
        //     register_rest_route(API_URL_BASE, '/hello', [
        //         'methods' => 'GET',
        //         'callback' => function () {
        //             return [
        //                 'message' => 'Hello.',
        //             ];
        //         },
        //         'permission_callback' => '__return_true',
        //     ]);
        // });
    }
}
