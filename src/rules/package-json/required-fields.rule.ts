import { PackageJsonValidator } from '../../domain/validators/package-json.validator.js';
import { RULE_CATEGORIES } from '../../domain/constants/rule-categories.constant.js';
import { isFilenameMatch, safeParseJson } from '../../utils/file-utils.js';
import { isRootJsonObject } from '../../utils/ast-utils.js';

/**
 * ESLint rule for validating required fields in package.json
 */
export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce required fields in package.json',
      category: RULE_CATEGORIES.PACKAGE_JSON,
      recommended: true,
    },
    fixable: null,
    schema: [], // no options
  },
  create(context: any) {
    // Flag to track if we've already processed the root object
    let processed = false;
    
    return {
      // This selector works with jsonc-eslint-parser
      'JSONObjectExpression'(node: any) {
        try {
          // Only process package.json files and only once
          const filename = context.getFilename();
          if (!isFilenameMatch(filename, 'package.json') || processed || !isRootJsonObject(node)) {
            return;
          }
          
          // Mark as processed to avoid duplicate validations
          processed = true;
          
          // Get source code and parse it directly
          const sourceCode = context.getSourceCode().getText();
          const packageJson = safeParseJson(sourceCode);
          
          if (!packageJson) {
            context.report({
              node,
              message: 'Error parsing package.json',
            });
            return;
          }
          
          // Validate the package.json
          const validationResults = PackageJsonValidator.validateRequiredFields(packageJson);
          
          // Report any validation issues
          for (const result of validationResults) {
            context.report({
              node,
              message: result.message,
            });
          }
        } catch (error) {
          // Report errors
          context.report({
            node, 
            message: `Error processing package.json: ${(error as Error).message}`,
          });
        }
      }
    };
  },
};