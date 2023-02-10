# SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
# SPDX-License-Identifier: GPL-3.0-or-later
{
  inputs,
  cell,
}: let
  l = inputs.nixpkgs.lib // builtins;
in {
  # fixme:
  default = _: {
  };
}
