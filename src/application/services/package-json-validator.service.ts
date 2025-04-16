import type { IPackageJson, IPackageJsonValidationResult } from "../../domain/interfaces/package-json.interface.js";
import type { IPackageJsonValidator } from "../../domain/interfaces/package-json-validator.interface.js";
import { REQUIRED_PACKAGE_JSON_FIELDS } from "../../domain/constants/required-package-json-fields.constant.js";

/**
 * Service that validates package.json files against required fields
 */
export class PackageJsonValidatorService implements IPackageJsonValidator {
  /**
   * Get the list of required fields for package.json
   * @returns Array of required field names
   */
  public getRequiredFields(): string[] {
    return [...REQUIRED_PACKAGE_JSON_FIELDS];
  }

  /**
   * Validates a package.json object against required fields
   * @param packageJson - The package.json object to validate
   * @returns Validation result with validity flag and missing fields
   */
  public validate(packageJson: unknown): IPackageJsonValidationResult {
    if (!packageJson || typeof packageJson !== "object") {
      return {
        isValid: false,
        missingFields: this.getRequiredFields(),
      };
    }

    const missingFields: string[] = [];

    for (const field of REQUIRED_PACKAGE_JSON_FIELDS) {
      // Check if field exists and is not empty
      if (
        !(field in packageJson) || 
        this.isEmptyValue((packageJson as Record<string, unknown>)[field])
      ) {
        missingFields.push(field);
      }
    }

    return {
      isValid: missingFields.length === 0,
      missingFields,
    };
  }

  /**
   * Helper method to check if a value is empty
   * @param value - The value to check
   * @returns boolean indicating if the value is empty
   */
  private isEmptyValue(value: unknown): boolean {
    if (value === undefined || value === null) {
      return true;
    }

    if (typeof value === "string" && value.trim() === "") {
      return true;
    }

    if (Array.isArray(value) && value.length === 0) {
      return true;
    }

    if (typeof value === "object" && Object.keys(value).length === 0) {
      return true;
    }

    return false;
  }
}