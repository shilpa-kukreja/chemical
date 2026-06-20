export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/api",
        ],
      },
    ],
    sitemap: "https://chemicalsallied.in/sitemap.xml",
    host: "https://chemicalsallied.in/",
  };
}