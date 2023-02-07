# SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
# SPDX-License-Identifier: GPL-3.0-or-later
{
  inputs,
  cell,
}: {
  formatters = import ./devshellProfiles/formatters.nix {inherit inputs cell;};
}
