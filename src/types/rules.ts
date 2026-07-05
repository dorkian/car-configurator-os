export interface CompatibilityRule {
  packageId: string;
  incompatibleWith: string[];
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}
