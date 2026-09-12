import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';

/* GitHub Pages serves a project site from /<repo>/, so CI builds carry that
   prefix while local dev and preview stay at the root. */
const base = process.env.GITHUB_ACTIONS ? '/Lumiere/' : '/';

/* Pages has no SPA rewrite: a direct hit on /pricing would 404 before React
   ever loads. Shipping index.html as 404.html too means Pages serves the app
   for any unknown path, and the router takes it from there. */
function spaFallback() {
  return {
    name: 'spa-fallback-404',
    apply: 'build',
    closeBundle() {
      const out = resolve(__dirname, 'dist');
      copyFileSync(resolve(out, 'index.html'), resolve(out, '404.html'));
    },
  };
}

export default defineConfig({
  plugins: [react(), spaFallback()],
  base,
});
