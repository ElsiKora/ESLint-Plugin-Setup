import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PackageJsonValidatorService } from '../src/application/services/package-json-validator.service';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to get fixture path
function getFixturePath(relativePath: string): string {
  return path.resolve(__dirname, 'fixtures', relativePath);
}

// Helper to read and parse JSON
function readJsonFile(filePath: string): any {
  const content = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(content);
}

describe('Package.json Validator E2E Tests', () => {
  let validator: PackageJsonValidatorService;

  beforeEach(() => {
    validator = new PackageJsonValidatorService();
  });

  describe('Valid package.json', () => {
    it('should validate a complete package.json with all required fields', () => {
      const validFilePath = getFixturePath('valid-package.json');
      const packageJson = readJsonFile(validFilePath);
      
      const result = validator.validate(packageJson);
      
      expect(result.isValid).toBe(true);
      expect(result.missingFields).toEqual([]);
    });
  });

  describe('Invalid package.json', () => {
    it('should report missing fields in invalid package.json', () => {
      const invalidFilePath = getFixturePath('invalid-package.json');
      const packageJson = readJsonFile(invalidFilePath);
      
      const result = validator.validate(packageJson);
      
      expect(result.isValid).toBe(false);
      expect(result.missingFields).toContain('description');
      expect(result.missingFields).toContain('scripts');
      expect(result.missingFields).toContain('keywords');
      expect(result.missingFields).toContain('author');
      expect(result.missingFields).toContain('license');
    });
  });

  describe('ESLint Rule Implementation', () => {
    it('should have correct rule metadata', async () => {
      // Import the rule implementation using dynamic import
      const { createPackageJsonRule } = await import('../src/infrastructure/eslint/package-json-eslint-rule');
      const rule = createPackageJsonRule();
      
      // Verify rule properties
      expect(rule.meta).toBeDefined();
      expect(rule.meta.type).toBe('problem');
      expect(rule.create).toBeTypeOf('function');
    });
    
    it('should report errors for invalid package.json in ESLint context', async () => {
      // Import the rule implementation using dynamic import
      const { createPackageJsonRule } = await import('../src/infrastructure/eslint/package-json-eslint-rule');
      const rule = createPackageJsonRule();
      
      // Set up a mock ESLint context
      const mockContext = {
        getFilename: () => 'package.json',
        getSourceCode: () => ({
          getText: () => JSON.stringify({
            name: 'test',
            version: '1.0.0'
            // Missing required fields
          })
        }),
        report: vitest.fn()
      };
      
      // Get the rule handlers
      const handlers = rule.create(mockContext);
      
      // Call the handler which should trigger validation
      const selector = "Program > JSONExpressionStatement > JSONObjectExpression";
      handlers[selector]({});
      
      // Verify the report function was called with error
      expect(mockContext.report).toHaveBeenCalled();
      const reportCall = mockContext.report.mock.calls[0][0];
      expect(reportCall.message).toContain('missing required fields');
    });
  });
});