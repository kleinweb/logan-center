# SPDX-FileCopyrightText: 2022 Temple University
#
# SPDX-License-Identifier: GPL-3.0-or-later
{self, ...}: let
  inherit (self) inputs project;
  l = inputs.nixpkgs.lib // builtins;
  category = "containers";
in {
  flake.devshellProfiles.lima-vm = {
    config,
    pkgs,
    ...
  }: let
    inherit (pkgs) lima docker docker-compose;
    projectName = project.meta.name;
    configDir = "$PRJ_ROOT/nix/containers";
    limaHome = "$PRJ_DATA_DIR/lima-vm";
    limaConfigFile = "${limaHome}/default.yml";
    dockerSock = "${limaHome}/${projectName}/sock/docker.sock";

    docker' = l.getExe docker;
    docker-compose' = l.getExe docker-compose;
    limactl' = "${lima}/bin/limactl";

    withCategory = attrset: attrset // {inherit category;};
    cmd = package: {inherit package category;};
    export = name: eval: {inherit name eval;};
  in {
    commands = [
      (cmd lima)

      (withCategory {
        name = "kweb-cluster-init";
        help = "initialise and start the cluster for the first time";
        command = ''
          ##: create a new lima vm instance based on the specification generated
          ##: by nixago in `./nixagoFiles/lima-vm.nix`
          ${limactl'} start \
            --name "$LIMA_INSTANCE" \
            "$LIMA_HOME/$LIMA_INSTANCE.yml"

          ##: ensure the host's `docker` cli connects to the vm properly
          ${docker'} context create lima-${projectName} --docker "host=${dockerSock}"
          ${docker'} context use lima-${projectName}
          ${docker'} run hello-world

          ##: start the cluster based on the docker-compose specification
          ${docker-compose'} up --detach
        '';
      })

      (withCategory {
        name = "kweb-cluster-start";
        help = "start the project cluster in a local vm";
        command = ''
          [[ -z "$(${limactl'} list --quiet)" ]] && {
            printf "[kweb-cluster-start]: No existing Lima VMs available! Please run `kweb-cluster-init` instead.\n"
            return 1
          }

          ${limactl'} start "$LIMA_INSTANCE"
          ${docker-compose'} up --detach
        '';
      })

      (withCategory {
        name = "kweb-cluster-stop";
        help = "stop the project cluster and vm";
        command = ''
          set -e
          ${limactl'} stop "$LIMA_INSTANCE"
        '';
      })

      {
        name = "kweb-cluster-destroy";
        help = "completely destroy the environment to start fresh";
        category = "danger zone";
        command = ''
          set -e
          ${limactl'} factory-reset "$LIMA_INSTANCE"
          ${limactl'} delete "$LIMA_INSTANCE"
          ${limactl'} prune
          rm -rf "$LIMA_HOME/_config"
        '';
      }
    ];

    packages = with pkgs; [docker docker-compose];

    env = [
      (export "LIMA_HOME" limaHome)
      (export "LIMA_INSTANCE" projectName)
      (export "DOCKER_HOST" dockerSock)

      # TODO: is this necessary?
      (export "DOCKER_SOCKET" dockerSock)
    ];
  };
}
