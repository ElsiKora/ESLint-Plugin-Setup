/**
 * Recommended configuration for package-json-validator plugin
 */
export default {
  plugins: ['package-json-validator'],
  rules: {
    'package-json-validator/require-fields': 'error',
    'package-json-validator/require-module-type': 'error',
  },
};