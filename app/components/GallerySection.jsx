"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

export default function GallerySection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://chemicalsallied.in";

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/categories/admin/all`
      );

      console.log("Categories:", response.data);

      // adjust depending on your API structure
      setCategories(response.data.data || response.data || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 text-center">
        <p className="text-gray-500">Loading gallery...</p>
      </section>
    );
  }

  return (
    <section className=" sm:py-20 py-5">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="max-w-3xl mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1b3163] mb-3">
            Manufacturing Gallery
          </h2>
          <p className="text-white text-base md:text-lg">
            Explore our advanced infrastructure and product excellence.
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          loop
          spaceBetween={28}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true, dynamicBullets: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-14"
        >
          {categories.map((category) => (
            <SwiperSlide key={category._id}>
              <Link  href={`/category/${category.slug}`} className="block group">
                <div className="relative overflow-hidden  border border-gray-400 rounded-md bg-white shadow-md transition-all duration-300 hover:shadow-xl cursor-pointer">

                  <img
                    src={`${API_BASE_URL}${category.image}`}
                    alt={category.name}
                    className="h-80 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/20 to-transparent opacity-90" />

                  <div className="absolute bottom-5 left-5 right-5">
                    <h3 className="text-white text-lg font-semibold">
                      {category.name}
                    </h3>
                    <p className="text-white/80 text-sm mt-1">
                      View Product →
                    </p>
                  </div>

                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}
