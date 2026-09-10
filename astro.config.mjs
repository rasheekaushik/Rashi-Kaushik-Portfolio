// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { site } from "./src/site.config.ts";

export default defineConfig({
  // Used for absolute URLs in the sitemap, canonical tags and OG metadata.
  // Set via src/site.config.ts.
  site: site.domain,

  // Custom apex domain, so the site is served from the root — no `base`.
  // If you ever deploy to <user>.github.io/<repo>/ instead, set:
  //   base: "/<repo>",
  build: {
    format: "directory",
  },

  integrations: [sitemap()],

  // The floating Astro toolbar is a dev-only overlay — it never shipped in the
  // built site. Turned off because it was in the way; set enabled: true to
  // bring it back.
  devToolbar: { enabled: false },

  markdown: {
    shikiConfig: {
      // Light, to sit on the blush ground without a black hole in the page.
      theme: "github-light",
      wrap: true,
    },
  },
});
