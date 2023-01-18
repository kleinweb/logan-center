# Changelog
All notable changes to this project will be documented in this file. See [conventional commits](https://www.conventionalcommits.org/) for commit guidelines.

- - -
## v0.3.0 - 2023-01-18
#### Bug Fixes
- **(assets)** hard-code cherry fill color in tu logo icon svg - (40275d0) - Chris Montgomery
- **(assets:logo)** remove fixed w/h on logo icon - (0c99ef0) - Chris Montgomery
- **(banner|logo)** use full logo on all screen sizes - (d7bdffb) - Chris Montgomery
- **(builds)** use yarn's node linker to avoid forever pnp issues - (04e88f3) - Chris Montgomery
- **(builds|assets)** prevent race condition in copy<-clean dep chain - (e68e18b) - Chris Montgomery
- **(ci)** `clean` before `build` - (b79815e) - Chris Montgomery
- **(deps)** update dependency lucide-react to ^0.104.0 - (be9aa75) - renovate[bot]
- **(deps)** update dependency eslint-plugin-react to v7.31.11 - (a717c93) - renovate[bot]
- **(deps)** update dependency lucide-react to ^0.103.0 (#44) - (0387ac0) - chris montgomery
- **(deps)** update dependency lucide-react to ^0.103.0 - (45574ef) - renovate[bot]
- **(env:vscode)** remove workspace file in favor of `settings.json` - (07df79b) - Chris Montgomery
- **(env:vscode|lint|deps)** configurate extensions for `yarn` not `npm` - (025ace5) - Chris Montgomery
- **(formatting)** ignore generated typescript declarations - (c252ef1) - Chris Montgomery
- **(lint|tw)** disable eslint rule conflicting with prettier - (872e6c4) - Chris Montgomery
- **(tu-assets|logos)** update svg with proper fill - (d423517) - Chris Montgomery
- **(tw|deps|media)** remove `aspect-ratio` plugin, use native property - (376b5bb) - Chris Montgomery
- **(ui)** set ts `include` to existing `src` dir instead of root - (74da97f) - Chris Montgomery
- **(ui|builds)** run `dev` commands explicitly for watch capabilities - (8ae4e8a) - Chris Montgomery
- **(ui|builds)** mark all deps as `external` for `tsup` - (5927cad) - Chris Montgomery
- banner logo sizing (#97) - (4dae7a9) - chris montgomery
- no rewrap markdown - (09b5d2a) - Chris Montgomery
- pass inputs instead of `self` to `mkFlake` - (b569b5d) - Chris Montgomery
- specify workspaces explicitly to avoid `nextjs-app` for now - (af39584) - Chris Montgomery
#### Build system
- handle misbehaving peer dependency specifications - (e63d2cc) - Chris Montgomery
#### Continuous Integration
- remove usages of `private` attribute from `just` tasks - (c4d4fbe) - Chris Montgomery
- add vercel configuration file for yarn support - (c464e0a) - Chris Montgomery
#### Documentation
- update build commands - (f53c978) - Chris Montgomery
#### Features
- **(builds)** add cocogitto for semantic versioning/changelogs - (b60c8ef) - Chris Montgomery
- **(deps|assets)** add `react-player` library - (b129714) - Chris Montgomery
- **(devshells)** replace flyctl with copilot-cli - (4764f75) - Chris Montgomery
- **(home|video)** hero background video embed via vimeo - (80a1702) - Chris Montgomery
- **(icons)** replace `ExternalLink` icon with `↗` as external link indicator (#76) - (7ef3e93) - chris montgomery
- **(icons)** replace `ExternalLink` icon with `↗` as external link indicator - (87142d4) - Chris Montgomery
- **(siteFooter|legal)** add link to university privacy statement - (7b65d88) - Chris Montgomery
- **(tasks)** add script to capture a video frame with `ffmpeg` - (a24b274) - Chris Montgomery
- **(temple-assets)** package svgs with rollup and svgr - (faccbc4) - Chris Montgomery
- **(tw)** add spacing size `18` @ `4.5rem` - (15860d0) - Chris Montgomery
- **(tw|fonts)** add semibold weight - (e530076) - Chris Montgomery
- **(tw|media)** add "cinematic" aspect ratio aka "21:9" - (46ff903) - Chris Montgomery
- **(ui)** add component for klein recirc banner - (efd1167) - Chris Montgomery
- **(ui)** add `svgr` support - (c3d5b36) - Chris Montgomery
- **(ui:color)** extend neutral color palette to include full range - (d5b1656) - Chris Montgomery
- add `just` tasks - (c418eeb) - Chris Montgomery
- add klein recirc banner above site header - (b40be16) - Chris Montgomery
#### Miscellaneous Chores
- **(builds)** update turbo config in line with v1.7.0 example - (819a0af) - Chris Montgomery
- **(deps)** updates (#112) - (e2d358b) - chris montgomery
- **(deps)** updates - (223517a) - Chris Montgomery
- **(deps)** bump - (282aef8) - Chris Montgomery
- **(deps)** bump - (b6985cc) - Chris Montgomery
- **(deps)** update flake inputs - (c852ace) - Chris Montgomery
- **(deps)** update yarn to v4.0.0-rc.35 - (25c8aef) - renovate[bot]
- **(deps)** yarn upgrade - (e7c5628) - Chris Montgomery
- **(deps)** yarn@3.3.0 - (3238155) - Chris Montgomery
- **(deps)** update dependency @graphql-codegen/client-preset to v1.2.1 - (28bf71f) - renovate[bot]
- **(deps)** update graphqlcodegenerator monorepo - (8675482) - renovate[bot]
- **(deps)** update dependency prettier-plugin-tailwindcss to ^0.2.0 (#79) - (43be8c9) - chris montgomery
- **(deps)** update dependency prettier-plugin-tailwindcss to ^0.2.0 - (789f4bf) - renovate[bot]
- **(deps)** update dependency @graphql-codegen/cli to v2.13.12 (#70) - (c004c0a) - chris montgomery
- **(deps)** update dependency @graphql-codegen/cli to v2.13.12 - (b2b1096) - renovate[bot]
- **(lint|env:vscode)** require prettier config file - (ad2c89a) - Chris Montgomery
- **(nix)** set cachix cache name via env var - (cb8f950) - Chris Montgomery
- **(reuse)** vercel did not write our tailwind config file - (02727f6) - Chris Montgomery
- **(reuse)** specify correct license for `eslint-config-custom` - (d888ef8) - Chris Montgomery
- **(ui)** add `tsup` config file - (59a4f6a) - Chris Montgomery
- **(ui:deps)** add `@wordpress/i18n` - (9228ff7) - Chris Montgomery
- **(version)** v0.2.1 - (25e4eb6) - Chris Montgomery
- **(version)** v0.2.0 - (2ab0b2b) - Chris Montgomery
- bump versions - (ec25ee4) - Chris Montgomery
- align version numbers across workspaces - (9fe87de) - Chris Montgomery
- yarn eslint sdk update - (99f07ed) - Chris Montgomery
- sync main (#72) - (9ac05b9) - chris montgomery
#### Refactoring
- **(assets)** rename `{shared,temple}-assets`->`{site,tu}-assets` - (6683669) - Chris Montgomery
- **(siteFooter)** rename `Colophon` to `FinePrint` - (751c42c) - Chris Montgomery
- use npm scoped names + various fixes for yarn - (36df4be) - Chris Montgomery

- - -

## v0.2.1 - 2022-12-21
#### Bug Fixes
- **(assets)** hard-code cherry fill color in tu logo icon svg - (46328a9) - Chris Montgomery
- **(assets:logo)** remove fixed w/h on logo icon - (56b412d) - Chris Montgomery
- **(ci)** `clean` before `build` - (9ea6d7c) - Chris Montgomery
- **(deps)** update dependency lucide-react to ^0.104.0 - (504ac23) - renovate[bot]
- **(deps)** update dependency eslint-plugin-react to v7.31.11 - (7489933) - renovate[bot]
- **(env:vscode)** remove workspace file in favor of `settings.json` - (5b356d3) - Chris Montgomery
- **(formatting)** ignore generated typescript declarations - (2ce7c9e) - Chris Montgomery
- **(tu-assets|logos)** update svg with proper fill - (5988922) - Chris Montgomery
- **(ui)** set ts `include` to existing `src` dir instead of root - (89d522e) - Chris Montgomery
- **(ui|builds)** mark all deps as `external` for `tsup` - (4f860aa) - Chris Montgomery
- specify workspaces explicitly to avoid `nextjs-app` for now - (b70f414) - Chris Montgomery
#### Build system
- handle misbehaving peer dependency specifications - (5456fcb) - Chris Montgomery
#### Continuous Integration
- remove usages of `private` attribute from `just` tasks - (730b402) - Chris Montgomery
- add vercel configuration file for yarn support - (84c4301) - Chris Montgomery
#### Features
- **(builds)** add cocogitto for semantic versioning/changelogs - (fc7592a) - Chris Montgomery
- **(devshells)** replace flyctl with copilot-cli - (70d6f61) - Chris Montgomery
- **(icons)** replace `ExternalLink` icon with `↗` as external link indicator - (4b3a732) - Chris Montgomery
- **(siteFooter|legal)** add link to university privacy statement - (87b46b3) - Chris Montgomery
- **(temple-assets)** package svgs with rollup and svgr - (56c4cb3) - Chris Montgomery
- **(tw|fonts)** add semibold weight - (ee9096f) - Chris Montgomery
- **(ui)** add component for klein recirc banner - (8c735e7) - Chris Montgomery
- **(ui)** add `svgr` support - (28551e4) - Chris Montgomery
- **(ui:color)** extend neutral color palette to include full range - (85b754e) - Chris Montgomery
- add `just` tasks - (4f5b28f) - Chris Montgomery
- add klein recirc banner above site header - (5484fc2) - Chris Montgomery
#### Miscellaneous Chores
- **(deps)** yarn upgrade - (6f2f5a4) - Chris Montgomery
- **(deps)** yarn@3.3.0 - (e8a2f73) - Chris Montgomery
- **(deps)** update dependency @graphql-codegen/client-preset to v1.2.1 - (ba3ff57) - renovate[bot]
- **(deps)** update graphqlcodegenerator monorepo - (388e845) - renovate[bot]
- **(deps)** update dependency prettier-plugin-tailwindcss to ^0.2.0 - (572d63a) - renovate[bot]
- **(deps)** update dependency @graphql-codegen/cli to v2.13.12 - (e74f23a) - renovate[bot]
- **(nix)** set cachix cache name via env var - (057aad7) - Chris Montgomery
- **(ui)** add `tsup` config file - (3826317) - Chris Montgomery
- **(ui:deps)** add `@wordpress/i18n` - (3b8070e) - Chris Montgomery
- **(version)** v0.2.0 - (4f33735) - Chris Montgomery
- align version numbers across workspaces - (5614d05) - Chris Montgomery
- yarn eslint sdk update - (37aba67) - Chris Montgomery
- revert "fix(home|content): reverting rogue cta language changes"This reverts commit b30bff1d39eb3b35be41cfa503209e3b0ee05afc. - (402c03c) - Chris Montgomery
#### Refactoring
- **(assets)** rename `{shared,temple}-assets`->`{site,tu}-assets` - (d383917) - Chris Montgomery
- **(siteFooter)** rename `Colophon` to `FinePrint` - (64cacaa) - Chris Montgomery
- use npm scoped names + various fixes for yarn - (2730f9a) - Chris Montgomery

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