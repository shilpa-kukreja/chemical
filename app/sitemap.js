const API =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://chemicalsallied.in/";

export default async function sitemap() {
  let products = [];
  let categories = [];

  try {
    const [productRes, categoryRes] = await Promise.all([
      fetch(`${API}/api/products`, {
        next: { revalidate: 3600 },
      }),
      fetch(`${API}/api/categories/admin/all`, {
        next: { revalidate: 3600 },
      }),
    ]);

    const productData = await productRes.json();
    const categoryData = await categoryRes.json();

    products = productData.data || [];
    categories = categoryData.data || [];
  } catch (err) {
    console.log(err);
  }

  const baseUrl = "https://chemicalsallied.in/";

  const staticPages = [
    "",
    "/about",
    "/contact",
    "/blogs",
    "/products",
  ];

  const staticUrls = staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    priority: page === "" ? 1 : 0.8,
  }));

  const categoryUrls = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    priority: 0.7,
  }));

  return [...staticUrls, ...categoryUrls, ...productUrls];
}