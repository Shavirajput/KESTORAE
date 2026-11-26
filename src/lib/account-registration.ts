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
  id: "minLength" | "uppercase" | "lowercase" | "number";
  label: string;
  met: boolean;
};

export type PasswordStrengthLevel = "empty" | "weak" | "fair" | "good" | "strong";

export type PasswordStrength = {
  level: PasswordStrengthLevel;
  score: 0 | 1 | 2 | 3 | 4;
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
      id: "uppercase",
      label: "One uppercase letter",
      met: /[A-Z]/.test(password),
    },
    {
      id: "lowercase",
      label: "One lowercase letter",
      met: /[a-z]/.test(password),
    },
    {
      id: "number",
      label: "One number",
      met: /\d/.test(password),
    },
  ];
}

export function evaluatePasswordStrength(password: string): PasswordStrength {
  const requirements = evaluatePasswordRequirements(password);

  if (!password) {
    return {
      level: "empty",
      score: 0,
      label: "",
      requirements,
    };
  }

  const metCount = requirements.filter((req) => req.met).length;
  const hasBonusLength = password.length >= 12;
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  if (metCount <= 1 || password.length < 6) {
    return {
      level: "weak",
      score: 1,
      label: "Weak",
      requirements,
    };
  }

  if (metCount === 2) {
    return {
      level: "fair",
      score: 2,
      label: "Fair",
      requirements,
    };
  }

  if (metCount === 3 || (metCount === 4 && !hasBonusLength && !hasSymbol && password.length < 10)) {
    return {
      level: "good",
      score: 3,
      label: "Good",
      requirements,
    };
  }

  return {
    level: "strong",
    score: 4,
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
      "Password must be at least 8 characters and include uppercase, lowercase, and a number.";
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
