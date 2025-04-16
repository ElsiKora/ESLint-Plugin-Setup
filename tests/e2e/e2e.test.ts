import { describe, test, expect, beforeAll } from 'vitest';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PackageJsonValidatorService } from '../../src/application/services/package-json-validator.service';
import { createPackageJsonRule } from '../../src/infrastructure/eslint/package-json-eslint-rule';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Plugin E2E Tests', () => {
  // Read file content
  const readJson = (filePath: string) => {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  };

  describe('PackageJsonValidatorService Direct Tests', () => {
    let validator: PackageJsonValidatorService;

    beforeAll(() => {
      validator = new PackageJsonValidatorService();
    });

    test('should validate a valid package.json without errors', () => {
      const validFile = path.join(__dirname, 'valid-package.json');
      const validPackage = readJson(validFile);
      
      const result = validator.validate(validPackage);
      
      expect(result.isValid).toBe(true);
      expect(result.missingFields).toEqual([]);
    });

    test('should report errors for an invalid package.json', () => {
      const invalidFile = path.join(__dirname, 'invalid-package.json');
      const invalidPackage = readJson(invalidFile);
      
      const result = validator.validate(invalidPackage);

      console.log("RES", result);
      expect(result.isValid).toBe(false);
      expect(result.missingFields).toContain('description');
      expect(result.missingFields).toContain('scripts');
      expect(result.missingFields).toContain('keywords');
      expect(result.missingFields).toContain('author');
      expect(result.missingFields).toContain('license');
    });
  });

  describe('ESLint Rule Tests', () => {
    test('rule should be properly exported', () => {
      const rule = createPackageJsonRule();
      
      // Check rule structure
      expect(rule).toBeDefined();
      expect(rule.meta).toBeDefined();
      expect(rule.meta.type).toBe('problem');
      expect(rule.create).toBeTypeOf('function');
    });

    test('rule should implement proper validation in create()', () => {
      const rule = createPackageJsonRule();
      const mockContext = {
        getFilename: () => 'package.json',
        getSourceCode: () => ({
          getText: () => JSON.stringify({
            name: 'test',
            version: '1.0.0'
          })
        }),
        report: vitest.fn()
      };
      
      // Execute rule
      const handlers = rule.create(mockContext);
      
      // Check the selector handler exists
      const selector = "Program > JSONExpressionStatement > JSONObjectExpression";
      expect(handlers[selector]).toBeTypeOf('function');
      
      // Execute the handler with a mock node
      handlers[selector]({});
      
      // Verify the report function was called for missing fields
      expect(mockContext.report).toHaveBeenCalled();
      
      // Check the call arguments
      const reportCall = mockContext.report.mock.calls[0][0];
      expect(reportCall.message).toContain('missing required fields');
    });
  });
});
