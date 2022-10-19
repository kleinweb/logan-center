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
    commitlint
    lefthook
    nodejs
  ];
  env = [];
}
