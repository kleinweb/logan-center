# SPDX-FileCopyrightText: 2022 Temple University
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
  flake.devshellProfiles.wp-env = {pkgs, ...}: let
    category = "wp-env";
  in {
    commands = [
      # TODO: automated init based on nextjs-go-skeleton docs
      # {
      #   inherit category;
      #   name = "wp-env-up";
      #   command = ''

      #   '';
      # }
    ];
    env = [];
    packages = with pkgs; [docker docker-compose];
  };
  ###: @wordpress/env :: <https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/>
  flake.nixagoFiles."wp-env" = {
    output = "apps/wordpress-app/.wp-env.json";
    configData = {
      # FIXME: set to `null` after 6.1 release
      # https://github.com/Automattic/vip-decoupled-bundle/pull/57#issuecomment-1202067748
      core = "WordPress/WordPress#6.0.3";
      phpVersion = "8.0";
      # FIXME: handle with composer/nix for real dependency version management
      plugins = ["Automattic/vip-decoupled-bundle"];
      themes = [];

      ##: wp-config constants
      config = {
        "WP_HOME" = "http://localhost:3000"; #     <- frontend :: next.js
        # "WP_SITEURL" = "http://localhost"; #  <- backend :: wordpress
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
