<?php

declare(strict_types=1);

/**
 * Cookie management.
 *
 * @package KleinBackend
 */

define('KLEINWEB_COOKIE_SETTING_SAMESITE', 'kleinweb_cookie_samesite');
define('KLEINWEB_COOKIE_SETTING_DOMAIN', 'kleinweb_cookie_domain');

// Init global secure variables.
global $kleinweb_secure, $kleinweb_secure_logged_in_cookie, $kleinweb_send_auth_cookies;
$kleinweb_secure = is_ssl();
$kleinweb_secure_logged_in_cookie = $kleinweb_secure && wp_parse_url(get_option('home'), PHP_URL_SCHEME) === 'https';
$kleinweb_send_auth_cookies = true;

/**
 * Init $kleinweb_secure with site secure value.
 *
 * @param bool $secure  Whether the cookie should only be sent over HTTPS.
 * @param int  $user_id User ID.
 *
 * @return bool
 */
function kleinweb_secure_auth_cookie($secure, $user_id)
{
    global $kleinweb_secure;
    $kleinweb_secure = $secure;
    return $secure;
}
add_filter('secure_auth_cookie', 'kleinweb_secure_auth_cookie', PHP_INT_MAX, 2);

/**
 * Init $kleinweb_secure_logged_in_cookie with site secure value and set kleinweb_send_auth_cookies false.
 *
 * @param bool $secure_logged_in_cookie Whether the logged in cookie should only be sent over HTTPS.
 * @param int  $user_id                 User ID.
 * @param bool $secure                  Whether the auth cookie should only be sent over HTTPS.
 *
 * @return bool
 */
function kleinweb_secure_logged_in_cookie($secure_logged_in_cookie, $user_id, $secure)
{
    global $kleinweb_secure_logged_in_cookie, $kleinweb_send_auth_cookies;
    $kleinweb_secure_logged_in_cookie = $secure_logged_in_cookie;
    $kleinweb_send_auth_cookies = false;
    return $secure_logged_in_cookie;
}
add_filter('secure_logged_in_cookie', 'kleinweb_secure_logged_in_cookie', PHP_INT_MAX, 3);

/**
 * Set auth cookie.
 * Fires immediately before the authentication cookie is set.
 *
 * @param string $auth_cookie Authentication cookie value.
 * @param int    $expire      The time the login grace period expires as a UNIX timestamp.
 *                            Default is 12 hours past the cookie's expiration time.
 * @param int    $expiration  The time when the authentication cookie expires as a UNIX timestamp.
 *                            Default is 14 days from now.
 * @param int    $user_id     User ID.
 * @param string $scheme      Authentication scheme. Values include 'auth' or 'secure_auth'.
 * @param string $token       User's session token to use for this cookie.
 *
 * @return void
 */
function kleinweb_set_auth_cookie($auth_cookie, $expire, $expiration, $user_id, $scheme, $token)
{
    global $kleinweb_secure;

    $same_site = get_option(KLEINWEB_COOKIE_SETTING_SAMESITE, 'None'); // Lax|Strict|None.
    $cookie_domain = get_option(KLEINWEB_COOKIE_SETTING_DOMAIN, COOKIE_DOMAIN);
    if (empty($cookie_domain)) {
        $cookie_domain = COOKIE_DOMAIN;
    }

    $auth_cookie_name = $kleinweb_secure ? SECURE_AUTH_COOKIE : AUTH_COOKIE;

    if (version_compare(PHP_VERSION, '7.3.0') >= 0) {
        setcookie(
            $auth_cookie_name,
            $auth_cookie,
            [
                'expires' => $expire,
                'path' => PLUGINS_COOKIE_PATH,
                'domain' => $cookie_domain,
                'secure' => $kleinweb_secure,
                'httponly' => true,
                'samesite' => $same_site,
            ]
        );

        setcookie(
            $auth_cookie_name,
            $auth_cookie,
            [
                'expires' => $expire,
                'path' => ADMIN_COOKIE_PATH,
                'domain' => $cookie_domain,
                'secure' => $kleinweb_secure,
                'httponly' => true,
                'samesite' => $same_site,
            ]
        );
    } else {
        setcookie($auth_cookie_name, $auth_cookie, $expire, PLUGINS_COOKIE_PATH, $cookie_domain, $kleinweb_secure, true);
        setcookie($auth_cookie_name, $auth_cookie, $expire, ADMIN_COOKIE_PATH, $cookie_domain, $kleinweb_secure, true);
    }
}
add_action('set_auth_cookie', 'kleinweb_set_auth_cookie', 10, 6);

/**
 * Clear auth cookie.
 *
 * @param string $cookie_domain Cookie domain.
 */
