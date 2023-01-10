# SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
# SPDX-License-Identifier: GPL-3.0-or-later
{self, ...}: {
  flake.project.meta = {
    name = "logan-center";
    title = "Logan Center for Urban Investigative Reporting";
    url = "https://templelogancenter.org";
  };
  flake.nixagoFiles."kleinweb-config-json" = {
    output = "kleinweb.config.json";
    configData =
      self.project.meta
      // {
        gaId = "G-XGLD9S5QW3";
      };
  };
}
