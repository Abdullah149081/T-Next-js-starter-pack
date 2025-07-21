import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const eslintConfig = [
  // Ignore patterns
  {
    ignores: [
      "**/.next",
      "**/.cache",
      "**/node_modules",
      "**/dist",
      "**/build",
      "**/.env*",
      "**/next-env.d.ts",
      "**/next.config.*",
      "**/postcss.config.*",
      "**/tailwind.config.*",
      "eslint.config.mjs",
      "**/package-lock.json",
      "**/pnpm-lock.yaml",
      "**/yarn.lock",
      "**/*.min.js",
      "**/public/**",
    ],
  },

  // Core configuration with Next.js, TypeScript, and Core Web Vitals
  ...compat.config({
    extends: [
      "eslint:recommended",
      "next/core-web-vitals", // Core Web Vitals rules
      "next/typescript", // TypeScript-specific rules
      "prettier", // Prettier integration
      "plugin:prettier/recommended",
    ],

    rules: {
      // TypeScript-specific rules
      "@typescript-eslint/no-unused-vars": [
        "warn",
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
      "react/react-in-jsx-scope": "off", // Not needed in Next.js
      "react/prop-types": "off", // TypeScript handles this
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
      "no-var": "warn",
      "no-unused-vars": "off", // Handled by TypeScript rule
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
      "import/no-duplicates": "warn",
      "import/no-unresolved": "off", // TypeScript handles this

      // Prettier rules
      "prettier/prettier": [
        "warn",
        {
          // Prettier config options
          endOfLine: "auto",
          trailingComma: "all",
          tabWidth: 2,
          semi: true,
          printWidth: 80,

          // ESLint specific options
          usePrettierrc: true, // Use .prettierrc file (default: true)
          fileInfoOptions: {
            withNodeModules: false,
          },
        },
      ],

      // Accessibility rules (included in core-web-vitals)
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

    env: {
      browser: true,
      es2021: true,
      node: true,
    },

    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
  }),

  // Additional configuration for test files
  {
    files: ["**/*.test.{js,jsx,ts,tsx}", "**/*.spec.{js,jsx,ts,tsx}"],
    rules: {
      "no-console": "off", // Allow console in tests
      "@typescript-eslint/no-explicit-any": "off", // More lenient in tests
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
];

export default eslintConfig;
