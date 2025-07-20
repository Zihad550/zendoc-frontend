import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...compat.config({
    extends: ["next"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-empty-object-type": "off",
      "@next/next/no-img-element": "off",
      "react/no-unescaped-entities": "warn",
    },
    overrides: [
      {
        files: [
          "**/__tests__/**/*.{ts,tsx}",
          "**/*.test.{ts,tsx}",
          "**/test/**/*.{ts,tsx}",
        ],
        rules: {
          "@typescript-eslint/no-unused-vars": "off",
          "@next/next/no-img-element": "off",
        },
      },
    ],
  }),
];

export default eslintConfig;
