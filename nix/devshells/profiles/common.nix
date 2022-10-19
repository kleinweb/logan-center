{pkgs, ...}: {
  commands = [
    {
      category = "tools";
      package = pkgs.yarn;
    }
    {
      category = "legal";
      package = pkgs.reuse;
    }
  ];
  packages = with pkgs; [
    lefthook
    nodejs
  ];
  env = [];
}
