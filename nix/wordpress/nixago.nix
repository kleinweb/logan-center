# SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
# SPDX-License-Identifier: GPL-3.0-or-later
{
  inputs,
  cell,
}: let
  inherit (inputs) std;
  inherit (inputs.cells) logan-center;
  l = inputs.nixpkgs.lib // builtins;
  prj = logan-center.meta.project;
in
  l.mapAttrs (_: std.lib.dev.mkNixago) {
    ###: @wordpress/env :: <https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/>
    wp-env-config = {
      output = ".wp-env.json";
      format = "json";
      configData = {
        phpVersion = "8.1";
        plugins = ["Automattic/vip-decoupled-bundle"];
        themes = [];

        ##: wp-config constants
        config = {
          "WP_HOME" = "http://localhost:3000"; #  <- next.js
          # "WP_SITEURL" = "http://localhost"; #    <- wordpress
          "WP_ENVIRONMENT_TYPE" = "local";
          "WP_TESTS_TITLE" = prj.name;
          # FIXME: no hardcode
          "WP_TESTS_EMAIL" = "kleinweb@temple.edu";
          # "FS_METHOD" = "direct";
        };

        ##: app->host directory mappings
        mappings = {
          ".htaccess" = ".wp-env/.htaccess";
        };

        ##: environment-specific overrides
        # env = {};
      };
    };
  }
