# SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
# SPDX-License-Identifier: GPL-3.0-or-later
#
### Notes:
#
# - Also see the currently-unused `flake-module.nix` in this directory.
{
  inputs,
  cell,
}: let
  inherit (inputs) yants;
  site' = with yants;
    struct {
      name = string;
      title = string;
      url = string;
      telemetry = option (struct {
        gaId = option string;
      });
    };
in {
  project = site' {
    name = "logan-center";
    title = "Logan Center for Urban Investigative Reporting";
    url = "https://templelogancenter.org";
    telemetry = {
      gaId = "G-XGLD9S5QW3";
    };
  };
}
