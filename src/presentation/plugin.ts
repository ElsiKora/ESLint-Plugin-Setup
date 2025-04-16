import { createPackageJsonRule } from "../infrastructure/eslint/package-json-eslint-rule.js";
import { createPackageJsonTypeRule } from "../infrastructure/eslint/package-json-type-eslint-rule.js";

/**
 * Plugin configuration object for ESLint
 */
export const packageJsonPlugin = {
  /**
   * Plugin rules definitions
   */
  rules: {
    "require-fields": createPackageJsonRule(),
    "require-module-type": createPackageJsonTypeRule(),
  },
  
  /**
   * Recommended configuration for this plugin
   */
  configs: {
    recommended: {
      plugins: ["package-json-validator"],
      rules: {
        "package-json-validator/require-fields": "error",
        "package-json-validator/require-module-type": "error",
      },
    },
  },
};