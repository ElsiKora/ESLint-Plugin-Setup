import { REQUIRED_PACKAGE_JSON_FIELDS } from '../constants/required-package-json-fields.constant.js';
import { ValidationResult } from '../interfaces/validation-result.interface.js';
import type { IPackageJson } from '../interfaces/package-json.interface.js';

/**
 * Pure validation logic for package.json files
 */
export class PackageJsonValidator {
  /**
   * Validates required fields in a package.json object
   * @param packageJson - The package.json object to validate
   * @returns Array of validation results
   */
  static validateRequiredFields(packageJson: unknown): ValidationResult[] {
    const results: ValidationResult[] = [];
    
    if (!packageJson || typeof packageJson !== 'object') {
      return REQUIRED_PACKAGE_JSON_FIELDS.map(field => ({
        field,
        message: `Missing required field: ${field}`,
        severity: 'error',
      }));
    }
    
    for (const field of REQUIRED_PACKAGE_JSON_FIELDS) {
      if (
        !(field in (packageJson as Record<string, unknown>)) || 
        PackageJsonValidator.isEmptyValue((packageJson as Record<string, unknown>)[field])
      ) {
        results.push({
          field,
          message: `Missing required field: ${field}`,
          severity: 'error',
        });
      }
    }
    
    return results;
  }
  
  /**
   * Validates the type field in package.json
   * @param packageJson - The package.json object to validate
   * @returns Array of validation results
   */
  static validateTypeField(packageJson: unknown): ValidationResult[] {
    if (!packageJson || typeof packageJson !== 'object') {
      return [{
        field: 'type',
        message: "Package.json must have 'type' field set to 'module'",
        severity: 'error',
      }];
    }
    
    const typedPackage = packageJson as Partial<IPackageJson>;
    
    if (!typedPackage.type) {
      return [{
        field: 'type',
        message: "Package.json must have 'type' field set to 'module'",
        severity: 'error',
      }];
    }
    
    if (typedPackage.type !== 'module') {
      return [{
        field: 'type',
        message: `Package.json 'type' field must be set to 'module', found '${typedPackage.type}'`,
        severity: 'error',
      }];
    }
    
    return [];
  }
  
  /**
   * Helper method to check if a value is empty
   * @param value - The value to check
   * @returns boolean indicating if the value is empty
   */
  private static isEmptyValue(value: unknown): boolean {
    if (value === undefined || value === null) {
      return true;
    }

    if (typeof value === 'string' && value.trim() === '') {
      return true;
    }

    if (Array.isArray(value) && value.length === 0) {
      return true;
    }

    if (typeof value === 'object' && Object.keys(value).length === 0) {
      return true;
    }

    return false;
  }
}