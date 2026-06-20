
import AboutUs from "./AboutClient";

export const metadata = {
  title:
    "Agrochemical Manufacturer in Uttar Pradesh Since 1974 | About Chemicals & Allied Products",

  description:
    "Chemicals & Allied Products is a trusted Agrochemical Manufacturer in Uttar Pradesh with over five decades of expertise in manufacturing innovative crop protection chemicals and agricultural solutions.",

  keywords: [
    "Agrochemical Manufacturer in Uttar Pradesh",
    "Crop Protection Chemicals",
    "Agricultural Chemicals",
    "Chemical Manufacturer India",
    "About Chemicals & Allied Products",
    "Pesticide Manufacturer",
    "Herbicide Manufacturer",
    "Fungicide Manufacturer"
  ],

  alternates: {
    canonical: "https://chemicalsallied.in/about-us",
  },

  openGraph: {
    title:
      "Agrochemical Manufacturer in Uttar Pradesh Since 1974 | Chemicals & Allied Products",
    description:
      "Trusted agrochemical manufacturer in Uttar Pradesh offering innovative crop protection solutions since 1974.",
    url: "https://chemicalsallied.in/about-us",
    siteName: "Chemicals & Allied Products",
    images: [
      {
        url: "https://chemicalsallied.in/chemicalsallied-OG-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Chemicals & Allied Products",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Agrochemical Manufacturer in Uttar Pradesh Since 1974",
    description:
      "Trusted agrochemical manufacturer and crop protection chemical supplier in India.",
    images: ["https://chemicalsallied.in/chemicalsallied-OG-image.jpeg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  return (
    <div>
      <AboutUs/>
    </div>
  );
}