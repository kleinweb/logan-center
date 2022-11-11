import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: '${NEXT_PUBLIC_GRAPHQL_ENDPOINT}',
  documents: ['./**/*.tsx', './**/*.graphql'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    'graphql/generated': {
      preset: 'client',
      plugins: [],
    },
  },
}

export default config
