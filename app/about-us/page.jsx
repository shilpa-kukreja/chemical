"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function AboutUs() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const companyImages = [
    { id: 1, src: "/companygallery/achievements.webp", alt: "Achievements", category: "Achievements" },
    { id: 2, src: "/companygallery/Awards&Recognition.webp", alt: "Awards", category: "Awards & Recognition" },
    { id: 3, src: "/companygallery/QualityCompliance.webp", alt: "Quality Compliance", category: "Quality" },
    { id: 4, src: "/companygallery/TradeMemberships.webp", alt: "Trade Memberships", category: "Memberships" },
    { id: 5, src: "/companygallery/QualityMantra.webp", alt: "Quality Mantra", category: "Quality" },
    { id: 6, src: "/companygallery/QualityAssurance.webp", alt: "Quality Assurance", category: "Quality" },
    { id: 7, src: "/companygallery/InfrastructuraSet-Up.webp", alt: "Infrastructure Set-Up", category: "Infrastructure" },
    { id: 8, src: "/companygallery/OurInfrastructure.webp", alt: "Our Infrastructure", category: "Infrastructure" },
    { id: 9, src: "/companygallery/Memberships.webp", alt: "Memberships", category: "Memberships" },
    { id: 10, src: "/companygallery/Affiliations.webp", alt: "Affiliations", category: "Memberships" },
    { id: 11, src: "/companygallery/OurWarehouse.webp", alt: "Our Warehouse", category: "Infrastructure" },
    { id: 12, src: "/companygallery/CertificateofRegistration.webp", alt: "Certificate", category: "Certificates" },
    { id: 13, src: "/companygallery/Research&DevelopmentFacilities.webp", alt: "R&D", category: "R&D" },
    { id: 14, src: "/companygallery/Recognition.webp", alt: "Recognition", category: "Achievements" },
    { id: 15, src: "/companygallery/ISOCertification.webp", alt: "ISO Certification", category: "Certificates" },
     { id: 15, src: "/companygallery/Certification.webp", alt: "Certification", category: "Certificates" },

  ];

  // Dynamic categories
  const categories = ["All", ...new Set(companyImages.map((img) => img.category))];

  // Filter logic
  const filteredImages =
    activeCategory === "All"
      ? companyImages
      : companyImages.filter((img) => img.category === activeCategory);

  return (
    <section className="text-gray-800">
      {/* ================= BREADCRUMB ================= */}
      <div className="py-3 text-sm text-center">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-gray-600">Home</span>
          <span className="mx-2 text-gray-400">/</span>
          <span className="font-semibold text-[#1b3163]">About Us</span>
        </div>
      </div>

      {/* ================= COMPANY OVERVIEW SECTION ================= */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Company Description */}
          <div>
            <h2 className="text-4xl font-bold text-[#1b3163] mb-6 relative">
              <span className="relative z-10">Company Overview</span>
              <span className="absolute bottom-0 left-0 w-20 h-1 bg-yellow-400"></span>
            </h2>
            
            <p className="text-gray-700 text-justify leading-relaxed mb-6 text-lg">
              <span className="font-bold text-[#1b3163] text-2xl">Chemical & Allied Products</span> was established in the year 1974. 
              We are a leading Manufacturer and Exporter of Agricultural Pesticides, Butachlor 50% EW Herbicide, 
              Granulated Bio Extract Organic Soil Enricher, and much more.
            </p>
            
            <p className="text-gray-700 text-justify leading-relaxed mb-6">
              An insecticide is a pesticide used against insects. They include ovicides and larvicides used 
              against the eggs and larvae of insects respectively. These are used in agriculture, industry and 
              the household. The use of insecticides is believed to be one of the major factors behind the 
              increase in agricultural productivity.
            </p>
            
            <p className="text-gray-700 text-justify leading-relaxed mb-8">
              These products are toxic and highly effective for killing various types of insects, termites and 
              others. Available in liquified form as well as in powder form, we offer our customers these 
              insecticides in customized packaging at nominal prices.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-[#1b3163]">1974</div>
                <div className="text-sm text-gray-600">Established</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-[#1b3163]">51-100</div>
                <div className="text-sm text-gray-600">Employees</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-3xl font-bold text-[#1b3163]">20%</div>
                <div className="text-sm text-gray-600">Export</div>
              </div>
            </div>
          </div>

          {/* Right Column - CEO Image/Message */}
          <div className=" rounded-xl shadow-xl overflow-hidden">
            <div className="relative h-[500px] w-full">
              <img
                src="/Aboutus.jpg"
                alt="CEO Sanjeev Arora"
                className="object-cover object-top h-full w-full"
                
              />
            </div>
          </div>
        </div>
      </div>

      {/* ================= FACT SHEET SECTION WITH ICONS ================= */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-[#1b3163] mb-4">Factsheet</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Quick overview of our business profile and credentials</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FactCard 
              icon="🏢"
              title="Nature of Business"
              value="Manufacturer"
              subtext="Factory / Warehouse / Office"
            />
            <FactCard 
              icon="👨‍💼"
              title="Company CEO"
              value="Sanjeev Arora"
              subtext="Leading since 1974"
            />
            <FactCard 
              icon="📍"
              title="Registered Address"
              value="Deoria-274001"
              subtext="Uttar Pradesh, India"
            />
            <FactCard 
              icon="📊"
              title="Annual Turnover"
              value="₹1.5 - 5 Cr"
              subtext="GST Reg: 01-07-2017"
            />
          </div>
        </div>
      </div>

      {/* ================= STATUTORY PROFILE ================= */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-[#1b3163] mb-12">Statutory Profile</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProfileCard 
              label="Import Export Code (IEC)"
              value="AADFC8544L"
              icon="📄"
            />
            <ProfileCard 
              label="TAN No."
              value="ALDC0*****"
              icon="🔢"
            />
            <ProfileCard 
              label="Banker"
              value="ICICI Bank"
              icon="🏦"
            />
            <ProfileCard 
              label="GST No."
              value="09AADFC8544L1Z1"
              icon="📋"
            />
          </div>
        </div>
      </div>

      {/* ================= COMPANY GALLERY - LIKE REFERENCE IMAGE ================= */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-[#1b3163] mb-4">Company Gallery</h2>
          <p className="text-center text-gray-600 mb-8">A glimpse into our facilities and operations</p>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full border transition text-sm font-medium ${
                  activeCategory === category
                    ? "bg-[#1b3163] text-white border-[#1b3163]"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-[#1b3163] hover:text-white hover:border-[#1b3163]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image) => (
              <div 
                key={image.id} 
                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-500"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 text-sm font-medium px-3 py-1 bg-[#1b3163] rounded-full">
                      {image.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="bg-[#1b3163] text-white px-8 py-3 rounded-lg hover:bg-[#2a4585] transition font-semibold">
              View Full Gallery
            </button>
          </div>
        </div>
      </div>

      {/* ================= PACKAGING, PAYMENT & SHIPMENT ================= */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-[#1b3163] mb-12">Packaging, Payment & Shipment</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-[#1b3163]">
              <div className="text-4xl mb-4">💳</div>
              <h3 className="text-xl font-bold text-[#1b3163] mb-4">Payment Modes</h3>
              <ul className="space-y-3">
                {["Cash", "Cheque", "Credit Card"].map((mode, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-gray-700">{mode}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-[#1b3163]">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-bold text-[#1b3163] mb-4">Shipment Mode</h3>
              <ul className="space-y-3">
                {["By Road"].map((mode, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-gray-700">{mode}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#1b3163] p-8 rounded-xl shadow-lg text-white">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-xl font-bold mb-4">Quick Message</h3>
              <p className="mb-6 text-gray-200">
                Discuss more about your requirement by contacting us now
              </p>
              <Link href="/contact-us" className="hover:text-white transition"><button className="bg-yellow-400 text-[#1b3163] px-6 py-3 rounded-lg hover:bg-yellow-300 transition font-semibold w-full">
                Contact Us
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ================= WHY PICK US ================= */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-[#1b3163] mb-12">Why Choose Us</h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Competitive Prices", desc: "Best prices in the industry without quality compromise" },
              { title: "High Quality", desc: "Strict quality tests for every product batch" },
              { title: "Timely Delivery", desc: "Guaranteed on-time delivery across all shipments" },
              { title: "Wide Network", desc: "Strong distribution network covering multiple countries" },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-md hover:shadow-xl transition relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#1b3163] rounded-bl-full opacity-10"></div>
                <div className="text-3xl mb-3">⭐</div>
                <h3 className="text-lg font-bold text-[#1b3163] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= LIGHTBOX MODAL ================= */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" 
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              className="object-contain"
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
            />
            <button 
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center text-2xl hover:bg-opacity-70 transition"
              onClick={() => setSelectedImage(null)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="absolute bottom-4 left-0 right-0 text-center text-white bg-black bg-opacity-50 py-2 px-4 mx-4 rounded">
              {selectedImage.alt} - {selectedImage.category}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ================ COMPONENTS ================

function FactCard({ icon, title, value, subtext }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition border-b-4 border-[#1b3163]">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-sm text-gray-500 mb-1">{title}</h3>
      <p className="text-xl font-bold text-[#1b3163] mb-1">{value}</p>
      {subtext && <p className="text-xs text-gray-500">{subtext}</p>}
    </div>
  );
}

function ProfileCard({ label, value, icon }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border-l-4 border-[#1b3163]">
      <div className="flex items-start gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <p className="text-xs text-gray-500 mb-1">{label}</p>
          <p className="text-lg font-bold text-[#1b3163]">{value}</p>
        </div>
      </div>
    </div>
  );
}