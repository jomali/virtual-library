module.exports = {
  // At first glance, avoiding parentheses may look like a better choice
  // because of less visual noise. However, when Prettier removes parentheses,
  // it becomes harder to add type annotations, extra arguments or default
  // values as well as making other changes. Consistent use of parentheses
  // provides a better developer experience when editing real codebases, which
  // justifies the default value for the option.
  // @see: https://prettier.io/docs/en/options.html#arrow-function-parentheses
  arrowParens: 'always',
  // For readability we recommend against using more than `80` characters
  // @see: https://prettier.io/docs/en/options.html#print-width
  printWidth: 80,
  // @see: https://prettier.io/docs/en/options.html#quotes
  singleQuote: true,
  // @see: https://prettier.io/docs/en/options.html#tab-width
  tabWidth: 2,
  // Default value changed from `none` to `es5` in v2.0.0
  // @see: https://prettier.io/docs/en/options.html#trailing-commas
  trailingComma: 'es5',
};
