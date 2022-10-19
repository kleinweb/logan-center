{pkgs, ...}: {
  commands = [
    {
      category = "legal";
      package = pkgs.reuse;
    }
  ];
  packages = [];
  env = [];
}
