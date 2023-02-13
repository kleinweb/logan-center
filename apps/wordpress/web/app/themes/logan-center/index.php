<?php
/**
 * Redirect theme requests to frontend.
 *
 * @author Greg Rickaby
 * @package nextjs-wordpress-theme
 * @since 1.0.0
 */

header( 'Location:' . WP_HOME, true, 303 );
