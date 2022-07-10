module.exports = {
  extends: [
    'react-app',
    'plugin:prettier/recommended',
  ],
  rules: {
    'import/no-anonymous-default-export': 'off',
    'no-debugger': 'error',
    'no-unused-expressions': 'off',
    'prefer-const': 'error',
  },
};
