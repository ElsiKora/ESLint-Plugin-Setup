import pluginModule from '../dist/index.js';

/**
 * ESLint configuration for testing
 * IMPORTANT: This is only used for testing purposes
 */
export default [
  {
    // Process JSON files - important for ESLint to recognize JSON files
    files: ["**/*.json"],
    
    // Register our plugin with ESLint
    plugins: {
      "package-json-validator": pluginModule
    },
    
    // Enable our rule
    rules: {
      "package-json-validator/require-fields": "error"
    }
  }
];