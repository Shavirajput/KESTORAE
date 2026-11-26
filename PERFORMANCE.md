# Kestorae Performance Architecture & Verification

This document describes the performance budgets, Core Web Vitals telemetry setup, automated checks, and production caching policy for the Kestorae storefront.

## 1. Automated Performance Budgets

Run the build-artifact budget check after building the production bundle:

```sh
npm run build
npm run perf:budget
```

`scripts/check-perf-budgets.mjs` inspects `dist/client/` and enforces:
- **Entry JS + direct static imports (gzip)**: ≤ 170 KB
- **External CSS bundle (gzip)**: ≤ 50 KB
- **Brand logo largest variant**: ≤ 50 KB (and zero references to the legacy 1.70 MB PNG)
- **Largest single emitted image asset**: ≤ 150 KB
- **Above-the-fold AVIF delivery (hero + logo)**: ≤ 300 KB
- **Self-hosted Latin variable WOFF2 fonts**: ≤ 100 KB total across Montserrat & Inter, with zero external `fonts.googleapis.com` requests

## 2. Lighthouse CI (Lab Verification)

`lighthouserc.json` configures repeatable lab audits across `/`, `/shop`, `/products/oak-side-table`, and `/account/register`.

```sh
npm run build
npm run perf:lighthouse
```

Enforced thresholds:
- **LCP** ≤ 2500 ms
- **CLS** ≤ 0.10
- **TBT** ≤ 200 ms (lab proxy for INP)
- **Performance** ≥ 90, **Accessibility** ≥ 95, **Best Practices** ≥ 95, **SEO** ≥ 95
- Modern image formats (AVIF/WebP), responsive sizing, and transfer budgets aligned with `perf:budget`.

> **Lab vs Field Measurements**: Lighthouse CI and local browser tests provide *lab* measurements under synthetic throttling. Real-user p75 **LCP / INP / CLS** requires *field* telemetry from production traffic.

## 3. Core Web Vitals Field Monitoring

`src/lib/web-vitals.ts` is dynamically imported after client hydration in `src/routes/__root.tsx` (keeping `web-vitals` out of the initial critical JS bundle) and measures `LCP`, `INP`, `CLS`, `FCP`, and `TTFB`.

- Target thresholds: **LCP ≤ 2.5 s**, **INP ≤ 200 ms**, **CLS ≤ 0.1**.
- Configure `VITE_WEB_VITALS_ENDPOINT` in your production environment (see `.env.example`) to send structured JSON metric payloads via `navigator.sendBeacon` (with `fetch(..., { keepalive: true })` fallback).
- When `VITE_WEB_VITALS_ENDPOINT` is unset, no outbound network requests are made; latest local readings remain inspectable on `window.__KESTORAE_CWV__` during development or automated browser checks without rendering any telemetry UI.

## 4. Production Cache Policy

### Application-Controlled HTML Caching (`src/server.ts`)
SSR HTML responses (`text/html`) automatically receive:

```http
Cache-Control: public, max-age=0, must-revalidate
```

Error responses (`500`) return `Cache-Control: no-store`. Compression (`gzip` / `br`) is left to the hosting edge layer so responses are never double-encoded.

### Static Assets & Hosting / CDN Configuration
Vite emits content-hashed bundles under `/assets/*` (JS, CSS, AVIF/WebP/JPEG/PNG images, and self-hosted Latin variable WOFF2 fonts).

During `npm run build`, Nitro (Cloudflare preset via `@lovable.dev/vite-tanstack-config`) automatically generates `.output/public/_headers` with immutable one-year caching for all content-hashed assets:

```text
/assets/*
  cache-control: public, max-age=31536000, immutable
```

| Path Pattern | `Cache-Control` Header | Enforcement |
| --- | --- | --- |
| `/assets/*` (JS, CSS, images, WOFF2 fonts) | `public, max-age=31536000, immutable` | Generated in `.output/public/_headers` (verified by `npm run perf:budget`) |
| `/*` (SSR HTML routes) | `public, max-age=0, must-revalidate` | Applied by `src/server.ts` |

> If deployed behind an external reverse proxy or non-Cloudflare CDN that does not consume `_headers`, mirror the `/assets/*` rule above at the CDN layer.
