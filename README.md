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
yarn turbo build
```

### Development

```sh
# yarn turbo dev
yarn workspace nextjs-gh-pages dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

## Learn More

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
