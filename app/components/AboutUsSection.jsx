"use client";

import Image from "next/image";

const AboutUsSection = () => {
  return (
    <section className=" py-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1b3163] leading-tight mb-6">
            Trusted Ball Pen Supplier <br />
            <span className="text-[#1b3163">with Worldwide Delivery</span>
          </h2>

          <p className="text-white sm:text-lg text-md text-justify  leading-relaxed mb-6">
            <strong>Vinayak Writing Instruments</strong>, based in Keshod, Gujarat, is a
            trusted global manufacturer, supplier, and wholesaler of ballpoint pens.
            We deliver high-quality writing solutions across India and worldwide.
          </p>

          <p className="text-white sm:text-lg text-md text-justify leading-relaxed mb-6">
            With years of hands-on industry experience, we specialize in reliable,
            innovative, and affordable writing tools designed for everyday use.
            Quality, comfort, and performance are at the core of everything we make.
          </p>

          <p className="text-white sm:text-lg text-md text-justify leading-relaxed">
            Our wide product range includes{" "}
            <strong>
              Crystal Ball Pens, Powerpen Ball Pens, Triangle Ball Pens, Tik Tik Pens,
              Designer Ball Pens, DF Ball Pens (Regular, Spiral & B Series),
              Colour Ball Point Pens, Disposable Pens, Office Pens, Use & Throw Pens,
              and Polo Pens
            </strong>
            — all designed for smooth ink flow, comfortable grip, and long-lasting use.
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
