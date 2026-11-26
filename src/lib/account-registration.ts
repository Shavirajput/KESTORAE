import { isValidEmail } from "@/lib/storefront-logic";

export type RegistrationFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptedPolicies: boolean;
};

export type RegistrationFormErrors = Partial<Record<keyof RegistrationFormValues, string>>;

export type PasswordRequirement = {
  id: "minLength" | "mixedCase" | "number" | "special";
  label: string;
  met: boolean;
};

export type PasswordStrengthLevel = "empty" | "weak" | "fair" | "good" | "strong";

export type PasswordStrength = {
  level: PasswordStrengthLevel;
  score: 0 | 1 | 2 | 3 | 4;
  percentage: 0 | 25 | 50 | 75 | 100;
  label: string;
  requirements: PasswordRequirement[];
};

export const INITIAL_REGISTRATION_VALUES: RegistrationFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  acceptedPolicies: false,
};

export function evaluatePasswordRequirements(password: string): PasswordRequirement[] {
  return [
    {
      id: "minLength",
      label: "At least 8 characters",
      met: password.length >= 8,
    },
    {
      id: "mixedCase",
      label: "Upper & lowercase letters",
      met: /[A-Z]/.test(password) && /[a-z]/.test(password),
    },
    {
      id: "number",
      label: "At least one number",
      met: /\d/.test(password),
    },
    {
      id: "special",
      label: "One special character",
      met: /[^A-Za-z0-9]/.test(password),
    },
  ];
}

export function evaluatePasswordStrength(password: string): PasswordStrength {
  const requirements = evaluatePasswordRequirements(password);

  if (!password) {
    return {
      level: "empty",
      score: 0,
      percentage: 0,
      label: "Not set",
      requirements,
    };
  }

  const metCount = requirements.filter((req) => req.met).length;

  if (metCount <= 1 || password.length < 6) {
    return {
      level: "weak",
      score: 1,
      percentage: 25,
      label: "Weak",
      requirements,
    };
  }

  if (metCount === 2) {
    return {
      level: "fair",
      score: 2,
      percentage: 50,
      label: "Fair",
      requirements,
    };
  }

  if (metCount === 3) {
    return {
      level: "good",
      score: 3,
      percentage: 75,
      label: "Good",
      requirements,
    };
  }

  return {
    level: "strong",
    score: 4,
    percentage: 100,
    label: "Strong",
    requirements,
  };
}

export function validateRegistrationForm(values: RegistrationFormValues): RegistrationFormErrors {
  const errors: RegistrationFormErrors = {};

  if (!values.firstName.trim()) {
    errors.firstName = "Please enter your first name.";
  }

  if (!values.lastName.trim()) {
    errors.lastName = "Please enter your last name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!isValidEmail(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  const requirements = evaluatePasswordRequirements(values.password);
  const allRequirementsMet = requirements.every((req) => req.met);

  if (!values.password) {
    errors.password = "Please create a password.";
  } else if (!allRequirementsMet) {
    errors.password =
      "Password must be at least 8 characters and include upper & lowercase letters, a number, and a special character.";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match.";
  }

  if (!values.acceptedPolicies) {
    errors.acceptedPolicies =
      "Please agree to the Terms & Conditions and Privacy Policy to continue.";
  }

  return errors;
}

export type ForgotPasswordValidationResult =
  | { valid: true; normalizedEmail: string; error?: undefined }
  | { valid: false; error: string; normalizedEmail?: undefined };

export function validateForgotPasswordEmail(email: string): ForgotPasswordValidationResult {
  const trimmed = email.trim();
  if (!trimmed) {
    return { valid: false, error: "Please enter your email address." };
  }
  if (!isValidEmail(trimmed)) {
    return { valid: false, error: "Please enter a valid email address." };
  }
  return { valid: true, normalizedEmail: trimmed.toLowerCase() };
}
