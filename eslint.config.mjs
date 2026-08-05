import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import pkg from "./package.json" with { type: "json" };

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    settings: {
      react: {
        version: pkg.dependencies?.react || "19.0.0",
      },
    },
  },
  {
    files: ["cypress/**/*.ts"],
    rules: {
      "@typescript-eslint/no-namespace": ["error", { allowDeclarations: true }],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next: are too broad and ignore too many files that should be linted.
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
