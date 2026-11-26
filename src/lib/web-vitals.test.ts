import { describe, expect, it } from "vitest";

import { CWV_THRESHOLDS, createWebVitalPayload, rateWebVital } from "./web-vitals";

describe("Core Web Vitals thresholds and payload formatting", () => {
  it("rates LCP, INP, and CLS against target thresholds", () => {
    expect(CWV_THRESHOLDS.LCP.good).toBe(2500);
    expect(CWV_THRESHOLDS.INP.good).toBe(200);
    expect(CWV_THRESHOLDS.CLS.good).toBe(0.1);

    expect(rateWebVital("LCP", 1850)).toBe("good");
    expect(rateWebVital("LCP", 3100)).toBe("needs-improvement");
    expect(rateWebVital("LCP", 4500)).toBe("poor");

    expect(rateWebVital("INP", 140)).toBe("good");
    expect(rateWebVital("INP", 320)).toBe("needs-improvement");
    expect(rateWebVital("INP", 650)).toBe("poor");

    expect(rateWebVital("CLS", 0.04)).toBe("good");
    expect(rateWebVital("CLS", 0.18)).toBe("needs-improvement");
    expect(rateWebVital("CLS", 0.35)).toBe("poor");
  });

  it("formats structured metric payloads with appropriate precision", () => {
    const lcpPayload = createWebVitalPayload(
      {
        id: "v1-lcp",
        name: "LCP",
        value: 1924.6,
        delta: 1924.6,
        navigationType: "navigate",
      },
      "/",
      1700000000000,
    );

    expect(lcpPayload).toEqual({
      id: "v1-lcp",
      name: "LCP",
      value: 1925,
      delta: 1925,
      rating: "good",
      navigationType: "navigate",
      path: "/",
      timestamp: 1700000000000,
    });

    const clsPayload = createWebVitalPayload(
      {
        id: "v1-cls",
        name: "CLS",
        value: 0.012345,
        delta: 0.012345,
        navigationType: "navigate",
      },
      "/shop",
      1700000000000,
    );

    expect(clsPayload.value).toBe(0.0123);
    expect(clsPayload.rating).toBe("good");
  });
});
