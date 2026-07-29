import BlogDetails from "./BlogDetails";

const API_BASE_URL = "https://chemicalsallied.in";

export async function generateMetadata({ params }) {
  const slug = decodeURIComponent(params.slug).trim().toLowerCase();

  try {
    const res = await fetch(`${API_BASE_URL}/api/blog/blogs`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch blogs");
    }

    const data = await res.json();
    const blogs = Array.isArray(data) ? data : data.blogs || [];

    const blog = blogs.find(
      (item) =>
        item.blogSlug?.trim().toLowerCase() === slug
    );

    if (!blog) {
      return {
        title: "Blog | Chemicals & Allied Products",
        description:
          "Read expert blogs on crop protection chemicals, agriculture, herbicides, fungicides and insecticides.",
        robots: {
          index: false,
          follow: true,
        },
      };
    }

    const plainDescription =
      blog.blogDetail
        ?.replace(/<[^>]+>/g, "")
        ?.replace(/\s+/g, " ")
        ?.trim()
        ?.slice(0, 160) ||
      `Read ${blog.blogName} on Chemicals & Allied Products.`;

    const imageUrl = blog.blogImg
      ? `${API_BASE_URL}${blog.blogImg}`
      : `${API_BASE_URL}/chemicalsallied-OG-image.jpeg`;

    return {
      title: `${blog.blogName} | Chemicals & Allied Products`,

      description: plainDescription,

      keywords: [
        blog.blogName,
        "Crop Protection Chemicals",
        "Agriculture",
        "Herbicides",
        "Fungicides",
        "Insecticides",
        "Agrochemicals",
        "Chemical Manufacturer",
        "India",
      ],

      alternates: {
        canonical: `${API_BASE_URL}/blog/${blog.blogSlug}`,
      },

      robots: {
        index: true,
        follow: true,
      },

      openGraph: {
        type: "article",
        url: `${API_BASE_URL}/blog/${blog.blogSlug}`,
        title: blog.blogName,
        description: plainDescription,
        siteName: "Chemicals & Allied Products",
        locale: "en_IN",
        publishedTime: blog.createdAt,
        modifiedTime: blog.updatedAt,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: blog.blogName,
          },
        ],
      },

      twitter: {
        card: "summary_large_image",
        title: blog.blogName,
        description: plainDescription,
        images: [imageUrl],
      },
    };
  } catch (err) {
    console.error("Metadata Error:", err);

    return {
      title: "Chemicals & Allied Products Blog",
      description:
        "Read expert blogs on crop protection chemicals and agriculture.",
    };
  }
}

export default function Page() {
  return <BlogDetails />;
}