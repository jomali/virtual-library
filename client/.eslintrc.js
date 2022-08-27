const fs = require('fs');
const path = require('path');

const getAllDirs = (dir) => {
  const directoryPath = path.join(__dirname, dir);
  const files = fs.readdirSync(directoryPath);
  return files.map((value) => value.split('.')[0]);
};

module.exports = {
  extends: ['react-app', 'eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['prettier', 'react', 'react-hooks'],
  rules: {
    'import/no-anonymous-default-export': 'off',
    'import/order': [
      'warn',
      {
        alphabetize: { order: 'asc', caseInsensitive: true },
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            // prints 'dir,dir/**' for each dir
            pattern: `{${getAllDirs('src').join(',')},${getAllDirs('src')
              .map((dir) => `${dir}/**`)
              .join(',')}}`,
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
      },
    ],
    'no-debugger': 'error',
    'no-unused-expressions': 'off',
    'no-unused-vars': 'warn',
    'prefer-const': 'error',
  },
};
