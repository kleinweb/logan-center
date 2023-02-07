# SPDX-FileCopyrightText: 2022-2023 Temple University
# SPDX-License-Identifier: GPL-3.0-or-later
{getSystem, ...}: {
  perSystem = {pkgs, ...}: {
    treefmt.formatters = {
      inherit (pkgs) alejandra shellcheck shfmt;
      inherit (pkgs.nodePackages) prettier;
    };
  };
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
    packages =
      (getSystem pkgs.system).treefmt.buildInputs
      ++ [pkgs.editorconfig-checker];
  };
}
