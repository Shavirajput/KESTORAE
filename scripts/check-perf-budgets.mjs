import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const ROOT = process.cwd();
const CANDIDATE_DIRS = [path.join(ROOT, ".output", "public"), path.join(ROOT, "dist", "client")];
const PUBLIC_DIR = CANDIDATE_DIRS.find((dir) => fs.existsSync(path.join(dir, "assets")));

const BUDGETS = {
  entryJsGzipBytes: 170 * 1024,
  cssGzipBytes: 50 * 1024,
  logoAssetBytes: 50 * 1024,
  maxSingleImageBytes: 150 * 1024,
  aboveFoldImageBytes: 300 * 1024,
  fontsTotalBytes: 100 * 1024,
};

function formatKB(bytes) {
  return `${(bytes / 1024).toFixed(2)} KB`;
}

function gzipSize(buffer) {
  return zlib.gzipSync(buffer, { level: 9 }).length;
}

if (!PUBLIC_DIR) {
  console.error(
    "Production build output not found (.output/public/assets or dist/client/assets). Run `npm run build` first.",
  );
  process.exit(1);
}

const ASSETS_DIR = path.join(PUBLIC_DIR, "assets");
const topLevelAssets = fs
  .readdirSync(ASSETS_DIR, { withFileTypes: true })
  .filter((entry) => entry.isFile())
  .map((entry) => path.join(ASSETS_DIR, entry.name));

const failures = [];
const checks = [];

function record(label, actual, limit, passed, detail = "") {
  checks.push({ label, actual, limit, passed, detail });
  if (!passed) {
    failures.push(`${label}: ${actual} (budget: ${limit})${detail ? ` — ${detail}` : ""}`);
  }
}

// 1. Entry JS + static direct imports gzip budget
const jsFiles = topLevelAssets.filter((f) => f.endsWith(".js"));
const mainEntry =
  jsFiles.find((f) => path.basename(f).startsWith("index-")) ??
  jsFiles.find((f) => path.basename(f).startsWith("main-"));
let entryChainFiles = [];
if (mainEntry) {
  const visited = new Set();
  const queue = [mainEntry];
  while (queue.length > 0) {
    const current = queue.shift();
    if (!current || visited.has(current)) continue;
    visited.add(current);
    const code = fs.readFileSync(current, "utf8");
    const importRegex = /(?:from|import)\s*["'](\.\/[^"']+\.js)["']/g;
    let match;
    while ((match = importRegex.exec(code)) !== null) {
      const target = path.resolve(path.dirname(current), match[1]);
      if (fs.existsSync(target) && !visited.has(target)) {
        queue.push(target);
      }
    }
  }
  entryChainFiles = Array.from(visited);
}
const entryJsRaw = entryChainFiles.reduce((sum, f) => sum + fs.statSync(f).size, 0);
const entryJsGzip = entryChainFiles.reduce((sum, f) => sum + gzipSize(fs.readFileSync(f)), 0);
record(
  "Entry JS + direct imports (gzip)",
  formatKB(entryJsGzip),
  formatKB(BUDGETS.entryJsGzipBytes),
  entryJsGzip > 0 && entryJsGzip <= BUDGETS.entryJsGzipBytes,
  `raw ${formatKB(entryJsRaw)} across ${entryChainFiles.length} chunks`,
);

// 2. CSS gzip budget
const cssFiles = topLevelAssets.filter((f) => f.endsWith(".css"));
const cssRaw = cssFiles.reduce((sum, f) => sum + fs.statSync(f).size, 0);
const cssGzip = cssFiles.reduce((sum, f) => sum + gzipSize(fs.readFileSync(f)), 0);
record(
  "External CSS bundle (gzip)",
  formatKB(cssGzip),
  formatKB(BUDGETS.cssGzipBytes),
  cssGzip > 0 && cssGzip <= BUDGETS.cssGzipBytes,
  `raw ${formatKB(cssRaw)} across ${cssFiles.length} file(s)`,
);

// 3. Logo asset budget + ensure legacy 1.70 MB PNG is never referenced in JS bundles
const logoAssets = topLevelAssets.filter((f) => path.basename(f).startsWith("kestorae-logo-"));
const largestLogoBytes = logoAssets.reduce((max, f) => Math.max(max, fs.statSync(f).size), 0);
const logo2xAvif = logoAssets.find(
  (f) => path.basename(f).includes("kestorae-logo-2x") && f.endsWith(".avif"),
);
const legacyLogoRefs = jsFiles.filter((f) =>
  fs.readFileSync(f, "utf8").includes("KESTORAE_f8485794.png"),
);
record(
  "Brand logo largest emitted variant",
  formatKB(largestLogoBytes),
  formatKB(BUDGETS.logoAssetBytes),
  logoAssets.length >= 5 &&
    largestLogoBytes > 0 &&
    largestLogoBytes <= BUDGETS.logoAssetBytes &&
    legacyLogoRefs.length === 0,
  legacyLogoRefs.length > 0
    ? `legacy 1.70 MB PNG still referenced in ${legacyLogoRefs.length} bundle(s)`
    : `2x AVIF: ${logo2xAvif ? formatKB(fs.statSync(logo2xAvif).size) : "missing"}, ${logoAssets.length} variants`,
);

