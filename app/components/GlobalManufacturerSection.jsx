"use client";

import Image from "next/image";

export default function GlobalManufacturerSection() {
  return (
    <section className=" sm:py-10 py-5">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        
        {/* Lift IMAGE CARD */}
        <div className="relative  rounded-2xl p-10 flex justify-center items-center ">

          {/* Decorative Rings */}
          {/* <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[340px] h-[340px] border border-white/20 rounded-full"></div>
            <div className="absolute w-[380px] h-[380px] border border-white/10 rounded-full"></div>
          </div> */}

          {/* Image Circle */}
          <div className="relative  rounded-full sm:pt-30 pt-5 flex items-center justify-center z-10 ">
            <img
              src="/image/2.jpeg"
              alt="DF Ball Pen"
              className="object-contain h-full w-full"             
            />
          </div>

          {/* Label */}
          {/* <div className="absolute bottom-6 right-8 text-white text-xl font-semibold tracking-wide">
            <span className="block w-10 h-[2px] bg-white mb-2"></span>
            DF Ball Pen
          </div> */}
        </div>

        {/* Right CONTENT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1b3163] leading-tight mb-4">
            Leading Ball Pen Manufacturers Offering Worldwide Delivery
          </h2>

          <p className="text-white sm:text-lg text-md text-justify leading-relaxed mb-6">
            As a company that focuses chiefly on exports, we are proud to provide{" "}
            <strong>Ball Pens</strong> to customers all over the world, including
            businesses, distributors, schools, and organisations across multiple
            countries. All products are manufactured using high-quality plastic
            components and undergo strict quality control checks that meet
            international standards.
          </p>

          <p className="text-white sm:text-lg text-md text-justify leading-relaxed mb-4">
            We ensure timely global delivery and flexible fulfillment of large
            orders through efficient production processes, ethical business
            practices, and reliable logistics. Vinayak Writing Instruments delivers
            writing solutions that offer superior quality and value by combining
            expertise, transparency, and a customer-first approach.
          </p>

          <p className="text-white sm:text-lg text-md text-justify leading-relaxed">
            Vinayak is the company you can trust when you need a reliable Ball Pen
            manufacturer and global supplier.
          </p>
        </div>


      </div>
    </section>
  );
}
