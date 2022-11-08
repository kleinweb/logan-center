# SPDX-FileCopyrightText: 2022 Temple University
#
# SPDX-License-Identifier: GPL-3.0-or-later
{
  imports = [
    ./flake-modules

    ./containers
    ./devshells
    ./formatters
    ./packages
    ./templates
    ./wordpress

    ./image-optimisation.nix
  ];
}