// 4. Emitted Vite image budgets (top-level /assets/* only; excludes unused static public/ subdirs)
const imageExts = new Set([".avif", ".webp", ".jpg", ".jpeg", ".png"]);
const emittedImages = topLevelAssets.filter((f) => imageExts.has(path.extname(f).toLowerCase()));
let largestImageFile = "";
let largestImageBytes = 0;
for (const file of emittedImages) {
  const size = fs.statSync(file).size;
  if (size > largestImageBytes) {
    largestImageBytes = size;
    largestImageFile = path.basename(file);
  }
}
record(
  "Largest emitted image asset",
  formatKB(largestImageBytes),
  formatKB(BUDGETS.maxSingleImageBytes),
  emittedImages.length > 0 && largestImageBytes <= BUDGETS.maxSingleImageBytes,
  largestImageFile,
);

const hero1440Avif = emittedImages.find(
  (f) =>
    path.basename(f).includes("hero_scandinavian_living") &&
    path.basename(f).includes("-1440-") &&
    f.endsWith(".avif"),
);
const hero480Avif = emittedImages.find(
  (f) =>
    path.basename(f).includes("hero_scandinavian_living") &&
    path.basename(f).includes("-480-") &&
    f.endsWith(".avif"),
);
const aboveFoldDesktopBytes =
  (hero1440Avif ? fs.statSync(hero1440Avif).size : 0) +
  (logo2xAvif ? fs.statSync(logo2xAvif).size : 0);
const aboveFoldMobileBytes =
  (hero480Avif ? fs.statSync(hero480Avif).size : 0) +
  (logo2xAvif ? fs.statSync(logo2xAvif).size : 0);
record(
  "Above-the-fold AVIF (desktop 1440w hero + 2x logo)",
  formatKB(aboveFoldDesktopBytes),
  formatKB(BUDGETS.aboveFoldImageBytes),
  Boolean(hero1440Avif && hero480Avif && logo2xAvif) &&
    aboveFoldDesktopBytes <= BUDGETS.aboveFoldImageBytes,
  `mobile 480w hero + 2x logo: ${formatKB(aboveFoldMobileBytes)}`,
);

// 5. Self-hosted WOFF2 variable fonts & zero external Google Fonts references
const woff2Fonts = topLevelAssets.filter((f) => f.endsWith(".woff2"));
const fontsTotalBytes = woff2Fonts.reduce((sum, f) => sum + fs.statSync(f).size, 0);
const googleFontRefs = [...jsFiles, ...cssFiles].filter((f) =>
  fs.readFileSync(f, "utf8").includes("fonts.googleapis.com"),
);
record(
  "Self-hosted WOFF2 variable fonts",
  formatKB(fontsTotalBytes),
  formatKB(BUDGETS.fontsTotalBytes),
  woff2Fonts.length === 2 &&
    fontsTotalBytes <= BUDGETS.fontsTotalBytes &&
    googleFontRefs.length === 0,
  googleFontRefs.length > 0
    ? "external fonts.googleapis.com reference found in build"
    : woff2Fonts.map((f) => `${path.basename(f)} (${formatKB(fs.statSync(f).size)})`).join(", "),
);

// 6. Immutable cache header verification in generated _headers
const headersFile = path.join(PUBLIC_DIR, "_headers");
const headersContent = fs.existsSync(headersFile) ? fs.readFileSync(headersFile, "utf8") : "";
const hasImmutableAssetsHeader =
  headersContent.includes("/assets/*") &&
  headersContent.includes("max-age=31536000") &&
  headersContent.includes("immutable");
record(
  "Static asset immutable cache header (_headers)",
  hasImmutableAssetsHeader ? "verified" : "missing",
  "public, max-age=31536000, immutable",
  hasImmutableAssetsHeader,
  path.relative(ROOT, headersFile),
);

console.log(
  `\nKESTORAE Performance Budget Check (${path.relative(ROOT, PUBLIC_DIR)})\n` + "=".repeat(72),
);
for (const c of checks) {
  const status = c.passed ? "PASS" : "FAIL";
  console.log(
    `[${status}] ${c.label}: ${c.actual} / ${c.limit}${c.detail ? ` (${c.detail})` : ""}`,
  );
}
console.log("=".repeat(72));

if (failures.length > 0) {
  console.error(
    `\nBudget verification failed (${failures.length} violation(s)):\n- ${failures.join("\n- ")}`,
  );
  process.exit(1);
}

console.log("\nAll performance budgets passed.");
