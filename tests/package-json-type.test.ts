import { describe, it, expect, vi } from 'vitest';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createPackageJsonTypeRule } from '../src/infrastructure/eslint/package-json-type-eslint-rule.js';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to read JSON files
const readJsonFile = (filePath: string) => {
  const content = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(content);
};

const fixturesDir = path.join(__dirname, 'fixtures');
const validFixturePath = path.join(fixturesDir, 'valid-package.json');
const invalidFixturePath = path.join(fixturesDir, 'invalid-package.json');

describe('Package.json Type Field ESLint Rule', () => {
  describe('rule creation', () => {
    it('should create rule with correct metadata', () => {
      const rule = createPackageJsonTypeRule();
      
      expect(rule.meta).toBeDefined();
      expect(rule.meta.type).toBe('problem');
      expect(rule.meta.docs.description).toBe("Enforce package.json type field to be set to 'module'");
      expect(rule.meta.fixable).toBe('code');
      expect(rule.create).toBeTypeOf('function');
    });
  });
  
  describe('rule validation', () => {
    it('should validate package.json with type: module without errors', () => {
      const rule = createPackageJsonTypeRule();
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
      const mockNode = { 
        properties: [{ key: { value: 'type' }, value: { value: 'module' } }]
      };
      handlers["Program > JSONExpressionStatement > JSONObjectExpression"](mockNode);
      
      // Check no errors were reported
      expect(context.report).not.toHaveBeenCalled();
    });
    
    it('should report errors for package.json with type: commonjs', () => {
      const rule = createPackageJsonTypeRule();
      const invalidJson = readJsonFile(invalidFixturePath);
      
      // Mock ESLint context
      const context = {
        getFilename: () => 'package.json',
        getSourceCode: () => ({
          getText: () => JSON.stringify(invalidJson)
        }),
        report: vi.fn()
      };
      
      // Mock the type property in the node for testing the property reporting
      const typeProperty = { key: { value: 'type' }, value: { value: 'commonjs' } };
      const mockNode = { 
        properties: [typeProperty]
      };
      
      // Execute the rule
      const handlers = rule.create(context);
      handlers["Program > JSONExpressionStatement > JSONObjectExpression"](mockNode);
      
      // Check errors were reported
      expect(context.report).toHaveBeenCalled();
      
      // Verify the error message is correct
      const reportCall = context.report.mock.calls[0][0];
      expect(reportCall.message).toContain("must be set to 'module'");
      expect(reportCall.data.actual).toBe('commonjs');
    });
    
    it('should report errors for package.json missing type field', () => {
      const rule = createPackageJsonTypeRule();
      
      // Create JSON without type field
      const jsonWithoutType = {
        name: "test-package",
        version: "1.0.0"
      };
      
      // Mock ESLint context
      const context = {
        getFilename: () => 'package.json',
        getSourceCode: () => ({
          getText: () => JSON.stringify(jsonWithoutType)
        }),
        report: vi.fn()
      };
      
      // Execute the rule
      const handlers = rule.create(context);
      handlers["Program > JSONExpressionStatement > JSONObjectExpression"]({});
      
      // Check errors were reported
      expect(context.report).toHaveBeenCalled();
      
      // Verify the error message is correct
      const reportCall = context.report.mock.calls[0][0];
      expect(reportCall.message).toContain("must have 'type' field");
      expect(reportCall.fix).toBeTypeOf('function');
    });
    
    it('should handle non-package.json files by ignoring them', () => {
      const rule = createPackageJsonTypeRule();
      
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
      handlers["Program > JSONExpressionStatement > JSONObjectExpression"]({});
      
      // It should not attempt to validate non-package.json files
      expect(context.report).not.toHaveBeenCalled();
    });
    
    it('should handle parse errors gracefully', () => {
      const rule = createPackageJsonTypeRule();
      
      // Mock context with invalid JSON
      const context = {
        getFilename: () => 'package.json',
        getSourceCode: () => ({
          getText: () => '{ invalid json' // Intentionally invalid JSON
        }),
        report: vi.fn()
      };
      
      // Execute the rule
      const handlers = rule.create(context);
      handlers["Program > JSONExpressionStatement > JSONObjectExpression"]({});
      
      // It should report an error about the JSON parsing
      expect(context.report).toHaveBeenCalled();
      
      const reportCall = context.report.mock.calls[0][0];
      expect(reportCall.message).toContain('Error processing package.json');
    });
  });
});