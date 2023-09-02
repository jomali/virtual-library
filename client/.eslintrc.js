const fs = require("fs");
const path = require("path");
const prettierConfig = require("./.prettierrc.js");

const getAllDirs = (dir) => {
  const directoryPath = path.join(__dirname, dir);
  const files = fs.readdirSync(directoryPath);
  return files.map((value) => value.split(".")[0]);
};

module.exports = {
  extends: ["react-app", "eslint:recommended", "plugin:prettier/recommended"],
  plugins: ["prettier", "react", "react-hooks"],
  rules: {
    "import/no-anonymous-default-export": "off",
    "import/order": [
      "warn",
      {
        alphabetize: { order: "asc", caseInsensitive: true },
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before",
          },
          {
            // prints 'dir,dir/**' for each dir
            pattern: `{${getAllDirs("src").join(",")},${getAllDirs("src")
              .map((dir) => `${dir}/**`)
              .join(",")}}`,
            group: "internal",
          },
        ],
        pathGroupsExcludedImportTypes: ["react"],
      },
    ],
    // Disallow constant expressions in conditions.
    // @see: https://eslint.org/docs/latest/rules/no-constant-condition
    "no-constant-condition": "warn",
    "no-debugger": "error",
    "no-unused-expressions": "off",
    "no-unused-vars": "warn",
    "prefer-const": "error",
    // Fail if the file does not follow the Prettier formatting rules.
    // Uses the framework's prettier config.
    // https://github.com/prettier/eslint-plugin-prettier
    "prettier/prettier": ["error", prettierConfig],
    // This rule checks all JSX components and verifies that all props are
    // sorted alphabetically. A spread attribute resets the verification.
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-sort-props.md
    "react/jsx-sort-props": [
      "warn",
      {
        callbacksLast: false,
        ignoreCase: true,
        noSortAlphabetically: false,
        reservedFirst: true,
        shorthandFirst: false,
        shorthandLast: false,
      },
    ],
    // Prevent missing props validation in a React component definition
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prop-types.md
    "react/prop-types": ["warn", { skipUndeclared: true }],
  },
};
