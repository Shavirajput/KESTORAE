import { describe, expect, it } from "vitest";

import {
  INITIAL_REGISTRATION_VALUES,
  evaluatePasswordRequirements,
  evaluatePasswordStrength,
  validateForgotPasswordEmail,
  validateRegistrationForm,
} from "./account-registration";

describe("Account registration pure logic", () => {
  it("evaluates minimum length, mixed case, numbers, and special characters accurately", () => {
    const empty = evaluatePasswordRequirements("");
    expect(empty.every((req) => !req.met)).toBe(true);

    const missingSpecial = evaluatePasswordRequirements("NordicOak2026");
    expect(missingSpecial.find((r) => r.id === "minLength")?.met).toBe(true);
    expect(missingSpecial.find((r) => r.id === "mixedCase")?.met).toBe(true);
    expect(missingSpecial.find((r) => r.id === "number")?.met).toBe(true);
    expect(missingSpecial.find((r) => r.id === "special")?.met).toBe(false);

    const complete = evaluatePasswordRequirements("NordicOak26!");
    expect(complete.every((req) => req.met)).toBe(true);
  });

  it("scores password strength progressively from empty through strong", () => {
    expect(evaluatePasswordStrength("")).toMatchObject({
      level: "empty",
      score: 0,
      percentage: 0,
    });
    expect(evaluatePasswordStrength("abc")).toMatchObject({
      level: "weak",
      score: 1,
      percentage: 25,
    });
    expect(evaluatePasswordStrength("nordicoak")).toMatchObject({
      level: "weak",
      score: 1,
      percentage: 25,
    });
    expect(evaluatePasswordStrength("NordicOak")).toMatchObject({
      level: "fair",
      score: 2,
      percentage: 50,
    });
    expect(evaluatePasswordStrength("NordicOak26")).toMatchObject({
      level: "good",
      score: 3,
      percentage: 75,
    });
    expect(evaluatePasswordStrength("NordicOak26!")).toMatchObject({
      level: "strong",
      score: 4,
      percentage: 100,
    });
  });

  it("flags all missing required fields and unchecked policy consent", () => {
    const errors = validateRegistrationForm(INITIAL_REGISTRATION_VALUES);
    expect(errors.firstName).toBeTruthy();
    expect(errors.lastName).toBeTruthy();
    expect(errors.email).toBeTruthy();
    expect(errors.password).toBeTruthy();
    expect(errors.confirmPassword).toBeTruthy();
    expect(errors.acceptedPolicies).toBeTruthy();
  });

  it("rejects passwords missing a special character or number", () => {
    const missingSpecial = validateRegistrationForm({
      firstName: "Astrid",
      lastName: "Lindholm",
      email: "astrid@example.com",
      password: "NordicOak2026",
      confirmPassword: "NordicOak2026",
      acceptedPolicies: true,
    });
    expect(missingSpecial.password).toBeTruthy();

    const missingNumber = validateRegistrationForm({
      firstName: "Astrid",
      lastName: "Lindholm",
      email: "astrid@example.com",
      password: "NordicOak!",
      confirmPassword: "NordicOak!",
      acceptedPolicies: true,
    });
    expect(missingNumber.password).toBeTruthy();
  });

  it("validates email format, password requirements, and confirm password match", () => {
    const errors = validateRegistrationForm({
      firstName: "Astrid",
      lastName: "Lindholm",
      email: "invalid-email",
      password: "short",
      confirmPassword: "different",
      acceptedPolicies: true,
    });

    expect(errors.firstName).toBeUndefined();
    expect(errors.lastName).toBeUndefined();
    expect(errors.email).toBe("Please enter a valid email address.");
    expect(errors.password).toBeTruthy();
    expect(errors.confirmPassword).toBe("Passwords do not match.");
    expect(errors.acceptedPolicies).toBeUndefined();
  });

  it("accepts a complete, valid registration payload with zero errors", () => {
    const errors = validateRegistrationForm({
      firstName: "Astrid",
      lastName: "Lindholm",
      email: "astrid@example.com",
      password: "NordicOak26!",
      confirmPassword: "NordicOak26!",
      acceptedPolicies: true,
    });

    expect(errors).toEqual({});
  });

  it("validates and normalizes forgot-password email inputs", () => {
    expect(validateForgotPasswordEmail("   ")).toEqual({
      valid: false,
      error: "Please enter your email address.",
    });
    expect(validateForgotPasswordEmail("astrid@")).toEqual({
      valid: false,
      error: "Please enter a valid email address.",
    });
    expect(validateForgotPasswordEmail("  Astrid@Example.COM ")).toEqual({
      valid: true,
      normalizedEmail: "astrid@example.com",
    });
  });
});
