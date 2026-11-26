import { describe, expect, it } from "vitest";

import {
  INITIAL_REGISTRATION_VALUES,
  evaluatePasswordRequirements,
  evaluatePasswordStrength,
  validateRegistrationForm,
} from "./account-registration";

describe("Account registration pure logic", () => {
  it("evaluates individual password requirements accurately", () => {
    const empty = evaluatePasswordRequirements("");
    expect(empty.every((req) => !req.met)).toBe(true);

    const partial = evaluatePasswordRequirements("nordic12");
    expect(partial.find((r) => r.id === "minLength")?.met).toBe(true);
    expect(partial.find((r) => r.id === "lowercase")?.met).toBe(true);
    expect(partial.find((r) => r.id === "number")?.met).toBe(true);
    expect(partial.find((r) => r.id === "uppercase")?.met).toBe(false);

    const complete = evaluatePasswordRequirements("NordicOak2026");
    expect(complete.every((req) => req.met)).toBe(true);
  });

  it("scores password strength across empty, weak, fair, good, and strong tiers", () => {
    expect(evaluatePasswordStrength("").level).toBe("empty");
    expect(evaluatePasswordStrength("abc").level).toBe("weak");
    expect(evaluatePasswordStrength("nordic12").level).toBe("good");
    expect(evaluatePasswordStrength("nordicoak").level).toBe("fair");
    expect(evaluatePasswordStrength("Nordic12").level).toBe("good");
    expect(evaluatePasswordStrength("NordicOak2026").level).toBe("strong");
    expect(evaluatePasswordStrength("Nordic1!").level).toBe("strong");
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
      password: "NordicOak2026",
      confirmPassword: "NordicOak2026",
      acceptedPolicies: true,
    });

    expect(errors).toEqual({});
  });
});
