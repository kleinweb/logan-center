# SPDX-FileCopyrightText: 2022 Temple University
#
# SPDX-License-Identifier: GPL-3.0-or-later
{
  self,
  lib,
  ...
}: let
  l = lib // builtins;
in {
  flake.devshellProfiles.image-optimisation = {pkgs, ...}: let
    inherit (pkgs) fd jpegoptim oxipng;
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
    findAll = ext: "${l.getExe fd} --type f --extension ${ext} . $PRJ_ROOT/static/assets";
    execAll = ext: cmd: "${findAll ext} --exec-batch ${cmd} {}";
    execEach = ext: cmd: "${findAll ext} --exec ${cmd} {}";
  in {
    commands = [
      (cmd' "jpeg" ''
        ${execAll "jpeg" "${l.getExe jpegoptim} --strip-all"}
        ${execAll "jpg" "${l.getExe jpegoptim} --strip-all"}
      '')
      (cmd' "png" ''
        ${execAll "png" "${l.getExe oxipng} --opt 3 --strip safe"}
      '')
      (cmd' "svg" ''
        ${execEach "svg" (l.getExe svgo)}
      '')
    ];
    packages = [
      svgo
      jpegoptim
      oxipng
    ];
  };
}
