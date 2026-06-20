
import ContactPages from "./clientContact";

export const metadata = {
  title: "Contact Us | Chemicals & Allied Products",

  description:
    "Get in touch with Chemicals & Allied Products, a trusted agrochemical manufacturer in India. Contact us for product inquiries, dealership opportunities, crop protection solutions, and customer support.",

  keywords: [
    "Contact Chemicals & Allied Products",
    "Agrochemical Manufacturer Contact",
    "Crop Protection Chemicals",
    "Herbicides",
    "Fungicides",
    "Insecticides",
    "Agricultural Chemicals",
    "Chemical Manufacturer India",
    "Contact Us",
  ],

  alternates: {
    canonical: "https://chemicalsallied.in/contact-us",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Contact Us | Chemicals & Allied Products",
    description:
      "Contact Chemicals & Allied Products for agricultural chemical solutions, dealership inquiries, and customer support.",
    url: "https://chemicalsallied.in/contact-us",
    siteName: "Chemicals & Allied Products",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://chemicalsallied.in/chemicalsallied-OG-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Chemicals & Allied Products Contact",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Chemicals & Allied Products",
    description:
      "Get in touch with Chemicals & Allied Products for crop protection solutions and business inquiries.",
    images: [
      "https://chemicalsallied.in/chemicalsallied-OG-image.jpeg",
    ],
  },
};

export default function ContactPage() {
  return <ContactPages />;
}