import requiredFieldsRule from './package-json/required-fields.rule.js';
import typeFieldRule from './package-json/type-field.rule.js';

/**
 * All rules defined in this plugin
 */
export default {
  'require-fields': requiredFieldsRule,
  'require-module-type': typeFieldRule,
};