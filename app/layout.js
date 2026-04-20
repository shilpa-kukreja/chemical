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


"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { usePathname } from "next/navigation";
import EnquirySideModal from "./components/EnquiryModals";
import { useEffect, useState } from "react";
import axios from "axios";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Added missing state
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://chemicalsallied.in";

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const [catRes, prodRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/categories/admin/all`),
          axios.get(`${API_BASE_URL}/api/products`),
        ]);

        setCategories(catRes.data.data);
        setProducts(prodRes.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const pathname = usePathname();

  // Hide Navbar & Footer on admin routes
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <html lang="en">
      <head>
        {/* Load CKEditor from CDN */}
        <script src="https://cdn.ckeditor.com/4.16.2/full/ckeditor.js" async></script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen`}>
        {/* 🎬 Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed top-0 left-0 w-full h-full object-cover -z-10"
        >
          <source src="/image/chemicalvideo.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="fixed inset-0 bg-white/30 -z-10" />

        {!isAdminRoute && <Navbar />}
        {children}
        {!isAdminRoute && <Footer />}
      </body>
    </html>
  );
}
