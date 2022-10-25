{self, ...}: let
  inherit (self) inputs;
  l = inputs.nixpkgs.lib // builtins;
  category = "containers";
in {
  flake.devshellProfiles.containers = {
    config,
    pkgs,
    ...
  }: let
    inherit (pkgs) lima docker docker-compose;

    configDir = "$PRJ_ROOT/nix/containers";

    limaName = config.devshell.name;
    limaHomeDir = "$PRJ_DATA_DIR/lima-vm";
    # FIXME: make lima paths/names more flexible... `$LIMA_INSTANCE` doesn't help?
    limaConfigFile = "${configDir}/lima/${limaName}.yml";

    dockerDataHome = "$PRJ_DATA_DIR/docker";
    dockerSocketPath = "${limaHomeDir}/${limaName}/sock/docker.sock";
    dockerContext = "lima-${limaName}";

    docker' = l.getExe docker;
    docker-compose' = l.getExe docker-compose;
    limactl' = "${lima}/bin/limactl";

    withCategory = attrset: attrset // {inherit category;};
    cmd = package: {inherit package category;};
  in {
    commands = [
      (cmd lima)

      (withCategory {
        name = "kweb-cluster-init";
        help = "initialise and start the cluster for the first time";
        command = ''
          set -e
          ${limactl'} start --name ${limaName} $LIMA_CONFIG_FILE
          ${docker'} context create ${dockerContext} --docker "host=unix://${dockerSocketPath}"
          ${docker'} context use ${dockerContext}
          ${docker'} run hello-world
          ${docker-compose'} up --detach
        '';
      })

      (withCategory {
        name = "kweb-cluster-start";
        help = "start the project cluster in a local vm";
        command = ''
          set -e
          ${limactl'} start --name ${limaName}
          ${docker-compose'} up --detach
        '';
      })

      (withCategory {
        name = "kweb-cluster-stop";
        help = "destroy the container cluster and shut down the virtual machine";
        command = ''
          set -e
          ${docker-compose'} down
          ${limactl'} stop ${limaName}
        '';
      })

      (withCategory {
        name = "kweb-cluster-destroy";
        help = "completely destroy the environment to start fresh";
        command = ''
          set -e
          ${docker-compose'} down
          ${limactl'} factory-reset ${limaName}
          printf "--- [kleinweb]: removing docker data... ------------------------\n" "$PRJ_ROOT"
          rm -rf "$PRJ_DATA_DIR/docker"
          ${limactl'} purge
        '';
      })
    ];

    packages = with pkgs; [
      ##: docker utilities
      # - provides compatibility with legacy tooling assuming the free
      #   availability of Docker Desktop
      docker
      docker-compose
    ];

    env = let
    in [
      {
        name = "LIMA_HOME";
        eval = limaHomeDir;
      }
      {
        name = "LIMA_INSTANCE";
        value = limaName;
      }
      {
        name = "DOCKER_HOST";
        eval = "unix://${dockerSocketPath}";
      }
      {
        name = "DOCKER_SOCKET";
        eval = "unix://${dockerSocketPath}";
      }
      {
        name = "LIMA_CONFIG_FILE";
        eval = limaConfigFile;
      }
    ];
  };
}
