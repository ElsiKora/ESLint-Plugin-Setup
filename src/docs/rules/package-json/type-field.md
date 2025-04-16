# require-module-type

Ensures that package.json includes a `type` field set to `module`.

## Rule Details

This rule enforces that package.json files include the `type` field with a value of `module` to enable ECMAScript modules (ESM) by default.

### Why?

Setting `"type": "module"` in package.json enables:

1. Native ESM support in Node.js
2. Use of `import`/`export` syntax without requiring `.mjs` extensions
3. Improved compatibility with modern JavaScript tooling
4. Better tree-shaking and optimization in bundlers

### Examples

#### ❌ Incorrect

```json
{
  "name": "my-package",
  "version": "1.0.0"
  // Missing type field
}
```

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "type": "commonjs"
  // Wrong value for type field
}
```

#### ✅ Correct

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "type": "module"
  // Other fields...
}
```

## When Not To Use It

If your project explicitly needs to use CommonJS modules, you should disable this rule.

## Further Reading

- [Node.js ECMAScript Modules](https://nodejs.org/api/esm.html)
- [package.json type field](https://nodejs.org/api/packages.html#type)
- [ESM/CommonJS interoperability](https://nodejs.org/api/esm.html#interoperability-with-commonjs)