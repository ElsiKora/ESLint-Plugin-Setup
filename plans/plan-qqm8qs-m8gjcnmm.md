# Add ESLint rule to restrict package.json type field to "module" only

## Plan Overview

**Description:** Add a new rule to the ESLint plugin that will validate the package.json "type" field, enforcing that it must be set and must be "module" (not "commonjs").

**Created:** 2025-03-19T23:10:30.814Z
**Updated:** 2025-03-19T23:14:20.511Z

**Additional Metadata:**

## Progress Summary

- **Overall Progress:** 100%
- **Completed Items:** 5/5
- **In Progress:** 0
- **Pending:** 0
- **Total File Operations:** 5
- **Total Document Operations:** 0

## Task Plan

- ✅ **[file-ultdij-m8gjeajf]** 📄 Modify: Update package-json.interface.ts to include type field in IPackageJson interface
  📁 Files:
  - ``/Users/keenestcallas/WebstormProjects/ESLint-Plugin-Setup/src/domain/interfaces/package-json.interface.ts``
- ✅ **[file-mcx5rr-m8gjedn3]** 📄 Create a new ESLint rule implementation for validating package.json type field
  📁 Files:
  - ``/Users/keenestcallas/WebstormProjects/ESLint-Plugin-Setup/src/infrastructure/eslint/package-json-type-eslint-rule.ts``
- ✅ **[file-ffbh5p-m8gjeg0a]** 📄 Modify: Update plugin.ts to register the new type validation rule
  📁 Files:
  - ``/Users/keenestcallas/WebstormProjects/ESLint-Plugin-Setup/src/presentation/plugin.ts``
- ✅ **[file-66tuaf-m8gjej07]** 📄 Create test for package-json-type rule
  📁 Files:
  - ``/Users/keenestcallas/WebstormProjects/ESLint-Plugin-Setup/tests/package-json-type.test.ts``
- ✅ **[file-6hzjpo-m8gjem63]** 📄 Modify: Update test fixtures with valid and invalid type fields
  📁 Files:
  - ``/Users/keenestcallas/WebstormProjects/ESLint-Plugin-Setup/tests/fixtures/valid-package.json``
  - ``/Users/keenestcallas/WebstormProjects/ESLint-Plugin-Setup/tests/fixtures/invalid-package.json``

## Recent Updates

- **2025-03-19T23:14:20.511Z**: Changed item file-66tuaf-m8gjej07 status from in progress to completed with notes: Created comprehensive tests for the package-json-type rule, covering:
1. Rule metadata validation
2. Successful validation for valid "type": "module"
3. Error reporting for invalid "type": "commonjs"
4. Error reporting for missing type field
5. Ignoring non-package.json files
6. Handling JSON parse errors gracefully
- **2025-03-19T23:13:48.446Z**: Changed item file-66tuaf-m8gjej07 status from pending to in progress
- **2025-03-19T23:13:45.103Z**: Changed item file-6hzjpo-m8gjem63 status from in progress to completed with notes: Updated test fixtures by adding the type field:
1. Added "type": "module" to valid-package.json
2. Added "type": "commonjs" to invalid-package.json to demonstrate an invalid value that should trigger the ESLint rule
- **2025-03-19T23:13:31.076Z**: Changed item file-6hzjpo-m8gjem63 status from pending to in progress
- **2025-03-19T23:13:28.405Z**: Changed item file-ffbh5p-m8gjeg0a status from in progress to completed with notes: Updated the plugin.ts file to import and register the new 'require-module-type' rule. Added it to both the rules object and the recommended configuration.
