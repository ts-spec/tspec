module.exports = {
  env: {
    es2020: true,
    mocha: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/member-delimiter-style': ['error', {
      multiline: {
        delimiter: 'comma',
        requireLast: true,
      },
      singleline: {
        delimiter: 'comma',
        requireLast: false,
      },
    }],
    '@typescript-eslint/no-unused-vars': 'error',
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: ['**/test.ts', '**/*.test.ts', 'src/common/test/**/*.ts'],
    }],
    'import/extensions': ['error', 'ignorePackages', {
      ts: 'never',
    }],
    'import/order': ['error', { /* Import Rule: https://github.com/ridi/manta/pull/9#issue-1094003608 */
      groups: [
        'builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object',
      ],
      'newlines-between': 'always',
      alphabetize: {
        order: 'asc', /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */
        caseInsensitive: false,
      },
    }],
    'sort-imports': ['error', {
      ignoreCase: false,
      ignoreDeclarationSort: true,
      ignoreMemberSort: false,
      allowSeparatedGroups: true,
    }],
    'no-unused-vars': 'off',
    'import/prefer-default-export': 'off', // https://github.com/ridi/manta/pull/59
    'max-len': ['error', {
      code: 100,
      ignoreComments: true,
      ignoreUrls: true,
    }],
    'no-shadow': 'off',
  },
  overrides: [
    {
      // Allow some rules for unit test files.
      files: ['**/test.ts', '**/*.test.ts', '**/apiTest/**/*.ts'],
      rules: {
        'import/no-extraneous-dependencies': 'off', // Allow devDependency for unit tests.
        'no-console': 'off', // Allow console for unit tests.
        'no-underscore-dangle': 'off', // Allow underscore dangle like __get__, __set__.
      },
    },
    {
      // Allow some rules for route files to use tsoa.
      files: ['**/route.ts'],
      rules: {
        'class-methods-use-this': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts'],
        paths: ['./src'],
      },
    },
  },
};
