# SPDX-FileCopyrightText: 2022 Temple University
#
# SPDX-License-Identifier: GPL-3.0-or-later

{
  imports = [
    ./flake-modules

    ./containers
    ./devshells

    # FIXME: fix or remove...
    # ./lima-vm

    ./formatters
    ./packages
    ./templates

    ./wp-env
  ];
}
