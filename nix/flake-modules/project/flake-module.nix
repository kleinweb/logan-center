{
  config,
  self,
  lib,
  flake-parts-lib,
  ...
}: let
  inherit (flake-parts-lib) mkSubmoduleOptions;
  inherit (lib) types;
  l = lib // builtins;

  cfg = config.flake.project;

  projectSubmodule = types.submodule {
    options = {
      meta = l.mkOption {
        type = metaSubmodule;
        description = ''
          Project-specific metadata.
        '';
      };
    };
  };

  metaSubmodule = types.submodule {
    options = {
      # TODO: validation for ascii/machine-friendly
      name = l.mkOption {
        type = types.str;
        description = ''
          Machine-friendly short name for the project.
        '';
      };
      # TODO: validation for title case
      title = l.mkOption {
        type = types.str;
        default = cfg.meta.name;
        description = ''
          Formal title for the project in title case.
          Defaults to the project shortname.
        '';
      };
      url = l.mkOption {
        type = types.nullOr types.str;
        default = "https://klein.temple.edu/";
        description = ''
          Public URL for the project.
        '';
      };
    };
  };
in {
  options = {
    flake = mkSubmoduleOptions {
      project = l.mkOption {
        type = projectSubmodule;
        description = ''
          Project-specific configuration.
        '';
      };
    };
  };
  config = {};
}
