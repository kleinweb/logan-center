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
    inherit (pkgs) lima docker;
    limaName = config.devshell.name;
    docker' = l.getExe docker;

    withCategory = attrset: attrset // {inherit category;};
    cmd = package: {inherit package category;};
  in {
    commands = [
      (cmd lima)
      (cmd docker)
      (withCategory {
        name = "docker-local-init";
        help = "perform initial docker setup for lima vm";
        command = ''
          ${docker'} context create lima-logan-center --docker "host=unix:///Users/cdom/.lima/logan-center/sock/docker.sock"
          ${docker'} context use lima-logan-center
          ${docker'} run hello-world
        '';
      })
    ];
    env = [
      {
        # FIXME: don't run command if lima is not yet running
        # FIXME: use nix package?
        # FIXME: requires initial setup:
        name = "DOCKER_HOST";
        eval = "$(limactl list ${limaName} --format 'unix://{{.Dir}}/sock/docker.sock')";
      }
      {
        name = "LIMA_CONFIG_FILE";
        eval = "$PRJ_ROOT/nix/containers/lima/${limaName}.yml";
      }
      {
        name = "LIMA_HOME";
        eval = "$PRJ_ROOT/.lima-vm";
      }
      {
        name = "LIMA_INSTANCE";
        value = limaName;
      }
    ];
  };
}
