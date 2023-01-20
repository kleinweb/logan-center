# SPDX-FileCopyrightText: 2022-2023 Temple University
#
# SPDX-License-Identifier: GPL-3.0-or-later
{
  self,
  getSystem,
  ...
}: {
  imports = [
    ./nixagoFiles/prettierrc.json.nix
  ];
  flake.devshellProfiles.formatters = {pkgs, ...}: {
    commands = [
      {
        name = "fmt";
        help = "format files with treefmt";
        category = "formatters";
        command = ''
          ${pkgs.treefmt}/bin/treefmt --no-cache -- $@
        '';
      }
    ];
    packages = [
      pkgs.editorconfig-checker
      pkgs.treefmt
      pkgs.alejandra
      pkgs.shellcheck
      pkgs.shfmt
      pkgs.nodePackages.prettier
    ];
  };
}
