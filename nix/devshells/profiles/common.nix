{pkgs, ...}: {
  commands = [
    {
      category = "tools";
      package = pkgs.nodePackages.npm;
    }
    {
      category = "tools";
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
