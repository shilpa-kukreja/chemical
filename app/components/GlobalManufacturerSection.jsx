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
              alt="Global Manufacturing"
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
            Globally Trusted Agrochemical Manufacturer Delivering Performance Without Compromise
          </h2>

          <p className="text-white sm:text-lg text-md text-justify leading-relaxed mb-6">
            As a company driven by export excellence and manufacturing precision, we supply advanced herbicides, insecticides, and crop protection formulations to partners across India, Asia, and Africa. Our focus is not just production, but delivering dependable agricultural solutions that meet international quality expectations.
          </p>

          <p className="text-white sm:text-lg text-md text-justify leading-relaxed mb-4">
            Every formulation is developed using carefully selected raw materials and processed under strict quality control systems. From active ingredient balance to packaging integrity, each stage reflects our commitment to safety, stability, and consistent field performance across diverse agricultural environments.
          </p>

          <p className="text-white sm:text-lg text-md text-justify leading-relaxed">
            We ensure timely dispatch, structured bulk supply capabilities, and seamless export coordination supported by ethical business practices and reliable logistics. For distributors, retailers, and global partners seeking a dependable agrochemical supplier, we offer not just products, but long-term performance assurance.
          </p>
        </div>


      </div>
    </section>
  );
}
