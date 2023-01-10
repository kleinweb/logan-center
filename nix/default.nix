# SPDX-FileCopyrightText: 2022 Temple University
#
# SPDX-License-Identifier: GPL-3.0-or-later
{
  imports = [
    ./flake-modules

    ./formatters

    ./devshells.nix
    ./image-optimisation.nix
    ./project.nix
    ./vercel.nix
    ./wordpress.nix
  ];
}
