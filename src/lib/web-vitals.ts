import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from "web-vitals";

export type CoreWebVitalName = "LCP" | "INP" | "CLS" | "FCP" | "TTFB";
export type WebVitalRating = "good" | "needs-improvement" | "poor";

export const CWV_THRESHOLDS: Record<CoreWebVitalName, { good: number; poor: number }> = {
  LCP: { good: 2500, poor: 4000 },
  INP: { good: 200, poor: 500 },
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 },
};

export type WebVitalReportPayload = {
  id: string;
  name: CoreWebVitalName;
  value: number;
  delta: number;
  rating: WebVitalRating;
  navigationType: string;
  path: string;
  timestamp: number;
};

declare global {
  interface Window {
    __KESTORAE_CWV__?: Partial<Record<CoreWebVitalName, WebVitalReportPayload>>;
  }
}

export function rateWebVital(name: CoreWebVitalName, value: number): WebVitalRating {
  const threshold = CWV_THRESHOLDS[name];
  if (value <= threshold.good) return "good";
  if (value <= threshold.poor) return "needs-improvement";
  return "poor";
}

export function createWebVitalPayload(
  metric: Pick<Metric, "id" | "name" | "value" | "delta" | "navigationType">,
  path: string,
  timestamp = Date.now(),
): WebVitalReportPayload {
  const name = metric.name as CoreWebVitalName;
  const roundedValue = name === "CLS" ? Number(metric.value.toFixed(4)) : Math.round(metric.value);
  const roundedDelta = name === "CLS" ? Number(metric.delta.toFixed(4)) : Math.round(metric.delta);

  return {
    id: metric.id,
    name,
    value: roundedValue,
    delta: roundedDelta,
    rating: rateWebVital(name, metric.value),
    navigationType: metric.navigationType,
    path,
    timestamp,
  };
}

let initialized = false;

export function getWebVitalsEndpoint(): string | undefined {
  const raw = import.meta.env["VITE_WEB_VITALS_ENDPOINT"];
  if (typeof raw !== "string") return undefined;
  const trimmed = raw.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function sendMetric(payload: WebVitalReportPayload, endpoint: string): void {
  const body = JSON.stringify(payload);
  if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
    const blob = new Blob([body], { type: "application/json" });
    const queued = navigator.sendBeacon(endpoint, blob);
    if (queued) return;
  }

  if (typeof fetch === "function") {
    void fetch(endpoint, {
      method: "POST",
      body,
      headers: { "content-type": "application/json" },
      keepalive: true,
    }).catch(() => {
      // Never block or break storefront interactions if analytics transport is unavailable.
    });
  }
}

export function initWebVitalsMonitoring(): void {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  const endpoint = getWebVitalsEndpoint();

  const handleMetric = (metric: Metric) => {
    const payload = createWebVitalPayload(metric, window.location.pathname);

    if (!window.__KESTORAE_CWV__) {
      window.__KESTORAE_CWV__ = {};
    }
    window.__KESTORAE_CWV__[payload.name] = payload;

    if (endpoint) {
      sendMetric(payload, endpoint);
    }
  };

  onLCP(handleMetric);
  onINP(handleMetric);
  onCLS(handleMetric);
  onFCP(handleMetric);
  onTTFB(handleMetric);
}
