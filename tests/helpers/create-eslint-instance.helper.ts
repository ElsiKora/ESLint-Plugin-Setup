import { ESLint } from "eslint";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Creates an ESLint instance with the package-json-validator plugin
 * @returns ESLint instance configured with the plugin
 */
export async function createEslintInstance(): Promise<ESLint> {
  // Import the plugin
  const plugin = await import("../../dist/index.js");
  
  // Create config that includes our plugin for ESLint 9
  const config = [
    {
      files: ["**/*.json"],
      languageOptions: {
        parserOptions: {
          ecmaVersion: 2022
        }
      },
      plugins: {
        "package-json-validator": plugin.default
      },
      rules: {
        "package-json-validator/require-fields": "error"
      }
    }
  ];

  // ESLint 9 configuration
  return new ESLint({
    baseConfig: config,
    overrideConfigFile: true
  });
}