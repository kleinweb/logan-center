<?php

// SPDX-FileCopyrightText: 2023 Temple University
// SPDX-FileCopyrightText: 2016-2023 Automattic
// SPDX-License-Identifier: GPL-3.0-or-later

namespace Klein\Core\Urls;

//

/**
 * Check if a URL is in a specified whitelist
 *
 * Example whitelist: array( 'mydomain.com', 'mydomain.net' )
 *
 * @author Automattic
 * @see <https://github.com/Automattic/vip-go-mu-plugins/blob/fc82304269f814b25ddfb257075e0c7665f96fba/vip-helpers/vip-utils.php#L989-L1020>
 *
 * @param string $url URL to check for
 * @param string[] $whitelisted_domains Array of whitelisted domains
 * @return bool Returns true if $url is in the $whitelisted_domains
 */
function wpcom_vip_is_valid_domain(string $url, array $whitelisted_domains): bool
{
    $domain = wp_parse_url($url, PHP_URL_HOST);

    if (!$domain) {
        return false;
    }

    // Check if we match the domain exactly
    if (in_array($domain, $whitelisted_domains)) {
        return true;
    }

    $valid = false;

    foreach ($whitelisted_domains as $whitelisted_domain) {
        $whitelisted_domain = '.' . $whitelisted_domain; // Prevent things like 'evilsitetime.com'
        if (strpos($domain, $whitelisted_domain) === (strlen($domain) - strlen($whitelisted_domain))) {
            $valid = true;
            break;
        }
    }
    return $valid;
}
