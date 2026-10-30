import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import netlify from "@netlify/vite-plugin-tanstack-start";
import base44 from "@base44/vite-plugin";
import { cloudflare } from "@cloudflare/vite-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const isNetlify = process.env.NETLIFY === "true";

// Every runtime dependency is bundled at startup, for the browser and SSR server: one first imported
// mid-session makes Vite re-bundle, and a page rendered meanwhile on the server loads a second React.
// Not listed: React itself, the TanStack Start/Router framework (its plugin bundles it) and build-time plugins.
const NOT_PREBUNDLED = new Set(["react", "react-dom", "@base44/vite-plugin", "@tanstack/react-start", "@tanstack/react-router", "tailwindcss-animate"]);
const { dependencies } = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));
const PREBUNDLE = Object.keys(dependencies).filter((name) => !NOT_PREBUNDLED.has(name));

export default defineConfig(({ mode }) => {
  const isGitHubPages = mode === "github-pages" || process.env.GITHUB_PAGES_BUILD === "true";
  if (mode === "github-pages") process.env.GITHUB_PAGES_BUILD = "true";
  const [repositoryOwner, repositoryName] = (process.env.GITHUB_REPOSITORY ?? "").split("/");
  const defaultPagesBase =
    repositoryName === `${repositoryOwner}.github.io` ? "/" : repositoryName ? `/${repositoryName}/` : "/";

  return {
    base: isGitHubPages ? process.env.GITHUB_PAGES_BASE || defaultPagesBase : "/",
    resolve: {
      alias: isNetlify || isGitHubPages
        ? [
            {
              find: "cloudflare:workers",
              replacement: fileURLToPath(new URL("./src/lib/netlify-workers.js", import.meta.url)),
            },
          ]
        : [],
    },
    optimizeDeps: { include: PREBUNDLE },
    environments: {
      ssr: {
        optimizeDeps: { include: PREBUNDLE },
        // Server source maps aid error reporting without copying source into the maps. The browser build gets none.
        build: { sourcemap: true, rolldownOptions: { output: { sourcemapExcludeSources: true } } },
      },
    },
    plugins: [
      base44({
        hmrNotifier: true,
        navigationNotifier: true,
        analyticsTracker: true,
        visualEditAgent: true,
      }),
      ...(!isNetlify && !isGitHubPages
        ? [
            // No inspector: a restarted dev server would race the old one for port 9229 and crash.
            cloudflare({ viteEnvironment: { name: "ssr" }, inspectorPort: false }),
          ]
        : []),
      tanstackStart({
        srcDirectory: "src",
        ...(isGitHubPages ? { prerender: { enabled: true, failOnError: true } } : {}),
      }),
      react(),
      ...(isNetlify ? [netlify()] : []),
    ],
  };
});
