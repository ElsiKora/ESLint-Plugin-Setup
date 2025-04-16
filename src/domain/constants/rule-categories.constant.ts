/**
 * Categories for organizing ESLint rules
 */
export const RULE_CATEGORIES = {
  PACKAGE_JSON: 'package-json',
  DEPENDENCIES: 'dependencies',
  SECURITY: 'security', 
  BEST_PRACTICES: 'best-practices',
  FORMATTING: 'formatting',
  COMPATIBILITY: 'compatibility'
} as const;

/**
 * Type for rule categories
 */
export type RuleCategory = typeof RULE_CATEGORIES[keyof typeof RULE_CATEGORIES];