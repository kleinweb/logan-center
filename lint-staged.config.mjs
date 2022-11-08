// SPDX-FileCopyrightText: 2022 Temple University
//
// SPDX-License-Identifier: GPL-3.0-or-later

import path from 'path'

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`

export default {
  // FIXME: per-workspace
  // '*.{js,jsx,ts,tsx}': [buildEslintCommand],
  // '**/*.ts?(x)': () => 'tsc -p tsconfig.json --noEmit',
  '*': 'prettier --ignore-unknown --write',
}