function kleinweb_clear_auth_cookie($cookie_domain = '')
{
    global $kleinweb_send_auth_cookies;
    $kleinweb_send_auth_cookies = false;

    if ($cookie_domain === '') {
        $cookie_domain = get_option(KLEINWEB_COOKIE_SETTING_DOMAIN, COOKIE_DOMAIN);
    }

    $time = time() - YEAR_IN_SECONDS;

    setcookie(AUTH_COOKIE, ' ', $time, ADMIN_COOKIE_PATH, $cookie_domain);
    setcookie(SECURE_AUTH_COOKIE, ' ', $time, ADMIN_COOKIE_PATH, $cookie_domain);
    setcookie(AUTH_COOKIE, ' ', $time, PLUGINS_COOKIE_PATH, $cookie_domain);
    setcookie(SECURE_AUTH_COOKIE, ' ', $time, PLUGINS_COOKIE_PATH, $cookie_domain);
    setcookie(LOGGED_IN_COOKIE, ' ', $time, COOKIEPATH, $cookie_domain);
    setcookie(LOGGED_IN_COOKIE, ' ', $time, SITECOOKIEPATH, $cookie_domain);
}
add_action('clear_auth_cookie', 'kleinweb_clear_auth_cookie');

/**
 * Set logged in cookie.
 * Fires immediately before the logged-in authentication cookie is set.
 *
 * @param string $logged_in_cookie The logged-in cookie value.
 * @param int    $expire           The time the login grace period expires as a UNIX timestamp.
 *                                 Default is 12 hours past the cookie's expiration time.
 * @param int    $expiration       The time when the logged-in authentication cookie expires as a UNIX timestamp.
 *                                 Default is 14 days from now.
 * @param int    $user_id          User ID.
 * @param string $scheme           Authentication scheme. Default 'logged_in'.
 * @param string $token            User's session token to use for this cookie.
 */
function kleinweb_set_logged_in_cookie($logged_in_cookie, $expire, $expiration, $user_id, $scheme, $token)
{
    global $kleinweb_secure_logged_in_cookie;

    $same_site = get_option(KLEINWEB_COOKIE_SETTING_SAMESITE, 'None'); // Lax|Strict|None.
    $cookie_domain = get_option(KLEINWEB_COOKIE_SETTING_DOMAIN, COOKIE_DOMAIN);
    if (empty($cookie_domain)) {
        $cookie_domain = COOKIE_DOMAIN;
    }

    if (version_compare(PHP_VERSION, '7.3.0') >= 0) {
        setcookie(
            LOGGED_IN_COOKIE,
            $logged_in_cookie,
            [
                'expires' => $expire,
                'path' => COOKIEPATH,
                'domain' => $cookie_domain,
                'secure' => $kleinweb_secure_logged_in_cookie,
                'httponly' => true,
                'samesite' => $same_site,
            ]
        );

        if (COOKIEPATH !== SITECOOKIEPATH) {
            setcookie(
                LOGGED_IN_COOKIE,
                $logged_in_cookie,
                [
                    'expires' => $expire,
                    'path' => SITECOOKIEPATH,
                    'domain' => $cookie_domain,
                    'secure' => $kleinweb_secure_logged_in_cookie,
                    'httponly' => true,
                    'samesite' => $same_site,
                ]
            );
        }
    } else {
        setcookie(LOGGED_IN_COOKIE, $logged_in_cookie, $expire, COOKIEPATH, $cookie_domain, $kleinweb_secure_logged_in_cookie, true);
        if (COOKIEPATH !== SITECOOKIEPATH) {
            setcookie(LOGGED_IN_COOKIE, $logged_in_cookie, $expire, SITECOOKIEPATH, $cookie_domain, $kleinweb_secure_logged_in_cookie, true);
        }
    }
}
add_action('set_logged_in_cookie', 'kleinweb_set_logged_in_cookie', 10, 6);

/**
 * Disable default auth cookie function on login.
 *
 * @param bool $send True.
 */
function kleinweb_send_auth_cookies($send)
{
    global $kleinweb_send_auth_cookies;
    return $kleinweb_send_auth_cookies;
}
add_filter('send_auth_cookies', 'kleinweb_send_auth_cookies');

/**
 * Registers our Setting for SameSite cookie value.
 */
function kleinweb_register_setting()
{
    register_setting(
        'general',
        KLEINWEB_COOKIE_SETTING_SAMESITE,
        [
            'type' => 'string',
            'group' => 'general',
            'description' => 'Authentication Cookie SameSite parameter',
            'sanitize_callback' => 'kleinweb_sanitize_value',
            'show_in_rest' => false,
            'default' => 'Lax',
        ]
    );

    // add Field.
    add_settings_field(
        'kleinweb_cookie_samesite-id',
        'Authentication Cookie SameSite parameter',
        'kleinweb_setting_samesite_callback_function',
        'general',
        'default',
        [
            'id' => 'kleinweb_cookie_samesite-id',
            'option_name' => KLEINWEB_COOKIE_SETTING_SAMESITE,
        ]
    );

    register_setting(
        'general',
        KLEINWEB_COOKIE_SETTING_DOMAIN,
        [
            'type' => 'boolean',
            'group' => 'general',
            'description' => 'Authentication Cookie Domain',
            'show_in_rest' => false,
            'default' => COOKIE_DOMAIN,
        ]
    );

    // add Field.
    add_settings_field(
        'kleinweb_cookie_domain-id',
        'Authentication Cookie Domain',
        'kleinweb_setting_domain_callback_function',
        'general',
        'default',
        [
            'id' => 'kleinweb_cookie_domain-id',
            'option_name' => KLEINWEB_COOKIE_SETTING_DOMAIN,
        ]
    );
}
add_action('admin_init', 'kleinweb_register_setting');

