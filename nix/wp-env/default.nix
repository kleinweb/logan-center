{lib, ...}: let
  l = lib // builtins;
  fqdn = "localhost";
in {
  ###: @wordpress/wp-env :: <https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/>
  flake.nixagoFiles."wp-env" = {
    output = ".wp-env.json";
    configData = {
      core = null; # default: null => latest production release
      phpVersion = "8.1";
      # FIXME: handle with composer/nix for real dependency version management
      plugins = ["Automattic/vip-decoupled-bundle"];
      themes = [];
      port = 8888;

      ##: wp-config constants
      config = {
        "WP_HOME" = "http://${fqdn}:3000"; #     <- frontend :: next.js
        # TODO: double-check this port number
        "WP_SITEURL" = "http://${fqdn}:8888"; #  <- backend :: wordpress
        "WP_DEBUG" = true;
        "SCRIPT_DEBUG" = true;
        "WP_PHP_BINARY" = "php";
        "WP_TESTS_TITLE" = "Logan Center";
        "WP_TESTS_EMAIL" = "kleinweb@temple.edu";
        "WP_TESTS_DOMAIN" = fqdn;
      };

      ##: app->host directory mappings
      #
      # example:
      #
      # ```nix
      # {
      #   "wp-content/mu-plugins" = "./path/to/local/mu-plugins";
      #   "wp-content/themes" = "./path/to/local/themes";
      #   "wp-content/themes/specific-theme" = "./path/to/local/theme-1";
      # }
      # ```
      mappings = {
        ".htaccess" = ".wp-env/.htaccess";
      };

      ##: environment-specific overrides
      env = {};
    };
  };
}
