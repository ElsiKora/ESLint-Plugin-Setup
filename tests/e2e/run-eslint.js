#!/usr/bin/env node

import { ESLint } from 'eslint';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Files to lint
const validFile = path.join(__dirname, 'valid-package.json');
const invalidFile = path.join(__dirname, 'invalid-package.json');

async function main() {
  try {
    // Create ESLint instance
    const eslint = new ESLint({
      overrideConfigFile: path.join(__dirname, 'eslint.config.js'),
      cwd: __dirname
    });

    // Lint valid file
    console.log('Linting valid package.json...');
    const validResults = await eslint.lintFiles([validFile]);
    console.log(validResults[0]);
    
    console.log('\n=======================\n');
    
    // Lint invalid file
    console.log('Linting invalid package.json...');
    const invalidResults = await eslint.lintFiles([invalidFile]);
    console.log(invalidResults[0]);
    
    // Format the results
    const formatter = await eslint.loadFormatter('stylish');
    const validFormattedResults = formatter.format(validResults);
    const invalidFormattedResults = formatter.format(invalidResults);
    
    console.log('\n==== VALID FILE ====\n');
    console.log(validFormattedResults || 'No errors');
    
    console.log('\n==== INVALID FILE ====\n');
    console.log(invalidFormattedResults || 'No errors');
    
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();