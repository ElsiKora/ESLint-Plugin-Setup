import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Gets the absolute path to a fixture file
 * @param relativePath - The relative path to the fixture file
 * @returns The absolute path to the fixture file
 */
export function getFixturePath(relativePath: string): string {
  return path.resolve(__dirname, "../fixtures", relativePath);
}