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
    packages = with pkgs; [cachix fd nodejs ripgrep];
    env = [];
    commands = [
      {
        # NOTE: This yarn package is only used for initial bootstrapping. After
        # the first run, yarn will manage its own versions. This setup comes
        # with a fair amount of caveats, but assures both backward- and
        # forward-compatibility, which is one of yarn's advertised features.
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
        name = "copilot";
        category = "deployments";
        package = pkgs.copilot-cli;
      }
    ];
  };
}
