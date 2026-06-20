import BlogsPage from "./blogClient";

export const metadata = {
  title: "Blogs | Chemicals & Allied Products",

  description:
    "Read the latest blogs from Chemicals & Allied Products on crop protection chemicals, herbicides, fungicides, insecticides, agricultural practices, and farming solutions.",

  keywords: [
    "Crop Protection Chemicals",
    "Herbicides",
    "Fungicides",
    "Insecticides",
    "Agriculture",
    "Chemical Manufacturer",
    "India",
    "Agriculture Blogs",
    "Farming Tips",
    "Agrochemical Blogs",
  ],

  alternates: {
    canonical: "https://chemicalsallied.in/blogs",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Blogs | Chemicals & Allied Products",
    description:
      "Explore expert blogs on crop protection chemicals, agriculture, and modern farming solutions.",
    url: "https://chemicalsallied.in/blogs",
    siteName: "Chemicals & Allied Products",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://chemicalsallied.in/chemicalsallied-OG-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Chemicals & Allied Products Blogs",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Blogs | Chemicals & Allied Products",
    description:
      "Read expert blogs on crop protection chemicals and agriculture.",
    images: [
      "https://chemicalsallied.in/chemicalsallied-OG-image.jpeg",
    ],
  },
};

export default function BlogPage() {
  return <BlogsPage />;
}