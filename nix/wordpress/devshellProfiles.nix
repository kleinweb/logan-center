# SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
# SPDX-License-Identifier: GPL-3.0-or-later
{
  inputs,
  cell,
}: let
  inherit (inputs) nixpkgs;
in {
  default = _: {
    nixago = [
      cell.nixago.wp-env-config
    ];
    commands = [
      {
        category = "wordpress";
        name = "composer";
        package = nixpkgs.php81Packages.composer;
      }
      {
        category = "wordpress";
        package = nixpkgs.wp-cli;
      }
    ];
    env = [];
    packages = [
      # nixpkgs.docker
      # nixpkgs.docker-compose
    ];
  };
}
