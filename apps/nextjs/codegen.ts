// SPDX-FileCopyrightText: 2023 Temple University <kleinweb@temple.edu>
// SPDX-License-Identifier: GPL-3.0-or-later

import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  // schema: 'https://logancenter-wp.klein.local/wp/graphql',
  documents: ['./graphql/**/*.graphql'],
  require: ['ts-node/register'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    'graphql/generated/index.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        // https://www.graphql-code-generator.com/docs/plugins/typescript-react-apollo
        'typescript-react-apollo',
      ],
    },
    'graphql/generated/fragmentMatcher.ts': {
      plugins: ['fragment-matcher'],
    },

    // 'graphql/generated': {
    //   preset: 'client',
    //   plugins: [],
    // },
  },
}

export default config
