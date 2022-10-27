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
