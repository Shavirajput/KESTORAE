

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Performance Verification

```sh
npm run build
npm run perf:budget
npm run perf:lighthouse
```

See [PERFORMANCE.md](./PERFORMANCE.md) for Core Web Vitals field monitoring (`VITE_WEB_VITALS_ENDPOINT`), budget thresholds, and production CDN caching requirements.

