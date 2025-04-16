import { describe, it, expect, beforeEach, vi } from 'vitest';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createPackageJsonRule } from '../src/infrastructure/eslint/package-json-eslint-rule.js';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to read JSON files
const readJsonFile = (filePath: string) => {
  const content = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(content);
};

// Make sure fixtures directory exists
const fixturesDir = path.join(__dirname, 'fixtures');
if (!fs.existsSync(fixturesDir)) {
  fs.mkdirSync(fixturesDir, { recursive: true });
}

// Create valid fixture if it doesn't exist
const validFixturePath = path.join(fixturesDir, 'valid-package.json');
if (!fs.existsSync(validFixturePath)) {
  fs.writeFileSync(validFixturePath, JSON.stringify({
    "name": "valid-test-package",
    "version": "1.0.0",
    "description": "A valid package.json for testing",
    "main": "index.js",
    "scripts": {
      "test": "jest"
    },
    "keywords": [
      "test",
      "valid"
    ],
    "author": "Test Author",
    "license": "MIT"
  }, null, 2));
}

// Create invalid fixture if it doesn't exist
const invalidFixturePath = path.join(fixturesDir, 'invalid-package.json');
if (!fs.existsSync(invalidFixturePath)) {
  fs.writeFileSync(invalidFixturePath, JSON.stringify({
    "name": "invalid-test-package",
    "version": "1.0.0",
    "main": "index.js"
  }, null, 2));
}

describe('ESLint Rule Tests', () => {
  describe('rule creation', () => {
    it('should create rule with correct metadata', () => {
      const rule = createPackageJsonRule();
      
      expect(rule.meta).toBeDefined();
      expect(rule.meta.type).toBe('problem');
      expect(rule.meta.docs.description).toBe('Enforce required fields in package.json');
      expect(rule.create).toBeTypeOf('function');
    });
  });
  
  describe('rule validation', () => {
    it('should validate valid package.json without errors', () => {
      const rule = createPackageJsonRule();
      const validJson = readJsonFile(validFixturePath);
      
      // Mock ESLint context
      const context = {
        getFilename: () => 'package.json',
        getSourceCode: () => ({
          getText: () => JSON.stringify(validJson)
        }),
        report: vi.fn()
      };
      
      // Execute the rule
      const handlers = rule.create(context);
      const selector = "Program > JSONExpressionStatement > JSONObjectExpression";
      handlers[selector]({});
      
      // Check no errors were reported
      expect(context.report).not.toHaveBeenCalled();
    });
    
    it('should report errors for invalid package.json', () => {
      const rule = createPackageJsonRule();
      const invalidJson = readJsonFile(invalidFixturePath);
      
      // Mock ESLint context
      const context = {
        getFilename: () => 'package.json',
        getSourceCode: () => ({
          getText: () => JSON.stringify(invalidJson)
        }),
        report: vi.fn()
      };
      
      // Execute the rule
      const handlers = rule.create(context);
      const selector = "Program > JSONExpressionStatement > JSONObjectExpression";
      handlers[selector]({});
      
      // Check errors were reported
      expect(context.report).toHaveBeenCalled();
      
      // Verify the error message contains all missing fields
      const reportCall = context.report.mock.calls[0][0];
      const errorMessage = reportCall.message;
      
      expect(errorMessage).toContain('missing required fields');
      
      // Check for each missing field
      const missingFields = ['description', 'scripts', 'keywords', 'author', 'license'];
      missingFields.forEach(field => {
        expect(errorMessage).toContain(field);
      });
    });
    
    it('should handle non-package.json files by ignoring them', () => {
      const rule = createPackageJsonRule();
      
      // Mock context for a non-package.json file
      const context = {
        getFilename: () => 'some-other-file.json',
        getSourceCode: () => ({
          getText: () => '{}'
        }),
        report: vi.fn()
      };
      
      // Execute the rule
      const handlers = rule.create(context);
      const selector = "Program > JSONExpressionStatement > JSONObjectExpression";
      handlers[selector]({});
      
      // It should not attempt to validate non-package.json files
      expect(context.report).not.toHaveBeenCalled();
    });
  });
});