import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

import customConfigPrettier from "./.prettierrc.cjs";

export default tseslint.config(
  // TypeScript
  {
    files: ["**/*.{ts,tsx}"],
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
    rules: {
      "no-console": "warn",
      "@typescript-eslint/no-unused-vars": "error",
    },
  },
  // Prettier
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    extends: [eslintPluginPrettierRecommended],
    rules: {
      ...eslintConfigPrettier.rules,
      "prettier/prettier": ["error", customConfigPrettier],
    },
  },
  // Simple import sort
  {
    plugins: {
      "simple-import-sort": eslintPluginSimpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  // React
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    ...eslintPluginReact.configs.flat.recommended,
    languageOptions: {
      ...eslintPluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    rules: {
      // Enforce shorthand or standard form for React fragments
      // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-fragments.md
      "react/jsx-fragments": ["warn", "syntax"],
      // Disallow unnecessary fragments
      // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-useless-fragment.md
      "react/jsx-no-useless-fragment": "error",
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
      // Disallow extra closing tags for components without children
      // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md
      "react/self-closing-comp": [
        "error",
        {
          component: true,
          html: true,
        },
      ],
    },
  }
);
