# Changelog
All notable changes to this project will be documented in this file. See [conventional commits](https://www.conventionalcommits.org/) for commit guidelines.

- - -
## v0.2.0 - 2022-12-21
#### Bug Fixes
- **(assets)** hard-code cherry fill color in tu logo icon svg (#84) - (27d3195) - chris montgomery
- **(assets)** hard-code cherry fill color in tu logo icon svg - (a7a124d) - Chris Montgomery
- **(assets:logo)** remove fixed w/h on logo icon - (9e58f98) - Chris Montgomery
- **(banner)** prevent logo from disappearing on safari (#71) - (a783473) - chris montgomery
- **(banner)** prevent logo from disappearing on safari - (7c9de85) - Chris Montgomery
- **(ci)** `clean` before `build` - (55ccaca) - Chris Montgomery
- **(deps)** update dependency eslint-plugin-react to v7.31.11 (#78) - (13eff3f) - chris montgomery
- **(deps)** update dependency lucide-react to ^0.104.0 (#83) - (5280dc7) - chris montgomery
- **(deps)** update dependency lucide-react to ^0.104.0 - (0523845) - renovate[bot]
- **(deps)** update dependency eslint-plugin-react to v7.31.11 - (da25b95) - renovate[bot]
- **(env:vscode)** remove workspace file in favor of `settings.json` - (fbb1389) - Chris Montgomery
- **(formatting)** ignore generated typescript declarations - (bcc4b72) - Chris Montgomery
- **(home|content)** reverting rogue cta language changes (#68) - (6bf44c5) - chris montgomery
- **(home|content)** reverting rogue cta language changes - (b30bff1) - Chris Montgomery
- **(tu-assets|logos)** update svg with proper fill - (c6fcc91) - Chris Montgomery
- **(ui)** set ts `include` to existing `src` dir instead of root - (8916163) - Chris Montgomery
- **(ui|builds)** mark all deps as `external` for `tsup` - (efb8e21) - Chris Montgomery
- specify workspaces explicitly to avoid `nextjs-app` for now - (5e38ab6) - Chris Montgomery
#### Build system
- handle misbehaving peer dependency specifications - (2520cb8) - Chris Montgomery
#### Continuous Integration
- remove usages of `private` attribute from `just` tasks - (3e55f66) - Chris Montgomery
- add vercel configuration file for yarn support - (6dcf456) - Chris Montgomery
#### Features
- **(builds)** add cocogitto for semantic versioning/changelogs - (28660ae) - Chris Montgomery
- **(devshells)** replace flyctl with copilot-cli - (e457180) - Chris Montgomery
- **(icons)** replace `ExternalLink` icon with `↗` as external link indicator (#76) - (7ef3e93) - chris montgomery
- **(icons)** replace `ExternalLink` icon with `↗` as external link indicator - (87142d4) - Chris Montgomery
- **(siteFooter|legal)** add link to university privacy statement - (7b65d88) - Chris Montgomery
- **(temple-assets)** package svgs with rollup and svgr - (624f6ed) - Chris Montgomery
- **(tw|fonts)** add semibold weight - (fbfa6b5) - Chris Montgomery
- **(ui)** add component for klein recirc banner - (46eb493) - Chris Montgomery
- **(ui)** add `svgr` support - (926b991) - Chris Montgomery
- **(ui:color)** extend neutral color palette to include full range - (b388a46) - Chris Montgomery
- add cocogitto for version/changelog management (#94) - (e51965d) - chris montgomery
- add `just` tasks - (95cdf5f) - Chris Montgomery
- add klein recirc banner above site header - (50e02d4) - Chris Montgomery
#### Miscellaneous Chores
- **(deps)** yarn upgrade - (c80304a) - Chris Montgomery
- **(deps)** yarn@3.3.0 - (610c091) - Chris Montgomery
- **(deps)** update dependency @graphql-codegen/client-preset to v1.2.1 (#82) - (ea33996) - chris montgomery
- **(deps)** update dependency @graphql-codegen/client-preset to v1.2.1 - (386a5f8) - renovate[bot]
- **(deps)** update graphqlcodegenerator monorepo (#77) - (18d07bd) - chris montgomery
- **(deps)** update graphqlcodegenerator monorepo - (d8af907) - renovate[bot]
- **(deps)** update dependency prettier-plugin-tailwindcss to ^0.2.0 (#79) - (43be8c9) - chris montgomery
- **(deps)** update dependency prettier-plugin-tailwindcss to ^0.2.0 - (789f4bf) - renovate[bot]
- **(deps)** update dependency @graphql-codegen/cli to v2.13.12 (#70) - (c004c0a) - chris montgomery
- **(deps)** update dependency @graphql-codegen/cli to v2.13.12 - (b2b1096) - renovate[bot]
- **(nix)** set cachix cache name via env var (#92) - (341fef2) - chris montgomery
- **(nix)** set cachix cache name via env var - (dfa5123) - Chris Montgomery
- **(ui)** add `tsup` config file - (b95899a) - Chris Montgomery
- **(ui:deps)** add `@wordpress/i18n` - (9141ace) - Chris Montgomery
- align version numbers across workspaces - (e735784) - Chris Montgomery
- yarn eslint sdk update (#91) - (0c05d2e) - chris montgomery
- yarn eslint sdk update - (d13320a) - Chris Montgomery
- sync main (#72) - (9ac05b9) - chris montgomery
#### Refactoring
- **(assets)** rename `{shared,temple}-assets`->`{site,tu}-assets` - (d6eb464) - Chris Montgomery
- **(siteFooter)** rename `Colophon` to `FinePrint` - (751c42c) - Chris Montgomery
- use npm scoped names + various fixes for yarn - (d02c3c8) - Chris Montgomery

- - -

Changelog generated by [cocogitto](https://github.com/cocogitto/cocogitto).