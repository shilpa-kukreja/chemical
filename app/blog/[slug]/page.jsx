import BlogDetails from "./BlogDetails";


const API_BASE_URL = "https://chemicalsallied.in";

export async function generateMetadata({ params }) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/blog/blogs`, {
      cache: "no-store",
    });

    const data = await res.json();
    const blogs = Array.isArray(data) ? data : data.blogs;

    const blog = blogs.find((item) => item.blogSlug === params.slug);

    if (!blog) {
      return {
        title: "Blog Not Found | Chemicals & Allied Products",
        description: "The requested blog could not be found.",
      };
    }

    const plainDescription = blog.blogDetail
      ?.replace(/<[^>]*>/g, "")
      ?.replace(/\s+/g, " ")
      ?.trim()
      ?.substring(0, 160);

    const imageUrl = blog.blogImg
      ? `${API_BASE_URL}${blog.blogImg}`
      : `${API_BASE_URL}/chemicalsallied-OG-image.jpeg`;

    return {
      title: `${blog.blogName} | Chemicals & Allied Products`,

      description:
        plainDescription ||
        "Read expert insights on crop protection chemicals and agriculture.",

      keywords: [
        blog.blogName,
        "Crop Protection Chemicals",
        "Agriculture",
        "Herbicides",
        "Fungicides",
        "Insecticides",
        "Agrochemical",
        "Farming",
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
        title: blog.blogName,
        description: plainDescription,
        url: `${API_BASE_URL}/blog/${blog.blogSlug}`,
        siteName: "Chemicals & Allied Products",
        locale: "en_IN",
        type: "article",

        publishedTime: blog.createdAt,

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
  } catch (error) {
    return {
      title: "Blogs | Chemicals & Allied Products",
      description:
        "Read expert blogs on crop protection chemicals and agriculture.",
    };
  }
}

export default function Page() {
  return <BlogDetails/>;
}