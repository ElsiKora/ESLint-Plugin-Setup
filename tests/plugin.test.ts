import { describe, test, expect, beforeEach } from 'vitest';
import { PackageJsonValidatorService } from '../src/application/services/package-json-validator.service';
import { REQUIRED_PACKAGE_JSON_FIELDS } from '../src/domain/constants/required-package-json-fields.constant';
import validPackageJson from './valid-package.json';
import invalidPackageJson from './invalid-package.json';

describe('PackageJsonValidatorService', () => {
  let validator: PackageJsonValidatorService;

  beforeEach(() => {
    validator = new PackageJsonValidatorService();
  });

  test('getRequiredFields should return all required fields', () => {
    const fields = validator.getRequiredFields();
    expect(fields).toEqual(REQUIRED_PACKAGE_JSON_FIELDS);
    expect(fields.length).toBe(8); // Make sure we have 8 required fields
  });

  test('validate should return isValid=true for valid package.json', () => {
    const result = validator.validate(validPackageJson);
    expect(result.isValid).toBe(true);
    expect(result.missingFields).toEqual([]);
  });

  test('validate should return isValid=false with missing fields for invalid package.json', () => {
    const result = validator.validate(invalidPackageJson);
    expect(result.isValid).toBe(false);
    expect(result.missingFields).toContain('description');
    expect(result.missingFields).toContain('scripts');
    expect(result.missingFields).toContain('keywords');
    expect(result.missingFields).toContain('author');
    expect(result.missingFields).toContain('license');
  });

  test('validate should handle non-object inputs', () => {
    const result = validator.validate(null);
    expect(result.isValid).toBe(false);
    expect(result.missingFields.length).toBe(REQUIRED_PACKAGE_JSON_FIELDS.length);
    
    const stringResult = validator.validate('not an object');
    expect(stringResult.isValid).toBe(false);
    expect(stringResult.missingFields.length).toBe(REQUIRED_PACKAGE_JSON_FIELDS.length);
  });
});