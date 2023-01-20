# SPDX-FileCopyrightText: 2022-2023 Temple University
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
    packages = with pkgs; [cachix fd nodejs ripgrep];
    env = [
      {
        name = "CACHIX_CACHE_NAME";
        value = "kleintu";
      }
    ];
    commands = [
      {
        # NOTE: This yarn package is only used for initial bootstrapping.
        # After the first run, yarn will manage its own versions.
        # This setup assures both backward- and forward-compatibility,
        # which is one of yarn's advertised features. That said,
        # the newer versions of yarn come with some caveats,
        # requiring the frequent use of the `yarn sdks` command
        # unless using the `node-modules` linker.
        package = pkgs.yarn;
        category = "tools";
      }
      {
        category = "tools";
        package = pkgs.just;
      }
      {
        category = "tools";
        package = pkgs.reuse;
      }
      {
        category = "tools";
        package = pkgs.pastel;
      }
      {
        category = "tools";
        package = pkgs.cocogitto;
      }
    ];
  };
}
