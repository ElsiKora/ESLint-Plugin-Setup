// ESM format for ESLint configuration
import { fileURLToPath } from 'url';
import path from 'path';
import plugin from '../../dist/index.js';
import * as parserJsonc from 'jsonc-eslint-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  {
    files: ['*.json'],
    plugins: {
      'package-json-validator': plugin
    },
    languageOptions: {
      parser: parserJsonc
    },
    rules: {
      'package-json-validator/require-fields': 'error',
      'package-json-validator/require-module-type': 'error'
    }
  }
];
