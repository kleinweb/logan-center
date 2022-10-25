{self, ...}: let
  inherit (self) project;
  mkScript = text: ''
    #!/bin/bash
    set -eux -o pipefail
    ${text}
  '';
in {
  flake.nixagoFiles."lima-vm-config" = {
    output = ".data/lima-vm/${project.meta.name}.yml";
    format = "yaml";
    configData = {
      images = [
        # Try to use release-yyyyMMdd image if available. Note that release-yyyyMMdd will be removed after several months.
        {
          location = "https://cloud-images.ubuntu.com/releases/22.04/release-20220902/ubuntu-22.04-server-cloudimg-amd64.img";
          arch = "x86_64";
          digest = "sha256:c777670007cc5f132417b9e0bc01367ccfc2a989951ffa225bb1952917c3aa81";
        }
        {
          location = "https://cloud-images.ubuntu.com/releases/22.04/release-20220902/ubuntu-22.04-server-cloudimg-arm64.img";
          arch = "aarch64";
          digest = "sha256:9620f479bd5a6cbf1e805654d41b27f4fc56ef20f916c8331558241734de81ae";
        }
        # Fallback to the latest release image.
        # Hint: run `limactl prune` to invalidate the cache
        {
          location = "https://cloud-images.ubuntu.com/releases/22.04/release/ubuntu-22.04-server-cloudimg-amd64.img";
          arch = "x86_64";
        }
        {
          location = "https://cloud-images.ubuntu.com/releases/22.04/release/ubuntu-22.04-server-cloudimg-arm64.img";
          arch = "aarch64";
        }
      ];
      mounts = [
        {
          location = "~";
          writable = false;
        }
        {
          location = "/tmp/lima";
          writable = true;
        }
      ];
      containerd = {
        system = false;
        user = false;
      };
      provision = [
        {
          mode = "system";
          script = mkScript ''
            sed -i 's/host.lima.internal.*/host.lima.internal host.docker.internal/' /etc/hosts
          '';
        }
        {
          mode = "system";
          script = mkScript ''
            command -v docker >/dev/null 2>&1 && exit 0
            export DEBIAN_FRONTEND=noninteractive
            curl -fsSL https://get.docker.com | sh
            # NOTE: you may remove the lines below, if you prefer to use rootful docker, not rootless
            systemctl disable --now docker
            apt-get install -y uidmap dbus-user-session
          '';
        }
        {
          mode = "user";
          script = mkScript ''
            systemctl --user start dbus
            dockerd-rootless-setuptool.sh install
            docker context use rootless
          '';
        }
      ];
      probes = [
        {
          script = mkScript ''
            if ! timeout 30s bash -c "until command -v docker >/dev/null 2>&1; do sleep 3; done"; then
              echo >&2 "docker is not installed yet"
              exit 1
            fi
            if ! timeout 30s bash -c "until pgrep rootlesskit; do sleep 3; done"; then
              echo >&2 "rootlesskit (used by rootless docker) is not running"
              exit 1
            fi
          '';
          hint = "See `/var/log/cloud-init-output.log` in the guest";
        }
      ];
      # Names defined here will also resolve inside containers, and not just
      # inside the VM itself.
      hostResolver.hosts."host.docker.internal" = "host.lima.internal";
      portForwards = [
        {
          guestSocket = "/run/user/{{.UID}}/docker.sock";
          hostSocket = "{{.Dir}}/sock/docker.sock";
        }
      ];
    };
  };
}
