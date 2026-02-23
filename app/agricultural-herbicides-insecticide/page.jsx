"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import axios from "axios";

export default function ProductsPage() {
  const [categories, setCategories] = useState([]);
   const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://chemical-backend-6oix.onrender.com";

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/categories/admin/all`);
       const sortedCategories = (res.data.data || []).reverse();
      setCategories(sortedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <section className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1b3163] mb-4">
            Agricultural{" "}
            <span className="text-emerald-700">
              Herbicides & Insecticide
            </span>
          </h2>
          <p className="text-lg text-white max-w-2xl mx-auto">
            Browse our specialized range of agricultural chemicals.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid sm:gap-6 gap-2 grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/category/${cat.slug}`}
              className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-emerald-200"
            >
              {/* Image */}
              <div className="relative  w-full overflow-hidden">
                <img
                  src={`http://localhost:5000${cat.image}`}
                  alt={cat.name}
                  
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6 relative">
                <h3 className="text-xl font-bold text-[#1b3163] group-hover:text-emerald-700 transition-colors mb-3">
                  {cat.name}
                </h3>

                {/* <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {cat.description}
                </p> */}

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm font-semibold text-emerald-600">
                    View Products
                  </span>
                  <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