/**
 * Clear old domain cookie and set new domain cookie on cookie setting change.
 *
 * @param string $old_value Old value.
 * @param string $value     New value.
 */
function kleinweb_remove_old_domain_cookies($old_value, $value)
{
    $user_id = get_current_user_id();
    $secure = is_ssl();

    // Clear old domain cookie.
    if (empty($old_value)) {
        $old_value = COOKIE_DOMAIN;
    }
    kleinweb_clear_auth_cookie($old_value);

    // Set new domain cookie.
    wp_set_auth_cookie($user_id, false, $secure);
}
add_action('update_option_' . KLEINWEB_COOKIE_SETTING_DOMAIN, 'kleinweb_remove_old_domain_cookies', 10, 2);

/**
 * Sanitizes SameSite value.
 *
 * @param string $val Value to sanitize.
 *
 * @return string
 */
function kleinweb_sanitize_value($val)
{
    $valid_values = kleinweb_get_valid_values();

    if (in_array($val, $valid_values, true)) {
        // Do not allow "None" for Non-SSL site.
        if (! is_ssl() && $val === 'None') {
            return 'Lax';
        }

        return $val;
    }

    return 'Lax'; // default one.
}

/**
 * Valid values for SameSite Cookie attribute.
 *
 * @return array
 */
function kleinweb_get_valid_values()
{
    return [
        'None',
        'Lax',
        'Strict',
    ];
}

/**
 * Renders Selector for our SameSite option field.
 *
 * @param array $val Data to render.
 */
function kleinweb_setting_samesite_callback_function($val)
{
    $id = $val['id'];
    $option_name = $val['option_name'];
    $option_value = get_option($option_name);
    $valid_values = kleinweb_get_valid_values();
    ?>
    <select name="<?php echo esc_attr($option_name); ?>" id="<?php echo esc_attr($id); ?>">
        <?php foreach ($valid_values as $valid_value) : ?>
            <option value="<?php echo esc_attr($valid_value); ?>"  <?php echo esc_attr($valid_value === $option_value ? ' selected ' : ''); ?> <?php disabled(! is_ssl() && ($valid_value === 'None')); ?> > <?php echo esc_html($valid_value); ?> </option>
                                      <?php
        endforeach;
    ?>
    </select>
    <?php if (version_compare(PHP_VERSION, '7.3.0') < 0) : ?>
        <p class="description" style="color: red;">
            Warning: Upgrade to PHP 7.3.0 or above to be able to set SameSite Authentication Cookie,<br>
            Current PHP version is: <?php echo esc_html(PHP_VERSION); ?><br>
            Otherwise setting will not be applied. <br>
        </p>
    <?php endif; ?>

    <p class="description">
        Authentication Cookie SameSite parameter, Use:
        <ul>
            <li>`None` if you need to display wp-admin in iframe on other site. You can use this value for HTTPS site only.</li>
            <li>`Strict` to allow cookie being used only on same site domain </li>
            <li>`Lax` to allow usage on subdomains as well (default is Lax)</li>
        </ul>
    </p>

    <?php
}

/**
 * Renders Input for our Domain option field.
 *
 * @param array $val Data to render.
 */
function kleinweb_setting_domain_callback_function($val)
{
    $id = $val['id'];
    $option_name = $val['option_name'];
    $option_value = get_option($option_name);
    $wild_cards = kleinweb_get_domain_wildcards();
    ?>

    <div id="<?php echo esc_attr($id); ?>">
    <?php foreach ($wild_cards as $wild_card) : ?>
        <div>
        <label for="kleinweb-domain-<?php echo esc_attr($wild_card); ?>">
            <input type="radio" name="<?php echo esc_attr($option_name); ?>" id="kleinweb-domain-<?php echo esc_attr($wild_card); ?>" value="<?php echo esc_attr($wild_card); ?>" <?php checked($wild_card, $option_value); ?>>
            <?php if ($wild_card) : ?>
                Enable cookie for <b><?php echo esc_html($wild_card); ?></b>
            <?php else : ?>
                Default Cookie Domain
            <?php endif; ?>
        </label>
        </div>
    <?php endforeach; ?>
    </div>

    <?php
}

/**
 * Get domain wildcard list.
 *
 * @return array
 */
function kleinweb_get_domain_wildcards()
{
    $domain_name = wp_parse_url(site_url(), PHP_URL_HOST);
    $domain_parts = explode('.', $domain_name);
    $count = count($domain_parts);
    $wildcard_arr = [];
    if ($count >= 2) {
        $wildcard_str = '.' . $domain_parts[$count - 1];
        for ($i = $count - 2; $i >= 0; $i--) {
            $wildcard_str = '.' . $domain_parts[$i] . $wildcard_str;
            array_unshift($wildcard_arr, $wildcard_str);
        }
    }

    array_unshift($wildcard_arr, COOKIE_DOMAIN);

    return $wildcard_arr;
}
