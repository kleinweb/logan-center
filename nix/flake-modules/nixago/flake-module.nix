# SPDX-FileCopyrightText: 2022 Temple University
#
# SPDX-License-Identifier: GPL-3.0-or-later
{
  config,
  self,
  lib,
  flake-parts-lib,
  ...
}: let
  inherit (flake-parts-lib) mkSubmoduleOptions;
  inherit (self.inputs) nixago;
  l = lib // builtins;
in {
  options = {
    flake = mkSubmoduleOptions {
      nixagoFiles = l.mkOption {
        # TODO: use the upstream module for type validation? currently not exposed
        # <https://github.com/nix-community/nixago/blob/8c1f9e5f1578d4b2ea989f618588d62a335083c3/modules/request.nix>
        #apply = l.mapAttrs (k: v: {
        #_file = "${toString self.outPath}/flake.nix#nixagoFiles.${k}";
        #imports = [v];
        #});
        type = l.types.lazyAttrsOf (l.types.lazyAttrsOf l.types.unspecified);
        default = {};
        description = ''
          Attributes of configuration file specifications to be generated by
          Nixago in its shell hook.
        '';
      };
    };
  };
  config = {
    flake.devshellProfiles.nixago-setup-hook = {pkgs, ...}: {
      devshell.startup.nixago-setup-hook = l.stringsWithDeps.noDepEntry (
        (nixago.lib.${pkgs.system}.makeAll (l.attrValues config.flake.nixagoFiles)).shellHook
      );
    };
  };
}