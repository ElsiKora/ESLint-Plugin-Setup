# Optimized ESLint Plugin Folder Structure

---
id: doc-ajji0w-m8gjsbx1
created: 2025-03-19T23:22:42.133Z
updated: 2025-03-19T23:22:54.651Z
tags: []
---

## Content

## Proposed Folder Structure

```
src/
├── domain/                  # Core business logic
│   ├── constants/           # Validation constants and rule settings
│   │   ├── package-json-fields.constant.ts
│   │   └── rule-categories.constant.ts
│   ├── interfaces/          # Type definitions and contracts
│   │   ├── package-json.interface.ts
│   │   └── validator.interface.ts
│   └── validators/          # Pure validation logic
│       └── package-json.validator.ts
├── rules/                   # All ESLint rules
│   ├── package-json/        # Rules related to package.json
│   │   ├── required-fields.rule.ts
│   │   └── type-field.rule.ts
│   ├── dependencies/        # Rules related to dependencies
│   │   └── no-dev-dependencies.rule.ts
│   ├── security/            # Security-related rules
│   │   └── no-vulnerable-deps.rule.ts
│   ├── best-practices/      # Best practices rules
│   └── index.ts             # Exports all rules
├── utils/                   # Shared utilities
│   ├── ast-utils.ts         # AST manipulation helpers
│   └── file-utils.ts        # File reading/parsing utilities
├── configs/                 # Predefined configurations
│   ├── recommended.ts       # Recommended rule set
│   ├── strict.ts            # Strict rule set
│   └── index.ts             # Exports all configurations
├── docs/                    # Rule documentation
│   └── rules/
│       ├── package-json/
│       │   ├── required-fields.md
│       │   └── type-field.md
│       └── index.md         # Overview of all rules
└── index.ts                 # Plugin entry point
```

## Key Improvements

1. **Rule Organization**
   - Rules are organized by category/domain
   - Each rule in its own file with consistent naming
   - Clear separation from core logic

2. **Documentation**
   - Dedicated docs folder mirroring rule structure
   - Centralized documentation that's easy to maintain

3. **Scalability**
   - Adding new rules is simple - just add to appropriate category
   - Categories can be expanded as needed
   - Index files make registration automatic

4. **Configuration**
   - Predefined configurations for different use cases
   - Easy to extend or customize

5. **Clean Architecture**
   - Domain layer still contains core business logic
   - Infrastructure concerns (ESLint rules) are separate
   - Clear dependencies from rules to domain

## Migration Path

1. Create the new folder structure
2. Move domain logic to appropriate folders
3. Refactor rules to work with the new structure
4. Update the plugin entry point
5. Update tests to match new structure

## Related Plan Items

- Item ID: standard-cblnbt-m8gjro6w
