# BUCHI LOVE

A local website for BUCHI LOVE, built with React and TanStack Start.

## Run locally

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

To create a production build, run:

```bash
npm run build
```

## Deploy to Netlify

Connect this repository to Netlify and deploy with the included `netlify.toml`. Netlify builds use TanStack Start's Netlify adapter for server rendering and server routes; the existing Cloudflare adapter remains in use for non-Netlify builds.

The page's animation effects, CSS, and Google Fonts are unchanged.

The menu is defined in `src/data/site.js`. The order form is a local preview only: it does not send or store orders.

## Deploy to GitHub Pages

The GitHub Actions workflow in `.github/workflows/deploy.yml` builds this single-page site as static HTML and publishes it to GitHub Pages whenever changes are pushed to `main` or `master`.

1. Push this repository to GitHub.
2. In the repository, open **Settings → Pages** and select **GitHub Actions** as the build and deployment source.
3. Push a commit to `main` or `master` (or run the workflow manually from the **Actions** tab). When the workflow finishes, GitHub Pages shows the published URL in **Settings → Pages**.

For a project repository, the default URL is `https://USERNAME.github.io/REPOSITORY/`. A repository named `USERNAME.github.io` publishes at `https://USERNAME.github.io/`. The Pages build automatically uses the right asset and router base path for either URL. The regular `npm run build` remains the existing Cloudflare build; use `npm run build:github-pages` to build the static Pages version locally.

The site is static: the order form is a local preview and does not send or store orders.
