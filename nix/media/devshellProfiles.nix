# SPDX-FileCopyrightText: 2022-2023 Temple University
# SPDX-License-Identifier: GPL-3.0-or-later
{
  inputs,
  cell,
}: let
  inherit (inputs) nixpkgs;
  l = inputs.nixpkgs.lib // builtins;
in {
  image-optimisation = _: let
    category = "image processing";
    withCategory = attrs: attrs // {inherit category;};
    cmd = package: withCategory {inherit package;};
  in {
    commands = [
      (withCategory {
        name = "exiftool"; # default: "Image-ExifTool"
        package = nixpkgs.exiftool;
      })
      (cmd nixpkgs.nodePackages.svgo)
    ];
    packages = [
      nixpkgs.jpegoptim
      nixpkgs.oxipng
    ];
  };
}
