# require-fields

Ensures that package.json files contain all required fields.

## Rule Details

This rule enforces that package.json files include all essential fields to make them valid and informative.

### Required Fields

- `name`: The name of the package
- `version`: The version of the package
- `description`: A description of the package
- `main`: The entry point of the package
- `scripts`: Scripts to run for different tasks
- `keywords`: Terms to help others find the package
- `author`: The creator of the package
- `license`: The license under which the package is distributed

### Examples

#### ❌ Incorrect

```json
{
  "name": "my-package",
  "version": "1.0.0"
  // Missing required fields
}
```

#### ✅ Correct

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "description": "A useful package",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["example", "package"],
  "author": "John Doe",
  "license": "MIT"
}
```

## When Not To Use It

If you're working with partial package.json files or templates, you might want to disable this rule.

## Further Reading

- [package.json documentation](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)
- [npm package.json guidelines](https://docs.npmjs.com/cli/v9/using-npm/developers)