# SPDX-FileCopyrightText: 2022 Temple University
#
# SPDX-License-Identifier: GPL-3.0-or-later

{self, ...}: let
  inherit (self) inputs;
  l = inputs.nixpkgs.lib // builtins;
in {
  imports = [
    ./devshell.nix
    # ./nixagoFiles/lima-vm.nix
  ];
  perSystem = {
    inputs',
    pkgs,
    ...
  }: {
    # apps.colima.program = l.getExe inputs'.colima.packages.default;
    # TODO: apps.cluster.program = ...
  };
}
