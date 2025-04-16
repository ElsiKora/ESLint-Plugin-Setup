import { ESLint } from "eslint";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get fixture path
function getFixturePath(relativePath) {
  return path.resolve(__dirname, "../fixtures", relativePath);
}

async function main() {
  try {
    // Import plugin directly
    const pluginModule = await import("../../dist/index.js");
    const plugin = pluginModule.default;
    
    console.log("Plugin structure:", JSON.stringify(plugin, null, 2));
    
    // Flatten the structure if needed
    const flatPlugin = plugin.default || plugin;
    
    // Create ESLint instance with flat config for ESLint 9
    const config = [
      {
        // This tells ESLint to process JSON files
        files: ["**/*.json"],
        
        // Configure JSON parser from @eslint/json
        languageOptions: {
          parser: (await import("@eslint/json")).parser
        },
        
        // Register our plugin
        plugins: {
          "package-json-validator": flatPlugin
        },
        
        // Enable our rule
        rules: {
          "package-json-validator/require-fields": "error"
        }
      }
    ];
    
    const eslint = new ESLint({
      baseConfig: config,
      overrideConfigFile: true
    });
    
    // Test fixtures
    const validFilePath = getFixturePath("valid-package.json");
    const invalidFilePath = getFixturePath("invalid-package.json");
    
    console.log("Valid file path:", validFilePath);
    console.log("File exists:", fs.existsSync(validFilePath));
    console.log("File content:", fs.readFileSync(validFilePath, "utf8"));
    
    // Lint both files
    console.log("\n--- Linting valid file ---");
    const validResults = await eslint.lintFiles([validFilePath]);
    console.log(JSON.stringify(validResults, null, 2));
    
    console.log("\n--- Linting invalid file ---");
    const invalidResults = await eslint.lintFiles([invalidFilePath]);
    console.log(JSON.stringify(invalidResults, null, 2));
    
  } catch (error) {
    console.error("Error:", error);
  }
}

main();