// "use client";

// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import { usePathname } from "next/navigation";
// import EnquirySideModal from "./components/EnquiryModals";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export default function RootLayout({ children }) {
//    const [products, setProducts] = useState([]);

//     useEffect(() => {
//        const fetchData = async () => {
//          try {
//            const [catRes, prodRes] = await Promise.all([
//              axios.get("http://localhost:5000/api/categories/admin/all"),
//              axios.get("http://localhost:5000/api/products"),
//            ]);

//            setCategories(catRes.data.data);
//            setProducts(prodRes.data.data);
//          } catch (err) {
//            console.log(err);
//          } finally {
//            setLoading(false);
//          }
//        };

//        fetchData();
//      }, []);
//   const pathname = usePathname();

//   // Hide Navbar & Footer on admin routes
//   const isAdminRoute = pathname.startsWith("/admin");

//  return (
//   <html lang="en">
// <body className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen`}>

//   {/* 🎬 Background Video */}
//   <video
//     autoPlay
//     loop
//     muted
//     playsInline
//     className="fixed top-0 left-0 w-full h-full object-cover -z-10"
//   >
//     <source src="/image/chemicalvideo.mp4" type="video/mp4" />
//   </video>

//   {/* Overlay */}
//   <div className="fixed inset-0 bg-white/30 -z-10" />

//   {!isAdminRoute && <Navbar />}
//   {children}
//   {!isAdminRoute && <Footer />}

// </body>


//  <script src="https://cdn.ckeditor.com/4.16.2/full/ckeditor.js" async></script>
//   </html>
// );
// }


// {/* <body className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen`}> */}

//   {/* 🎬 Background Video */}
//   {/* <video
//     autoPlay
//     loop
//     muted
//     playsInline
//     className="fixed top-0 left-0 w-full h-full object-cover -z-10"
//   >
//     <source src="/background.mp4" type="video/mp4" />
//   </video> */}

//   {/* Overlay */}
//   {/* <div className="fixed inset-0 bg-white/30 -z-10" />

//   {!isAdminRoute && <Navbar />}
//   {children}
//   {!isAdminRoute && <Footer />}

// </body> */}

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import ClientLayout from "./ClientLayout"; // new client component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://chemicalsallied.in"),
  title: {
    default:
      "Chemicals Allied | Crop Protection Chemical Manufacturer",
    template: "%s | Chemicals Allied",
  },
  description:
    "Chemicals Allied is a leading manufacturer and supplier of crop protection chemicals, herbicides, fungicides, insecticides, and agricultural solutions across India.",
  keywords: [
    "Crop Protection Chemicals",
    "Herbicides",
    "Fungicides",
    "Insecticides",
    "Agriculture",
    "Chemical Manufacturer",
    "India",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Chemicals Allied",
    description:
      "Leading Crop Protection Chemical Manufacturer in India.",
    url: "https://chemicalsallied.in",
    siteName: "Chemicals Allied",
    images: [
      {
        url: "/chemicalsallied-OG-image.jpeg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chemicals Allied",
    description:
      "Crop Protection Chemical Manufacturer",
    images: ["/chemicalsallied-OG-image.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Site Verification */}
        <meta
          name="google-site-verification"
          content="CA9BVgtbmc5XLFK-6RSETaU8wUWIVuBf_uJDzM2kpn0"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen`}
      >
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4T223Y341W"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4T223Y341W');
          `}
        </Script>

        {/* Organization Schema */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Chemicals & Allied Products",
              url: "https://chemicalsallied.in",
              logo: "https://chemicalsallied.in/image/logo(2).png",
              foundingDate: "1974",
              description:
                "Leading Agrochemical Manufacturer in Uttar Pradesh.",
              address: {
                "@type": "PostalAddress",
                addressRegion: "Uttar Pradesh",
                addressCountry: "IN",
              },
            }),
          }}
        />

        {/* CKEditor */}
        <Script
          src="https://cdn.ckeditor.com/4.16.2/full/ckeditor.js"
          strategy="afterInteractive"
        />

        {/* Client Component that handles dynamic logic */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}