Make this complex task using plantool:

1) We need to create plugin for ESLint 9!! (Flat config based)
2) We need to use clean architecture for this plugin (domain, application, infrastructure, presentation)
3) Plugin must validate package.json file only and check if it has name, version, description, main, scripts, keywords, author, license fields
4) Codestyle: # Project Code Style Guide

This document outlines the coding standards and conventions used in this project. Following these guidelines ensures consistency across the codebase.

## File Naming Conventions

### File Extensions
- TypeScript files use `.ts` extension
- JavaScript configuration files use `.js` extension
- Special file type extensions:
    - `.interface.ts` for interfaces
    - `.enum.ts` for enumerations
    - `.type.ts` for type definitions
    - `.constant.ts` for constants
    - `.service.ts` for services
    - `.command.ts` for command classes
    - `.mapper.ts` for mapping functionality
    - `.config.js` for configuration files
    - `.spec.ts` and `.test.ts` for unit tests
    - `.e2e-spec.ts` for end-to-end tests

### File Naming
- Use kebab-case for filenames (e.g., `license-file-names.constant.ts`)
- Filename should indicate purpose and type (e.g., `package-json-author.interface.ts`)

## Naming Conventions

### Interfaces
- Prefix with `I` (e.g., `IPackageJsonAuthor`, `ICommand`)
- Use PascalCase

### Enums
- Prefix with `E` (e.g., `EModule`, `EPackageJsonDependencyType`)
- Use PascalCase

### Types
- Prefix with `T` (e.g., `TConfigModule`, `TInitCommandProperties`)
- Use PascalCase

### Classes
- Use PascalCase without prefix (e.g., `FrameworkService`, `AnalyzeCommand`)
- Implementation often matches interface (e.g., `AnalyzeCommand implements ICommand`)

### Constants
- Use ALL_CAPS with underscores (e.g., `LICENSE_FILE_NAMES`)

## Project Structure

### Directory Organization
- Domain-driven design pattern:
    - `/src/domain/` for core business logic and entities
    - `/src/application/` for application services
    - `/src/infrastructure/` for implementation details
    - `/src/presentation/` for presentation layer

### Import Paths
- Use relative imports with explicit paths (e.g., `"../../domain/enum/module.enum"`)
- No path aliases

## Code Formatting

### ESLint Configuration
- Uses `@elsikora/eslint-config` with many feature plugins:
    - JavaScript, TypeScript, JSON, Markdown, Node.js support
    - Security checks with `noSecrets`
    - Code quality tools: Sonar, Unicorn
    - Code formatting: Perfectionist, Stylistic, Prettier
    - Plus specialized tools for YAML, RegExp, package.json

### Prettier Configuration
- Uses tabs for indentation (2 spaces equivalent)
- Double quotes for strings
- Semicolons required
- Trailing commas required for all multi-line
- Arrow function parentheses always required
- Wide printWidth (480 chars)
- No prose wrapping

## Import Organization

### Import Ordering
- Organized by type:
    - Types and interfaces first (using `import type`)
    - Regular imports after
    - Often grouped by categories with newlines between
- Order from external to local:
    - More specific/local imports after broader/external ones

## Component Structure

### Class Organization
- Properties at the top, usually readonly
- Constructor after properties
- Public methods first, private methods last
- Consistent parameter naming

### Documentation
- JSDoc comments for classes, methods, and parameters
- Clear descriptions of functionality
- Type annotations for parameters and return values

### Error Handling
- Promise-based async/await pattern
- Clean error handling with Promise.all for parallel operations

## Additional Patterns

### Constants
- Extensive use of constants for config values, file paths, etc.
- Stored in dedicated constant files

### Dependency Injection
- Constructor-based DI pattern
- Services injected via constructor parameters

### Clean Code Principles
- Descriptive variable and function names
- Single responsibility principle followed
- Small, focused methods
- Strong typing throughout

### Testing
- Test files excluded from linting in CI
- Separate extensions for unit tests and E2E tests

### Code Quality Tooling
- Pre-commit hooks with lint-staged for code quality
- ESLint fix on save
- Prettier formatting for all files
- Strong emphasis on automated code quality
