module.exports = {
  // At first glance, avoiding parentheses may look like a better choice
  // because of less visual noise. However, when Prettier removes parentheses,
  // it becomes harder to add type annotations, extra arguments or default
  // values as well as making other changes. Consistent use of parentheses
  // provides a better developer experience when editing real codebases, which
  // justifies the default value for the option.
  // @see: https://prettier.io/docs/en/options.html#arrow-function-parentheses
  arrowParens: "always",
  // Put the > of a multi-line HTML (HTML, JSX, Vue, Angular) element at the
  // end of the last line instead of being alone on the next line (does not
  // apply to self closing elements).
  // @see: https://prettier.io/docs/en/options.html#bracket-line
  bracketSameLine: false,
  // Print spaces between brackets in object literals.
  // @see: https://prettier.io/docs/en/options.html#bracket-spacing
  bracketSpacing: true,
  // For historical reasons, there exist two common flavors of line endings in
  // text files. That is \n (or LF for Line Feed) and \r\n (or CRLF for
  // Carriage Return + Line Feed). The former is common on Linux and macOS,
  // while the latter is prevalent on Windows.
  // @see: https://prettier.io/docs/en/options.html#end-of-line
  endOfLine: "auto",
  // For readability we recommend against using more than `80` characters.
  // @see: https://prettier.io/docs/en/options.html#print-width
  printWidth: 80,
  // Double or single quotes? We opt to use the one which results in the fewest
  // number of escapes: "It's gettin' better!", not 'It\'s gettin\' better!'.
  // @see: https://prettier.io/docs/en/options.html#quotes
  singleQuote: false,
  // @see: https://prettier.io/docs/en/options.html#tab-width
  tabWidth: 2,
  // Default value changed from `none` to `es5` in v2.0.0
  // @see: https://prettier.io/docs/en/options.html#trailing-commas
  trailingComma: "es5",
};
