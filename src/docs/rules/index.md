# ESLint Package JSON Validator Rules

This plugin provides rules for validating package.json files in JavaScript/TypeScript projects.

## Rules

### Package.json Rules

| Rule ID | Description | Fixable |
|---------|-------------|---------|
| [`package-json-validator/require-fields`](./package-json/required-fields.md) | Ensures package.json contains all required fields | No |
| [`package-json-validator/require-module-type`](./package-json/type-field.md) | Ensures package.json has the type field set to "module" | Yes |

## Usage

### Installation

```bash
npm install --save-dev eslint-plugin-package-json-validator
```

### Configuration

Add to your ESLint config file:

```js
// eslint.config.js (ESLint 9+)
import packageJsonValidator from 'eslint-plugin-package-json-validator';

export default [
  // Use recommended rules
  packageJsonValidator.configs.recommended,
  
  // Or configure rules individually
  {
    plugins: {
      'package-json-validator': packageJsonValidator
    },
    rules: {
      'package-json-validator/require-fields': 'error',
      'package-json-validator/require-module-type': 'warning',
    }
  }
];
```

## Recommended Configuration

This plugin exports a `recommended` configuration with our suggested settings:

```js
import packageJsonValidator from 'eslint-plugin-package-json-validator';

export default [
  packageJsonValidator.configs.recommended
];
```