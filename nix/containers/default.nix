{self, ...}: let
  inherit (self) inputs;
  l = inputs.nixpkgs.lib // builtins;
in {
  imports = [./devshellProfiles.nix];
  perSystem = {
    inputs',
    pkgs,
    ...
  }: {
    # apps.colima.program = l.getExe inputs'.colima.packages.default;
    # TODO: apps.cluster.program = ...
  };
}
