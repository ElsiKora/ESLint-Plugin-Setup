/**
 * Interface for validation result with severity levels
 */
export interface ValidationResult {
  /**
   * The field or property that was validated
   */
  field: string;
  
  /**
   * Error or warning message for the validation
   */
  message: string;
  
  /**
   * Severity level of the validation issue
   */
  severity: 'error' | 'warning' | 'info';
}