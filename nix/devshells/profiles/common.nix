# SPDX-FileCopyrightText: 2022 Temple University
#
# SPDX-License-Identifier: GPL-3.0-or-later
{pkgs, ...}: {
  commands = [
    {
      category = "tools";
      package = pkgs.nodePackages.yarn;
    }
    {
      category = "tools";
      package = pkgs.reuse;
    }
    {
      category = "deploy";
      package = pkgs.flyctl;
    }
  ];
  packages = with pkgs; [
    cachix
    nodejs
  ];
  env = [];
}
