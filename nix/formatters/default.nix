# SPDX-FileCopyrightText: 2022-2023 Temple University
# SPDX-License-Identifier: GPL-3.0-or-later
{
  self,
  getSystem,
  ...
}: {
  flake.devshellProfiles.formatters = {pkgs, ...}: {
    commands = [
      {
        name = "fmt";
        help = "apply formatting fixes to files (default: all project files)";
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
