# eslint-plugin-package-json-validator

ESLint 9 plugin that validates package.json files for required fields, built with clean architecture principles.

## Overview

This ESLint plugin checks package.json files to ensure they contain all the required fields:
- name
- version
- description
- main
- scripts
- keywords
- author
- license

If any fields are missing, ESLint will report errors.

## Installation

```bash
npm install --save-dev eslint-plugin-package-json-validator
```

## Usage

### ESLint 9 (Flat Config)

```js
// eslint.config.js
import packageJsonValidator from 'eslint-plugin-package-json-validator';

export default [
  // Your other configurations...
  {
    files: ['package.json'],
    plugins: {
      'package-json-validator': packageJsonValidator
    },
    rules: {
      'package-json-validator/require-fields': 'error'
    }
  }
];
```

### Using Recommended Config

```js
// eslint.config.js
import packageJsonValidator from 'eslint-plugin-package-json-validator';

export default [
  // Your other configurations...
  {
    files: ['package.json'],
    ...packageJsonValidator.configs.recommended
  }
];
```

## Architecture

This plugin is built using clean architecture principles with 4 layers:

1. **Domain Layer** - Defines core entities and business rules
   - Interfaces for package.json and validation
   - Constants for required fields

2. **Application Layer** - Contains application logic
   - Services for validation logic

3. **Infrastructure Layer** - Handles framework integration
   - ESLint rule implementation

4. **Presentation Layer** - Plugin configuration and entry points
   - Plugin exports and configuration options

## Development

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/eslint-plugin-package-json-validator.git
cd eslint-plugin-package-json-validator

# Install dependencies
npm install

# Build the plugin
npm run build
```

### Testing

This project uses Vitest for testing:

```bash
# Run all tests
npm test

# Run only unit tests
npm run test:unit

# Run ESLint integration tests
npm run test:eslint

# Run tests in watch mode
npm run test:watch
```

The test suite includes:

#### Unit Tests
- Tests for the validator service
- Basic validation functionality

#### ESLint Integration Tests
- Tests for the ESLint rule definition
- Tests that simulate ESLint running on package.json files
- Mocks the ESLint rule context to verify proper rule execution
- Validates that correct error messages are reported for invalid files

## License

MIT