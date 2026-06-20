// import React from 'react'
// import HomeSlider from './components/HomeSlider'
// import AboutUsSection from './components/AboutUsSection'
// import ProductsShowcase from './components/productSection'
// import TestimonialSection from './components/TestimonialSection'
// import GlobalManufacturerSection from './components/GlobalManufacturerSection'
// import FAQSection from './components/FAQSection'
// import GallerySection from './components/GallerySection'

// const page = () => {
//   return (
//     <div>
//        <HomeSlider/>
//        <AboutUsSection/>
//        <ProductsShowcase/>
//        <TestimonialSection/>
//        <GlobalManufacturerSection/>
//        <FAQSection/>
//        <GallerySection/>
//     </div>
//   )
// }

// export default page

import HomeSlider from "./components/HomeSlider";
import AboutUsSection from "./components/AboutUsSection";
import ProductsShowcase from "./components/productSection";
import TestimonialSection from "./components/TestimonialSection";
import GlobalManufacturerSection from "./components/GlobalManufacturerSection";
import FAQSection from "./components/FAQSection";
import GallerySection from "./components/GallerySection";

export const metadata = {
  title: "Crop Protection Chemical Manufacturer in Uttar Pradesh | Chemicals & Allied Products",
  description:
    "Chemicals & Allied Products is a leading Crop Protection Chemical Manufacturer in Uttar Pradesh since 1974. We manufacture insecticides, herbicides, fungicides, pesticides, and plant growth regulators for modern agriculture.",

  keywords: [
    "Crop Protection Chemical Manufacturer in Uttar Pradesh",
    "Crop Protection Chemicals",
    "Agricultural Chemicals",
    "Pesticide Manufacturer",
    "Insecticide Manufacturer",
    "Herbicide Manufacturer",
    "Fungicide Manufacturer",
    "Plant Growth Regulator Manufacturer",
    "Crop Protection Products",
    "Chemicals & Allied Products",
    "Agriculture Chemicals India",
  ],

  alternates: {
    canonical: "https://chemicalsallied.in/",
  },

  openGraph: {
    title:
      "Crop Protection Chemical Manufacturer in Uttar Pradesh | Chemicals & Allied Products",
    description:
      "Leading manufacturer of insecticides, herbicides, fungicides, pesticides, and plant growth regulators in Uttar Pradesh since 1974.",
    url: "https://chemicalsallied.in/",
    siteName: "Chemicals & Allied Products",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://chemicalsallied.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Chemicals & Allied Products",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Crop Protection Chemical Manufacturer in Uttar Pradesh | Chemicals & Allied Products",
    description:
      "Leading Crop Protection Chemical Manufacturer in Uttar Pradesh since 1974.",
    images: ["https://chemicalsallied.in/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return (
    <div>
      <HomeSlider />
      <AboutUsSection />
      <ProductsShowcase />
      <TestimonialSection />
      <GlobalManufacturerSection />
      <FAQSection />
      <GallerySection />
    </div>
  );
}
