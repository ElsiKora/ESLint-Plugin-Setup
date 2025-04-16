import { PackageJsonValidator } from '../../domain/validators/package-json.validator.js';
import { RULE_CATEGORIES } from '../../domain/constants/rule-categories.constant.js';
import { isFilenameMatch, safeParseJson } from '../../utils/file-utils.js';
import { getJsonProperty, createPropertyValueFixer, isRootJsonObject } from '../../utils/ast-utils.js';

/**
 * ESLint rule for validating the type field in package.json
 */
export default {
  meta: {
    type: 'problem',
    docs: {
      description: "Enforce package.json 'type' field to be set to 'module'",
      category: RULE_CATEGORIES.PACKAGE_JSON,
      recommended: true,
    },
    fixable: 'code',
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
          
          // Validate the type field
          const validationResults = PackageJsonValidator.validateTypeField(packageJson);
          
          // Handle validation issues
          if (validationResults.length > 0) {
            const result = validationResults[0]; // We only expect one validation result for type field
            
            // Find the property node if it exists
            const typeProperty = getJsonProperty(node, 'type');
            
            if (!typeProperty) {
              // Type field is missing - suggest adding it
              context.report({
                node,
                message: result.message,
                fix(fixer: any) {
                  // Find position to insert the type field - after the first line with {
                  const insertPoint = sourceCode.indexOf('{\n') + 2;
                  return fixer.insertTextAt(insertPoint, '  "type": "module",\n');
                }
              });
            } else {
              // Type field exists but has wrong value
              context.report({
                node: typeProperty,
                message: result.message,
                fix: createPropertyValueFixer(typeProperty, '"module"')
              });
            }
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