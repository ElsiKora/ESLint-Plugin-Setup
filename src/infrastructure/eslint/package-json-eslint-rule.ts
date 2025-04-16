import type { IPackageJsonValidator } from "../../domain/interfaces/package-json-validator.interface.js";
import { PackageJsonValidatorService } from "../../application/services/package-json-validator.service.js";

/**
 * ESLint rule for validating package.json files
 */
export const createPackageJsonRule = () => {
  // Initialize the validator service
  const validator: IPackageJsonValidator = new PackageJsonValidatorService();

  return {
    meta: {
      type: "problem",
      docs: {
        description: "Enforce required fields in package.json",
        category: "Possible Errors",
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
        // We only want to process the root object of the package.json file
        "Program > JSONExpressionStatement > JSONObjectExpression"(node: any) {
          try {
            const filename = context.getFilename();
            if (!filename.endsWith("package.json") || processed) {
              return;
            }
            
            // Mark as processed to avoid duplicate validations
            processed = true;
            
            // Get source code and parse it directly
            // This avoids issues with the AST structure
            const sourceCode = context.getSourceCode().getText();
            const packageJson = JSON.parse(sourceCode);
            
            // Validate the package.json
            const result = validator.validate(packageJson);
            
            if (!result.isValid) {
              // Report missing fields
              context.report({
                node,
                message: `Package.json is missing required fields: ${result.missingFields.join(", ")}`,
              });
            }
          } catch (error) {
            // Report JSON parsing errors
            context.report({
              node, 
              message: `Error processing package.json: ${(error as Error).message}`,
            });
          }
        }
      };
    },
  };
};