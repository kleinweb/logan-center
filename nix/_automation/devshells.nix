# SPDX-FileCopyrightText: 2022-2023 Temple University
# SPDX-License-Identifier: GPL-3.0-or-later
{
  inputs,
  cell,
}: let
  inherit (inputs) nixpkgs std;
  inherit (inputs.cells) logan-center media wordpress;
  l = inputs.nixpkgs.lib // builtins;
  prj = logan-center.meta.project;
in
  l.mapAttrs (_: std.lib.dev.mkShell)
  {
    default = {
      inherit (prj) name;
      imports = [
        cell.devshellProfiles.formatters

        media.devshellProfiles.image-optimisation
        wordpress.devshellProfiles.default

        std.std.devshellProfiles.default
      ];
      packages = [
        nixpkgs.cachix
        nixpkgs.fd
        nixpkgs.nodejs
        nixpkgs.ripgrep
        nixpkgs.gh #     <https://cli.github.com/>
        nixpkgs.gum #    <https://github.com/charmbracelet/gum>
        nixpkgs.reuse #  <https://github.com/fsfe/reuse-tool>
      ];
      env = [
        {
          name = "CACHIX_CACHE_NAME";
          value = "kleintu";
        }
      ];
      commands = [
        {
          # NOTE: This yarn@v1 package is only used for initial bootstrapping.
          # After the first run, yarn will manage its own versions.
          # This setup assures both backward- and forward-compatibility,
          # which is one of yarn's advertised features. That said,
          # the newer versions of yarn come with some caveats,
          # requiring the frequent use of the `yarn sdks` command
          # unless using the `node-modules` linker.
          package = nixpkgs.yarn;
          category = "tools";
        }
        {
          category = "tools";
          package = nixpkgs.just;
        }
        {
          category = "tools";
          package = nixpkgs.reuse;
        }
        {
          category = "tools";
          package = nixpkgs.pastel;
        }
        {
          category = "tools";
          package = nixpkgs.cocogitto;
        }
        {
          category = "ci";
          package = nixpkgs.netlify-cli;
        }
      ];
    };
  }
