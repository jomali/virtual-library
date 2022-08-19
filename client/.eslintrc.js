module.exports = {
  extends: ['react-app', 'eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['prettier', 'react', 'react-hooks'],
  rules: {
    'import/no-anonymous-default-export': 'off',
    'no-debugger': 'error',
    'no-unused-expressions': 'off',
    'prefer-const': 'error',
  },
};
