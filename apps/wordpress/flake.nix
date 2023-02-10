{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-22.11";
    flake-parts.url = "github:hercules-ci/flake-parts";
    dream2nix.url = "github:nix-community/dream2nix";
  };

  outputs = {
    flake-parts,
    dream2nix,
    ...
  } @ inputs:
    (flake-parts.lib.mkFlake {inherit inputs;} {
      systems = ["x86_64-linux" "x86_64-darwin" "aarch64-darwin" "aarch64-linux"];
      imports = [];
    })
    // (dream2nix.lib.makeFlakeOutputs {
      systems = [
        # "x86_64-linux"
        "aarch64-darwin"
      ];
      config.projectRoot = ./.;
      source = ./.;
      projects = ./projects.toml;
      # projects = {

      # logancenter-wp = {
      #   name = "logancenter-wp";
      #   subsystem = "php";
      #   translator = "composer-json";
      # };
      # };
    });

  nixConfig = {
    extra-experimental-features = "nix-command flakes";
    extra-substituters = [
      "https://kleintu.cachix.org"
      "https://dotfield.cachix.org"
      "https://nix-community.cachix.org"
    ];
    extra-trusted-public-keys = [
      "kleintu.cachix.org-1:NMaPJijd2bOo4ECoHaAbkUBESvPFj4qj5FgPy+6Hg2s="
      "dotfield.cachix.org-1:b5H/ucY/9PDARWG9uWA87ZKWUBU+hnfF30amwiXiaNk="
      "nix-community.cachix.org-1:mB9FSh9qf2dCimDSUo8Zy7bkq5CX+/rkCWyvRCYg3Fs="
    ];
  };
}
