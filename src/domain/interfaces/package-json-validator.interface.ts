import type { IPackageJson, IPackageJsonValidationResult } from "./package-json.interface.js";

/**
 * Interface for package.json validator service
 */
export interface IPackageJsonValidator {
  /**
   * Validates a package.json object against required fields
   * @param packageJson - The package.json object to validate
   * @returns Validation result containing validity and any missing fields
   */
  validate(packageJson: unknown): IPackageJsonValidationResult;
  
  /**
   * Gets the list of required fields for a valid package.json
   * @returns Array of required field names
   */
  getRequiredFields(): string[];
}