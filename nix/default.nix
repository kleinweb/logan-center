# SPDX-FileCopyrightText: 2022-2023 Temple University
#
# SPDX-License-Identifier: GPL-3.0-or-later
{
  imports = [
    ./flake-modules

    ./formatters

    ./devshells.nix
    ./image-optimisation.nix
    ./project.nix
    ./wordpress.nix
  ];
}
