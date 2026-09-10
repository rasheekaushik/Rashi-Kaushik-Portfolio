import type { APIRoute } from "astro";
import { site } from "../site.config";

// Generated rather than static, so the sitemap URL follows site.config.
export const GET: APIRoute = ({ site: astroSite }) => {
  const origin = (astroSite ?? new URL(site.domain)).href.replace(/\/$/, "");
  return new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap-index.xml\n`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
};
