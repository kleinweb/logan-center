# SPDX-FileCopyrightText: 2022 Temple University
#
# SPDX-License-Identifier: GPL-3.0-or-later
{self, ...}: let
  inherit (self) project;
  inherit
    (self.devshellProfiles)
    containers
    common
    formatters
    image-optimisation
    nixago-setup-hook
    ;
in {
  imports = [./profiles];
  perSystem = {inputs', ...}: let
    inherit (inputs'.devshell.legacyPackages) mkShell;
  in {
    devShells.default = mkShell {
      inherit (project.meta) name;
      imports = [
        common
        containers
        formatters
        image-optimisation
        nixago-setup-hook
      ];
    };
  };
}
