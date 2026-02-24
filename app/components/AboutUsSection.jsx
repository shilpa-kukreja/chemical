"use client";

import Image from "next/image";

const AboutUsSection = () => {
  return (
    <section className=" py-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1b3163] leading-tight mb-6">
            Established 1974  <br /> 
            <span className="text-[#1b3163">| Precision Agrochemicals | Global Supply Network</span>
          </h2>

          <p className="text-white sm:text-lg text-md text-justify  leading-relaxed mb-6">
            <strong>Chemical & Allied Products</strong>, established in 1974, is a trusted manufacturer and exporter of advanced agrochemical solutions. With decades of industry expertise, we deliver high-performance crop protection products across India and selected international markets in Asia and Africa.
          </p>

          <p className="text-white sm:text-lg text-md text-justify leading-relaxed mb-6">
           With strong manufacturing capabilities and formulation precision, we specialize in reliable pesticides, effective herbicides, and performance-driven soil enrichment solutions designed to enhance agricultural productivity. Quality control, consistency, and field-tested efficiency remain at the core of our operations.
          </p>

          <p className="text-white sm:text-lg text-md text-justify leading-relaxed">
            Our product portfolio includes {" "}
            <strong>
              selective insecticides, broad-spectrum herbicides, and bio-based soil enhancers available in liquid, powder, and granulated forms. Manufactured under strict standards and offered in customized packaging, our solutions are engineered to deliver dependable results across diverse farming conditions.
            </strong>
            {/* — all designed for smooth ink flow, comfortable grip, and long-lasting use. */}
          </p>
        </div>

        {/* RIGHT IMAGE CARD */}
        <div className="relative  rounded-2xl px-8 sm:pt-40 pt-2 flex justify-center items-center ">
          
          <div className="absolute top-20 left-6 w-24 h-24 border border-white/20 rounded-full" />
          <div className="absolute bottom-6 right-6 w-32 h-32 border border-white/20 rounded-full" />

          <div className="text-center">

            <img
              src="/image/1.jpeg"
              alt="Plastic Ballpoint Pen"
              className="mx-auto drop-shadow-2xl"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUsSection;
