# SPDX-FileCopyrightText: 2022-2023 Temple University
# SPDX-License-Identifier: GPL-3.0-or-later
{
  inputs,
  cell,
}: let
  inherit (inputs) nixpkgs;
  l = inputs.nixpkgs.lib // builtins;
in {
  image-optimisation = _: let
    ##: helpers
    # export = name: eval: {inherit name eval;};
    category = "image processing";
    withCategory = attrs: attrs // {inherit category;};
    # cmd = package: {inherit package category;};
    cmd' = type: command: (withCategory {
      inherit command;
      name = "kweb-optimise-${type}s";
      help = "run ${type} image optimisations";
    });
    wrappedPkg = pkg: args:
      l.concatStringsSep " "
      [(l.getExe pkg) (l.cli.toGNUCommandLineShell {} args) "$@"];
    pkgWithDefaults = package: args: (withCategory {
      name = (package.pname or package.name) + "-wrapped";
      help = package.meta.description;
      command = wrappedPkg package args;
    });

    ##: executors
    findAll = ext: "${l.getExe nixpkgs.fd} --type f --extension ${ext} .";
    execBatch = ext: cmd: "${findAll ext} --exec-batch ${cmd} {}";
    execEach = ext: cmd: "${findAll ext} --exec ${cmd} {}";

    ##: wrappers
    jpegoptim' = pkgWithDefaults nixpkgs.jpegoptim {"strip-all" = true;};
    oxipng' = pkgWithDefaults nixpkgs.oxipng {
      "opt" = 3;
      "strip" = "safe";
    };
    svgo' = pkgWithDefaults nixpkgs.nodePackages.svgo {}; # sane defaults, but maybe not
  in {
    commands = [
      jpegoptim'
      oxipng'
      svgo'

      (cmd' "jpeg" ''
        ${execBatch "jpeg" jpegoptim'.command}
        ${execBatch "jpg" jpegoptim'.command}
      '')
      (cmd' "png" (execBatch "png" oxipng'.command))
      (cmd' "svg" (execEach "svg" svgo'.command))
    ];
    packages = [
      nixpkgs.jpegoptim
      nixpkgs.nodePackages.svgo
      nixpkgs.oxipng
    ];
  };
}
