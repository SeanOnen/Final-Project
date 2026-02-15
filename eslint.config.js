import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.js"],
    ...js.configs.recommended,

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },

    rules: {
      // Allow console logs in dashboard
      "no-console": "off",

      // Warn but don't fail on unused vars
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

      // Enforce const where possible
      "prefer-const": "warn",

      // Cleaner code style
      "no-var": "error",
      "eqeqeq": "warn"
    },
  },
]);