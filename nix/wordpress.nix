# SPDX-FileCopyrightText: 2022-2023 Temple University
#
# SPDX-License-Identifier: GPL-3.0-or-later
{
  self,
  lib,
  ...
}: let
  inherit (self) project;
  l = lib // builtins;
in {
  flake.devshellProfiles.wordpress = {pkgs, ...}: let
    category = "wordpress";
  in {
    commands = [
      {
        inherit category;
        name = "composer";
        package = pkgs.php81Packages.composer;
      }
    ];
    env = [];
    packages = with pkgs; [docker docker-compose];
  };
  ###: @wordpress/env :: <https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/>
  flake.nixagoFiles."wp-env" = {
    output = "apps/wp-env/.wp-env.json";
    configData = {
      phpVersion = "8.1";
      plugins = ["Automattic/vip-decoupled-bundle"];
      themes = [];

      ##: wp-config constants
      config = {
        "WP_HOME" = "http://localhost:3000"; #  <- frontend :: next.js
        # "WP_SITEURL" = "http://localhost"; #    <- backend :: wordpress
        "WP_ENVIRONMENT_TYPE" = "local";
        "WP_TESTS_TITLE" = project.meta.name;
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
