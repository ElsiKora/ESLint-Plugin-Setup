import pluginModule from './dist/index.js';
import * as parserJsonc from 'jsonc-eslint-parser';

/**
 * ESLint configuration for testing
 * IMPORTANT: This is only used for testing purposes
 */
export default [
  // Configuration for all files 
  { 
    ignores: ["node_modules/**"] 
  },
  
  // Specific configuration for package.json files
  {
    files: ["**/package.json"],
    plugins: {
      "package-json-validator": pluginModule
    },
    languageOptions: {
      parser: parserJsonc
    },
    rules: {
      "package-json-validator/require-fields": "error",
      "package-json-validator/require-module-type": "error"
    }
  }
];
