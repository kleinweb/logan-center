<!--
SPDX-FileCopyrightText: 2022-2023 Temple University
SPDX-License-Identifier: CC0-1.0
-->

# Logan Center for Urban Investigative Reporting

This web project is produced by the Digital Initiatives team at Temple
University's Klein College of Media and Communication.

In its initial stages, the project consists of a static Next.js site hosted on
GitHub Pages from this repo.

In the near future, the Next.js fronted will ingest content from WordPress.

![Netlify Deploy Status](https://img.shields.io/netlify/d85e3d5a-7bc5-4b50-a66c-5a2ce249d665)

![REUSE Compliance](https://img.shields.io/reuse/compliance/github.com/kleinweb/logan-center?style=flat-square)

[![DivNix Standard](https://img.shields.io/badge/DivNix-Standard-green?style=flat&logo=NixOS)](https://github.com/divnix/std)

## Monorepo Structure

This project is a monorepo managed by [Turborepo](https://turborepo.org/) and [Standard](https://std.divnix.com/).

Here's a map of some important locations:

```text
//logan-center
├── apps
│  ├── nextjs-app
│  └── nextjs-minimal
├── flake.nix
├── Justfile
├── nix
│  ├── _automation
│  ├── logan-center
│  ├── media
│  └── wordpress
├── packages
│  ├── eslint-config-custom
│  ├── site-assets
│  ├── tailwind-config
│  ├── tsconfig
│  ├── tu-assets
│  └── ui
└── turbo.json
```

### `apps/`

The applications directory. This includes the documentation, Next.js (frontend), and WordPress (backend).

### `packages/`

Shared packages used by the apps. This includes ESLint, Prettier, and TypeScript configs. As well as the WordPress plugin and theme.

### `turbo.json`

The repo config file. Learn more about configuring [Turborepo](https://turborepo.org/docs/configuration).

### `nix/`

Files configurating the development environment and tool integrations.

## Getting Started

Work in progress.

### Prerequisites

- Nix Package Manager [https://nixos.org]
- Docker Desktop
- Direnv (strongly recommended) [<https://direnv.org>]

### Initial Setup

```bash
direnv allow
yarn install
yarn build
```

### Development

```sh
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

## Updating

```sh
yarn upgrade-interactive
yarn install && yarn build
```

[turbo-kitchen-sink-example]: https://github.com/vercel/turbo/tree/main/examples/kitchen-sink
[turbo-with-tailwind-example]: https://github.com/vercel/turbo/tree/main/examples/with-tailwind

## Configurating

### Nixago Files

Some tool configuration files are generated with Nixago
for the sake of flexibility, annotation (JSON, for example, doesn't allow comments), and reducing clutter.
These files will be defined in a corresponding `*.nix` file
within the `./nix/` directory.

For example, Prettier's `prettierrc` file is configured within
[`prettierrc.json.nix`][file-prettierrc-nix]. Once you've made your edits, go to
your terminal and run `direnv reload`. You should see a message this appear
towards the end of the command output:

```
nixago: '.prettierrc.json' link updated
```

[file-prettierrc-nix]: ./nix/formatters/nixagoFiles/prettierrc.json.nix

## Learning

### Nix

This project uses Standard, an organizational framework for Nix-powered DevOps.
Check out [The Standard Documentation](https://std.divnix.com/)
for more info about Standard.

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out
[the Next.js GitHub repository](https://github.com/vercel/next.js/) - your
feedback and contributions are welcome!

## Licenses

This project is primarily licensed under the GNU General Public License version
3.0 or later, though some code is derived from other sources with other
licenses.

See [`./.reuse/dep5`](./.reuse/dep5) and [`./LICENSES`](./LICENSES/) for
detailed information.

## Credits

Many thanks to the following projects for passive guidance:

- <https://github.com/gregrickaby/nextjs-wordpress>
- <https://github.com/Automattic/vip-go-nextjs-skeleton>
