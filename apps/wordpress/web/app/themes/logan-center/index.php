<?php
/**
 * Redirect theme requests to frontend.
 *
 * @author Klein College of Media and Communication
 * @package logan-center-theme
 * @since 1.0.0
 */

header('Location:' . WP_HOME, true, 303);
