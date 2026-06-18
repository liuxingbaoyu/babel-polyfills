import { defineConfig, globalIgnores } from "eslint/config";
import prettier from "eslint-plugin-prettier";
import babelDevelopment from "@babel/eslint-plugin-development";
import pluginImport from "eslint-plugin-import";
import globals from "globals";
import babelParser from "@babel/eslint-parser";
import typescriptEslint from "typescript-eslint";
import js from "@eslint/js";

export default defineConfig([
  globalIgnores([
    "lib",
    "build",
    ".git",
    "**/package.json",
    "**/lerna.json",
    "packages/*/node_modules",
    "packages/*/lib",
    "packages/*/esm",
    "packages/*/test/fixtures",
    "packages/*/test/spawn-fixtures",
  ]),
  js.configs.recommended,
  {
    plugins: {
      prettier,
      "@babel/development": babelDevelopment,
      import: pluginImport,
    },

    languageOptions: {
      globals: { ...globals.node },

      parser: babelParser,
    },

    rules: { "prettier/prettier": "error" },
  },
  {
    files: ["**/*.ts"],

    plugins: { "@typescript-eslint": typescriptEslint.plugin },

    languageOptions: { parser: typescriptEslint.parser },

    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "error",
    },
  },
  {
    files: ["packages/*/src/**/*.{js,ts}"],

    rules: {
      "@babel/development/no-undefined-identifier": "error",
      "@babel/development/no-deprecated-clone": "error",
      "import/no-extraneous-dependencies": "error",

      eqeqeq: ["error", "always", { null: "ignore" }],

      "guard-for-in": "error",
    },
  },
  {
    files: ["packages/*/test/**/*.js"],

    languageOptions: { globals: { ...globals.jest } },
  },
]);
