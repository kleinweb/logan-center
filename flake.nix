# SPDX-FileCopyrightText: 2022 Temple University
#
# SPDX-License-Identifier: GPL-3.0-or-later
{
  description = "logan-center";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

    devshell.url = "github:numtide/devshell";
    flake-parts.url = "github:hercules-ci/flake-parts";
    treefmt-flake.url = "github:srid/treefmt-flake";
    nixago.url = "github:nix-community/nixago";

    devshell.inputs.nixpkgs.follows = "nixpkgs";
    flake-parts.inputs.nixpkgs-lib.follows = "nixpkgs";
    nixago.inputs.nixpkgs.follows = "nixpkgs";
  };

  outputs = {
    self,
    flake-parts,
    treefmt-flake,
    ...
  }:
    flake-parts.lib.mkFlake
    {inherit self;}
    {
      imports = [
        treefmt-flake.flakeModule
        ./nix
      ];
      systems = ["x86_64-linux" "x86_64-darwin" "aarch64-darwin" "aarch64-linux"];
      flake.project.meta = {
        name = "logan-center";
        title = "Logan Center for Urban Investigative Reporting";
        url = "https://templelogancenter.org";
      };
      flake.nixagoFiles."kleinweb-config-json" = {
        output = "kleinweb.config.json";
        configData = self.project.meta;
      };
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
