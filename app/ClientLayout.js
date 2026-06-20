"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function ClientLayout({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://chemicalsallied.in";
  const pathname = usePathname();

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
  }, [API_BASE_URL]);

  const isAdminRoute = pathname?.startsWith("/admin") ?? false;

  return (
    <>
      {/* Background Video & Overlay */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/image/chemicalvideo.mp4" type="video/mp4" />
      </video>
      <div className="fixed inset-0 bg-white/30 -z-10" />

      {/* Navbar / Footer conditional rendering */}
      {!isAdminRoute && <Navbar />}
      {children}
      {!isAdminRoute && <Footer />}
    </>
  );
}