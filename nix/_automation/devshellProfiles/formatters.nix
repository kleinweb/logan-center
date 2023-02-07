# SPDX-FileCopyrightText: 2022-2023 Temple University
# SPDX-License-Identifier: GPL-3.0-or-later
{
  inputs,
  cell,
}: let
  inherit (inputs) nixpkgs statix;
  l = inputs.nixpkgs.lib // builtins;
in
  _: {
    packages = [
      nixpkgs.alejandra
      nixpkgs.deadnix
      nixpkgs.nodePackages.prettier
      nixpkgs.nodePackages.prettier-plugin-toml
      nixpkgs.shfmt
      nixpkgs.shellcheck
      nixpkgs.editorconfig-checker
      statix.packages.statix
    ];

    commands = [
      {
        name = "fmt";
        help = "apply formatting fixes to files (default: all project files)";
        category = "formatters";
        command = ''
          ${nixpkgs.treefmt}/bin/treefmt --no-cache -- $@
        '';
      }
    ];
    devshell.startup.prettier-plugin-toml = l.stringsWithDeps.noDepEntry ''
      export NODE_PATH=${nixpkgs.nodePackages.prettier-plugin-toml}/lib/node_modules:$NODE_PATH
    '';
  }
