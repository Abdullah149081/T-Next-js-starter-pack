import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier/flat";
import prettierPlugin from "eslint-plugin-prettier";
import nextPlugin from "@next/eslint-plugin-next";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettierConfig,
  {
    plugins: {
      prettier: prettierPlugin,
      next: nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      // TypeScript-specific rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/array-type": ["warn", { default: "array" }],
      "@typescript-eslint/consistent-type-assertions": [
        "warn",
        {
          assertionStyle: "as",
          objectLiteralTypeAssertions: "never",
        },
      ],

      // React/Next.js specific rules
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-key": "error",
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-no-undef": "error",
      "react/no-unescaped-entities": "warn",
      "react/no-unknown-property": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Next.js specific rules
      "@next/next/no-img-element": "warn",
      "@next/next/no-page-custom-font": "warn",
      "@next/next/no-unwanted-polyfillio": "error",

      // General JavaScript/TypeScript rules
      "prefer-const": "warn",
      "no-var": "error",
      "no-unused-vars": "off",
      "no-console": "warn",
      "no-debugger": "error",
      "object-shorthand": "warn",
      "prefer-template": "warn",
      "prefer-arrow-callback": "warn",
      "no-duplicate-imports": "error",

      // Import rules
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          "newlines-between": "never",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "import/no-duplicates": "error",
      "import/no-unresolved": "off",

      // Prettier rules
      "prettier/prettier": [
        "warn",
        {
          endOfLine: "auto",
          trailingComma: "all",
          tabWidth: 2,
          semi: true,
          printWidth: 80,
          usePrettierrc: true,
          fileInfoOptions: {
            withNodeModules: false,
          },
        },
      ],

      // Accessibility rules
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-has-content": "warn",
      "jsx-a11y/anchor-is-valid": "warn",
      "jsx-a11y/aria-props": "warn",
      "jsx-a11y/aria-proptypes": "warn",
      "jsx-a11y/aria-unsupported-elements": "warn",
      "jsx-a11y/role-has-required-aria-props": "warn",
      "jsx-a11y/role-supports-aria-props": "warn",

      // Performance rules
      "no-await-in-loop": "warn",
      "prefer-destructuring": [
        "warn",
        {
          array: true,
          object: true,
        },
        {
          enforceForRenamedProperties: false,
        },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
      },
    },
  },

  // Additional configuration for test files
  {
    files: ["**/*.test.{js,jsx,ts,tsx}", "**/*.spec.{js,jsx,ts,tsx}"],
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },

  // Configuration for configuration files
  {
    files: ["*.config.{js,ts,mjs}", "*.setup.{js,ts}"],
    rules: {
      "no-console": "off",
      "import/no-anonymous-default-export": "off",
    },
  },

  // Override default ignores of eslint-config-next
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "**/.next",
    "**/.cache",
    "**/node_modules",
    "**/dist",
    "**/build",
    "**/.env*",
    "**/next-env.d.ts",
    "**/next.config.*",
    "**/postcss.config.*",
    "eslint.config.mjs",
    "**/package-lock.json",
    "**/pnpm-lock.yaml",
    "**/yarn.lock",
    "**/*.min.js",
    "**/public/**",
  ]),
]);

export default eslintConfig;
