export default {
  // Include parentheses around a sole arrow function parameter.
  // @see: https://prettier.io/docs/en/options.html#arrow-function-parentheses
  arrowParens: 'always',
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
  endOfLine: 'lf',
  // For readability we recommend against using more than `80` characters
  // @see: https://prettier.io/docs/en/options.html#print-width
  printWidth: 80,
  // Print semicolons at the ends of statements.
  // @see https://prettier.io/docs/en/options.html#semicolons
  semi: true,
  // Use single quotes instead of double quotes.
  // @see https://prettier.io/docs/en/options.html#quotes
  singleQuote: false,
  // Specify the number of spaces per indentation-level.
  // @see https://prettier.io/docs/en/options.html#tab-width
  tabWidth: 2,
  // Print trailing commas wherever possible in multi-line comma-separated
  // syntactic structures. (A single-line array, for example, never gets
  // trailing commas.)
  // @see https://prettier.io/docs/en/options.html#trailing-commas
  trailingComma: 'es5',
};
