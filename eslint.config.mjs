import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      "**/.next",
      "**/.cache",
      "**/package-lock.json",
      "**/public",
      "**/node_modules",
      "**/next-env.d.ts",
      "**/next.config.ts",
      "**/yarn.lock",
      "**/pnpm-lock.yaml",
      "**/dist",
      "eslint.config.mjs",
      "next.config.js",
      "postcss.config.mjs",
      "tailwind.config.ts",
    ],
  },
  ...compat.extends(
    "eslint:recommended",
    "next",
    "airbnb",
    "prettier",
    "next/core-web-vitals",
    "next/typescript",
    "plugin:prettier/recommended",
    "plugin:@next/next/recommended",
  ),
  {
    plugins: {
      prettier,
      "@typescript-eslint": typescriptEslint,
      react,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: 2021,
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      "import/extensions": 0,
      "react/function-component-definition": 0,
      "prefer-const": "warn",
      "react/jsx-props-no-spreading": "off",
      "no-var": "warn",
      "no-unused-vars": "warn",
      "object-shorthand": "warn",
      "quote-props": ["warn", "as-needed"],

      "@typescript-eslint/array-type": [
        "warn",
        {
          default: "array",
        },
      ],

      "@typescript-eslint/consistent-type-assertions": [
        "warn",
        {
          assertionStyle: "as",
          objectLiteralTypeAssertions: "never",
        },
      ],

      "react/jsx-fragments": ["warn", "syntax"],

      "react/jsx-filename-extension": [
        "warn",
        {
          extensions: [".ts", ".tsx"],
        },
      ],

      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "prettier/prettier": "warn",
      "import/no-cycle": "off",
    },
  },
];
