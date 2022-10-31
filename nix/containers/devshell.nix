# SPDX-FileCopyrightText: 2022 Temple University
#
# SPDX-License-Identifier: GPL-3.0-or-later
{self, ...}: let
  inherit (self) inputs project;
  l = inputs.nixpkgs.lib // builtins;
  category = "containers";
in {
  flake.devshellProfiles.containers = {
    config,
    pkgs,
    ...
  }: let
    inherit (pkgs) docker docker-compose;
    projectName = project.meta.name;

    docker' = l.getExe docker;
    docker-compose' = l.getExe docker-compose;

    withCategory = attrset: attrset // {inherit category;};
    cmd = package: {inherit package category;};
    export = name: eval: {inherit name eval;};
  in {
    commands = [
      (withCategory {
        name = "kweb-cluster-init";
        help = "initialise and start the cluster for the first time";
        command = ''
          ##: start the cluster based on the docker-compose specification
          ${docker-compose'} up --detach
        '';
      })

      (withCategory {
        name = "kweb-cluster-start";
        help = "start the project cluster in a local vm";
        command = ''
          ${docker-compose'} up --detach
        '';
      })

      (withCategory {
        name = "kweb-cluster-stop";
        help = "stop the project cluster and vm";
        command = ''
          set -e
        '';
      })

      # {
      #   name = "kweb-cluster-destroy";
      #   help = "completely destroy the environment to start fresh";
      #   category = "danger zone";
      #   command = ''
      #     set -e
      #     ${limactl'} factory-reset "$LIMA_INSTANCE"
      #     ${limactl'} delete "$LIMA_INSTANCE"
      #     ${limactl'} prune
      #     rm -rf "$LIMA_HOME/_config"
      #   '';
      # }
    ];

    packages = with pkgs; [docker docker-compose];

    env = [];
  };
}
