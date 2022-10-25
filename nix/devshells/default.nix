{self, ...}: let
  inherit (self.devshellProfiles) containers common formatters nixago-setup-hook;
in {
  imports = [./profiles];
  perSystem = {inputs', ...}: let
    inherit (inputs'.devshell.legacyPackages) mkShell;
  in {
    devShells.default = mkShell {
      name = "logan-center";
      imports = [
        common
        containers
        formatters
        nixago-setup-hook
      ];
    };
  };
}
