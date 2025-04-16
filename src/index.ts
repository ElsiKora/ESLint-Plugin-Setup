/**
 * ESLint plugin for validating package.json files
 */
import rules from './rules/index.js';
import configs from './configs/index.js';

/**
 * Export plugin in the format ESLint 9 expects
 */
export default {
  name: 'package-json-validator',
  rules,
  configs
};