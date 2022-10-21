{self, ...}: let
  inherit (self.devshellProfiles) containers common formatters;
in {
  imports = [./profiles];
  perSystem = {inputs', ...}: let
    inherit (inputs'.devshell.legacyPackages) mkShell;
  in {
    devShells.default = mkShell {
      imports = [
        common
        containers
        formatters
      ];
      name = "logan-center";
    };
  };
}
