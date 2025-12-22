import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // 🔹 Code applicatif
  {
    files: ["**/*.{js,mjs,cjs}"],
    ignores: ["**/*.test.js"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.browser
    },
    rules: {
      "no-console": "error"
    }
  },

  // 🔹 Fichiers de test (Jest)
  {
    files: ["**/*.test.js"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest
      }
    }
  }
]);

