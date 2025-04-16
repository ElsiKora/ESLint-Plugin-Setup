#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PackageJsonValidatorService } from '../../dist/application/services/package-json-validator.service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Files to validate
const validFile = path.join(__dirname, 'valid-package.json');
const invalidFile = path.join(__dirname, 'invalid-package.json');

// Read file content
const readJson = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(content);
};

// Create the validator service
const validator = new PackageJsonValidatorService();

// Test valid package.json
console.log('=== Testing valid package.json ===');
const validPackage = readJson(validFile);
const validResult = validator.validate(validPackage);
console.log('Is valid:', validResult.isValid);
console.log('Missing fields:', validResult.missingFields);
console.log();

// Test invalid package.json
console.log('=== Testing invalid package.json ===');
const invalidPackage = readJson(invalidFile);
const invalidResult = validator.validate(invalidPackage);
console.log('Is valid:', invalidResult.isValid);
console.log('Missing fields:', invalidResult.missingFields);

// Output test results
console.log();
console.log('=== Test Results ===');
const validTestPassed = validResult.isValid && validResult.missingFields.length === 0;
const invalidTestPassed = !invalidResult.isValid && invalidResult.missingFields.length > 0;
console.log('Valid package test passed:', validTestPassed ? 'YES ✅' : 'NO ❌');
console.log('Invalid package test passed:', invalidTestPassed ? 'YES ✅' : 'NO ❌');

// Exit with appropriate code
process.exit(validTestPassed && invalidTestPassed ? 0 : 1);