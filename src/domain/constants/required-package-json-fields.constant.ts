/**
 * List of required fields in a package.json file
 */
export const REQUIRED_PACKAGE_JSON_FIELDS = [
  "name",
  "version",
  "description",
  "main",
  "scripts",
  "keywords",
  "author",
  "license"
] as const;

/**
 * Type for required package.json field names
 */
export type TRequiredPackageJsonField = typeof REQUIRED_PACKAGE_JSON_FIELDS[number];