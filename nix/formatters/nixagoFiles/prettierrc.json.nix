# SPDX-FileCopyrightText: 2022 Temple University
#
# SPDX-License-Identifier: GPL-3.0-or-later

{
  flake.nixagoFiles."prettierrc" = {
    output = ".prettierrc.json";
    configData = {
      bracketSameLine = true;
      proseWrap = "always";
      semi = false;
      singleQuote = true;
      singleAttributePerLine = true;
      trailingComma = "all";
    };
  };
}
