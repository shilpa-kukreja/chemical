"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";

export default function TestimonialSection() {
  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar, Agricultural Distributor, Uttar Pradesh",
      review:
        "We have been sourcing herbicides and insecticides from Chemical & Allied Products for years. Product performance is consistent, and farmer feedback has always been positive.",
      rating: 5,
    },
    {
      id: 2,
      name: "Imran Ahmed, Export Partner, Bangladesh",
      review:
        "Their formulations meet international quality expectations. Timely dispatch and reliable documentation make them a dependable export partner.",
      rating: 5,
    },
    {
      id: 3,
      name: "Suresh Patel, Progressive Farmer, Gujarat",
      review:
        "The pest control efficiency is impressive. Crop health improved noticeably after using their recommended products.",
      rating: 5,
    },
     {
      id: 4,
      name: " Anil Verma, Agro Retailer, Bihar",
      review:
        "Packaging quality and product stability are excellent. We rarely face complaints, which builds strong trust with our customers.",
      rating: 5,
    },
     {
      id: 5,
      name: "Daniel Okoro, Agro Distributor, Uganda",
      review:
        "Their herbicide range performs effectively under tough field conditions. We appreciate their consistent quality standards",
      rating: 5,
    },
  ];

  return (
    <section className="sm:py-16 py-8 ">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-[#1b3163] sm:mb-12 mb-6">
          Testimonial
        </h2>

        {/* Swiper */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="h-full border border-gray-300 rounded-xl p-6 flex flex-col justify-between bg-white">
                
                {/* Review Text */}
                <p className="text-gray-700 text-sm leading-relaxed mb-6 line-clamp-5">
                  {item.review}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between mt-auto">
                  
                  {/* Name */}
                  <span className="font-medium text-gray-900">
                    {item.name}
                  </span>

                  {/* Google Reviews */}
                  <div className="text-right">
                    <div className="text-blue-600 font-semibold text-sm">
                      Google
                    </div>
                    <div className="flex gap-0.5 text-justify justify-end">
                      {[...Array(item.rating)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 fill-yellow-400"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09L5.245 11.545 0.49 6.91l6.561-.955L10 0l2.949 5.955 6.561.955-4.755 4.636 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500">
                      Reviews
                    </div>
                  </div>

                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}
