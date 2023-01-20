# SPDX-FileCopyrightText: 2022-2023 Temple University
# SPDX-License-Identifier: GPL-3.0-or-later
{
  flake.nixagoFiles."prettierrc" = {
    output = ".prettierrc.json";
    configData = {
      semi = false;
      singleQuote = true;
      trailingComma = "all";
    };
  };
}
