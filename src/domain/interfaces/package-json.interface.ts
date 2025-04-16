/**
 * Interface representing the structure of a package.json file
 * with the required fields according to our validation rules.
 */
export interface IPackageJson {
  name: string;
  version: string;
  description: string;
  main: string;
  scripts: Record<string, string>;
  keywords: string[];
  author: string;
  license: string;
  type?: "module" | "commonjs";
}

/**
 * Interface for package.json validation results
 */
export interface IPackageJsonValidationResult {
  isValid: boolean;
  missingFields: string[];
  invalidFields?: Record<string, string>;
}