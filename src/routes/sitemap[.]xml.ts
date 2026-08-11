import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://peace-tree-bloom.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "daily", priority: "1.0" },
          { path: "/a-propos", changefreq: "monthly", priority: "0.8" },
          { path: "/projets", changefreq: "monthly", priority: "0.8" },
          { path: "/arbre-de-la-paix", changefreq: "daily", priority: "0.9" },
          { path: "/alumma-ginda", changefreq: "monthly", priority: "0.9" },
          { path: "/actualites", changefreq: "weekly", priority: "0.7" },
          { path: "/evenements", changefreq: "weekly", priority: "0.7" },
          { path: "/galerie", changefreq: "monthly", priority: "0.6" },
          { path: "/devenir-partenaire", changefreq: "monthly", priority: "0.6" },
          { path: "/contact", changefreq: "monthly", priority: "0.6" },
          { path: "/engagement", changefreq: "weekly", priority: "0.9" },
          { path: "/tableau-de-bord", changefreq: "hourly", priority: "0.8" },
        ];
        const urls = entries.map(
          (e) =>
            `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
