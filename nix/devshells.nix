# SPDX-FileCopyrightText: 2022 Temple University
# SPDX-License-Identifier: GPL-3.0-or-later
{self, ...}: let
  inherit (self) inputs project devshellProfiles;
  l = inputs.nixpkgs.lib // builtins;
in {
  perSystem = {inputs', ...}: let
    inherit (inputs'.devshell.legacyPackages) mkShell;
  in {
    devShells.default = mkShell {
      inherit (project.meta) name;
      imports = l.attrValues devshellProfiles;
    };
  };

  flake.devshellProfiles.core = {pkgs, ...}: {
    packages = with pkgs; [cachix nodejs];
    env = [];
    commands = [
      {
        category = "tools";
        package = pkgs.nodePackages.yarn;
      }
      {
        category = "tools";
        package = pkgs.reuse;
      }
      {
        category = "deploy";
        package = pkgs.flyctl;
      }
    ];
  };
}