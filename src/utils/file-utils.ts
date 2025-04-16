/**
 * Utilities for working with files in ESLint rules
 */

/**
 * Checks if a filename matches the specified pattern
 * @param filename - The filename to check
 * @param pattern - The pattern to match against (e.g., 'package.json')
 * @returns True if the filename matches the pattern
 */
export const isFilenameMatch = (filename: string, pattern: string): boolean => {
  // Simple implementation - can be enhanced to support more complex matching
  if (pattern.startsWith('/') && pattern.endsWith('/')) {
    // Regex pattern
    const regex = new RegExp(pattern.slice(1, -1));
    return regex.test(filename);
  }
  
  // Exact match or endsWith
  return filename === pattern || filename.endsWith(`/${pattern}`);
};

/**
 * Safely parses a JSON string, returning undefined if parsing fails
 * @param json - The JSON string to parse
 * @returns The parsed object or undefined if parsing failed
 */
export const safeParseJson = (json: string): unknown => {
  try {
    return JSON.parse(json);
  } catch (error) {
    return undefined;
  }
};