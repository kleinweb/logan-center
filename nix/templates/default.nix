# SPDX-FileCopyrightText: 2022 Temple University
#
# SPDX-License-Identifier: GPL-3.0-or-later

{...}: {
  flake.templates.default = {
    path = ../../.;
    description = ''
      logan-center
    '';
  };
}
