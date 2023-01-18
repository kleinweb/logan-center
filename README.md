<!--
SPDX-FileCopyrightText: 2022 Temple University
SPDX-License-Identifier: CC0-1.0
-->

# Logan Center for Urban Investigative Reporting

This web project is produced by the Digital Initiatives team at Temple
University's Klein College of Media and Communication.

In its initial stages, the project consists of a static Next.js site hosted on
GitHub Pages from this repo.

In the near future, the Next.js fronted will ingest content from WordPress.

## Getting Started

Work in progress.

### Prerequisites

- Nix
- Docker Desktop
- Direnv (recommended)

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

The codebase is structured following the monorepo pattern,
specifically following the [`kitchen-sink`][turbo-kitchen-sink-example]
and [`with-tailwind`][turbo-with-tailwind-example]
examples laid out in Turbo's own monorepo.

Turbo's earlier examples (from which this project grew) left much to the imagination.
Consider referring to any updated examples when a Turbo release adds new features
and if the changes seem to offer a significant improvement,
update the project accordingly.

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
