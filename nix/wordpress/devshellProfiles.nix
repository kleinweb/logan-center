# SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
# SPDX-License-Identifier: GPL-3.0-or-later
{
  inputs,
  cell,
}: let
  inherit (inputs) nixpkgs;
  l = inputs.nixpkgs.lib // builtins;
  inCategory = category: l.map (x: (x // {inherit category;}));
  package = package: {inherit package;};
  package' = name: package: {inherit name package;};
in {
  default = _: {
    commands = (
      (inCategory "wordpress" [
        (package' "composer" nixpkgs.php81Packages.composer)
        (package' "wp" nixpkgs.wp-cli)
      ])
      ++ (inCategory "containers + vms" [
        # (package nixpkgs.colima)
        (package nixpkgs.docker)
        (package nixpkgs.docker-compose)
      ])
    );
    env = [];
    packages = [];
  };
}
