/**
 * Utilities for working with AST in ESLint rules
 */

/**
 * Gets a property from a JSON object node by property name
 * @param node - The JSON object node
 * @param propertyName - The name of the property to find
 * @returns The property node if found, or undefined
 */
export const getJsonProperty = (node: any, propertyName: string): any => {
  if (!node || !node.properties || !Array.isArray(node.properties)) {
    return undefined;
  }
  
  return node.properties.find((prop: any) => 
    prop.key && prop.key.value === propertyName
  );
};

/**
 * Creates a fixer function to replace a property value in a JSON object
 * @param propertyNode - The property node to fix
 * @param newValue - The new value to set
 * @returns A fix function that replaces the property value
 */
export const createPropertyValueFixer = (propertyNode: any, newValue: string) => {
  return (fixer: any) => fixer.replaceText(propertyNode.value, newValue);
};

/**
 * Determines if a node is a root JSON object in a file
 * @param node - The node to check
 * @returns True if the node is a root JSON object
 */
export const isRootJsonObject = (node: any): boolean => {
  return (
    node.type === 'JSONObjectExpression' && 
    node.parent && 
    node.parent.type === 'JSONExpressionStatement' && 
    node.parent.parent && 
    node.parent.parent.type === 'Program'
  );
};