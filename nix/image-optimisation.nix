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
  flake.devshellProfiles.image-optimisation = {pkgs, ...}: let
    inherit (pkgs) jpegoptim oxipng;
    inherit (pkgs.nodePackages) svgo;
    category = "tools";
    withCategory = attrs: attrs // {inherit category;};
    cmd = package: {inherit package category;};
    cmd' = type: command: (withCategory {
      inherit command;
      name = "kweb-optimise-${type}s";
      help = "run ${type} image optimisations";
    });
    export = name: eval: {inherit name eval;};
  in {
    commands = [
      (cmd' "png" ''
        ${l.getExe oxipng} --opt 4 --strip safe \
          $PRJ_ASSETS_DIR/*.png
      '')
      (cmd' "svg" ''
        ${l.getExe svgo} --folder $PRJ_ASSETS_DIR/icons
        ${l.getExe svgo} --folder $PRJ_ASSETS_DIR/logos
      '')
    ];
    env = [
      (export "PRJ_ASSETS_DIR" "$PRJ_ROOT/public/assets")
    ];
    packages = [
      svgo
      jpegoptim
      oxipng
    ];
  };
}
