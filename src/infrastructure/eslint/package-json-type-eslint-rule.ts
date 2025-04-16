/**
 * ESLint rule for validating package.json type field
 * This rule ensures that the "type" field is set to "module"
 */

/**
 * Creates and returns the ESLint rule for validating the package.json type field
 * @returns ESLint rule object
 */
export const createPackageJsonTypeRule = () => {
  return {
    meta: {
      type: "problem",
      docs: {
        description: "Enforce package.json type field to be set to 'module'",
        category: "Possible Errors",
        recommended: true,
      },
      fixable: "code",
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
            const sourceCode = context.getSourceCode().getText();
            const packageJson = JSON.parse(sourceCode);
            
            // Check if type field exists
            if (!('type' in packageJson)) {
              context.report({
                node,
                message: "Package.json must have 'type' field set to 'module'",
                fix(fixer: any) {
                  // Find position to insert the type field
                  // This is a simple implementation and might need enhancement for proper formatting
                  const insertPoint = sourceCode.indexOf('{\n') + 2;
                  return fixer.insertTextAt(insertPoint, '  "type": "module",\n');
                }
              });
              return;
            }
            
            // Check if type field is set to "module"
            if (packageJson.type !== "module") {
              // Find the type field in the source code to report at the correct location
              // This is a simplified approach; a more robust solution would use the AST
              const typeProperty = node.properties.find((prop: any) => 
                prop.key && prop.key.value === "type"
              );
              
              if (typeProperty) {
                context.report({
                  node: typeProperty,
                  message: "Package.json 'type' field must be set to 'module', found '{{actual}}'",
                  data: {
                    actual: packageJson.type
                  },
                  fix(fixer: any) {
                    return fixer.replaceText(typeProperty.value, '"module"');
                  }
                });
              } else {
                // Fallback if we couldn't find the property node
                context.report({
                  node,
                  message: "Package.json 'type' field must be set to 'module', found '{{actual}}'",
                  data: {
                    actual: packageJson.type
                  }
                });
              }
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