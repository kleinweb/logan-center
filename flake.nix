# SPDX-FileCopyrightText: 2022-2023 Temple University
#
# SPDX-License-Identifier: GPL-3.0-or-later
{
  description = "logan-center";

  inputs = {
    #: core frameworks
    std.url = "github:divnix/std";
    std.inputs.nixpkgs.follows = "nixpkgs";
    dmerge.follows = "std/dmerge";
    flake-parts.url = "github:hercules-ci/flake-parts";

    # NOTE: <divnix/yants>'s licensing is unclear:
    #       <https://github.com/divnix/yants/issues/4>
    #       <https://cs.tvl.fyi/depot/-/blob/nix/yants/README.md?subtree=true>
    #       note, however, that <divnix/yants> does retain the original's
    #       subtree `Apache-2.0` license copyright to Google LLC:
    #       <https://github.com/divnix/yants/blob/d7253ea436060f598c5d0ef3b22594fd28e7eab2/flake.nix#L1-L2>
    #       it's not clear how much <divnix/yants> differs from the original
    #       because *its git history was erased*.
    #       for safety and consistency with <divnix/std>,
    #       we will track its `yants` input for now...
    yants.follows = "std/yants";

    #: dev tools
    statix.url = "github:nerdypepper/statix";

    #: nixos/nixpkgs
    nixos.url = "github:NixOS/nixpkgs/nixos-unstable";
    nixpkgs.follows = "nixos";
  };

  outputs = {
    std,
    flake-parts,
    ...
  } @ inputs:
    flake-parts.lib.mkFlake {inherit inputs;} {
      systems = ["x86_64-linux" "x86_64-darwin" "aarch64-darwin" "aarch64-linux"];
      perSystem = {self', ...}: {_module.args = {inherit (self') cells;};};
      std.grow.cellsFrom = ./nix;
      std.grow.cellBlocks = [
        (std.blockTypes.data "meta")
        (std.blockTypes.devshells "devshells")
        (std.blockTypes.functions "devshellProfiles")
        (std.blockTypes.functions "lib")
        (std.blockTypes.nixago "nixago")
      ];
      std.harvest = {
        devShells = ["_automation" "devshells"];
      };
      imports = [inputs.std.flakeModule];
    };

  nixConfig = {
    extra-experimental-features = "nix-command flakes";
    extra-substituters = [
      "https://kleintu.cachix.org"
      "https://dotfield.cachix.org"
      "https://nix-community.cachix.org"
    ];
    extra-trusted-public-keys = [
      "kleintu.cachix.org-1:NMaPJijd2bOo4ECoHaAbkUBESvPFj4qj5FgPy+6Hg2s="
      "dotfield.cachix.org-1:b5H/ucY/9PDARWG9uWA87ZKWUBU+hnfF30amwiXiaNk="
      "nix-community.cachix.org-1:mB9FSh9qf2dCimDSUo8Zy7bkq5CX+/rkCWyvRCYg3Fs="
    ];
  };
}
