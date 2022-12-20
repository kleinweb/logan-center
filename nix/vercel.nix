# SPDX-FileCopyrightText: 2022 Temple University <kleinweb@temple.edu>
# SPDX-License-Identifier: GPL-3.0-or-later
{
  flake.nixagoFiles."nextjs-minimal-vercel-config" = {
    output = "apps/nextjs-minimal/vercel.json";
    format = "json";
    hook.mode = "copy";
    configData = let
      fromProjectRoot = cmd: "cd ../.. && " + cmd;
      forWorkspace = name: cmd: cmd + " --filter=${name}";
      forWorkspace' = forWorkspace "@kleinweb/logan-center--nextjs-minimal";
    in {
      buildCommand = fromProjectRoot (forWorkspace' "yarn turbo build");
      devCommand = fromProjectRoot (forWorkspace' "yarn turbo dev");
      installCommand = fromProjectRoot "yarn install --immutable";
    };
  };
}
