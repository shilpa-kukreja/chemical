// "use client";

// import Link from "next/link";
// import {
//   Mail,
//   Phone,
//   MapPin,
//   Facebook,
//   Twitter,
//   Instagram,
// } from "lucide-react";
// import { categories } from "@/public/assets";

// export default function Footer() {

//   const quickLinks = [
//     { name: "Home", href: "/" },
//     { name: "About Us", href: "/about-us" },
//     { name: "Our Products", href: "/agricultural-herbicides-insecticide" },
//     { name: "Contact Us", href: "/contact-us" },
//     { name: "Market Area", href: "/market-area" },
//   ];

//   return (
//     <footer className="bg-gradient-to-b from-[#0c0c0c] to-black text-gray-300">

//       {/* ================= TOP INFO BAR ================= */}
//       <div className="border-b border-white/10">
//         <div className="max-w-7xl mx-auto px-6 py-6 grid gap-8 md:grid-cols-3">

//           {/* Mail */}
//           <div className="flex items-start gap-4">
//             <Mail className="text-blue-500 mt-1" />
//             <div>
//               <p className="text-white font-semibold">Mail us</p>
//               <a
//                 href="mailto:ajantadfpens@gmail.com"
//                 className="text-sm hover:text-blue-400 transition"
//               >
//                 ajantadfpens@gmail.com
//               </a>
//             </div>
//           </div>

//           {/* Call */}
//           <div className="flex items-start gap-4">
//             <Phone className="text-blue-500 mt-1" />
//             <div>
//               <p className="text-white font-semibold">Call us</p>
//               <a
//                 href="tel:+919904031137"
//                 className="text-sm hover:text-blue-400 transition"
//               >
//                 +91 99040 31137
//               </a>
//             </div>
//           </div>

//           {/* Address */}
//           <div className="flex items-start gap-4">
//             <MapPin className="text-blue-500 mt-1" />
//             <div>
//               <p className="text-white font-semibold">Find us</p>
//               <p className="text-sm leading-relaxed text-gray-400">
//                 Survey No. 114/P, Plot No.13, Nr. Total Hotel, Veraval Road,
//                 Keshod, SONDARDA 362227, Gujarat, India
//               </p>
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* ================= MAIN FOOTER ================= */}
//       <div className="max-w-7xl mx-auto px-6 py-10 grid gap-14 md:grid-cols-4">

//         {/* About */}
//         <div>
//           <h3 className="text-2xl font-bold text-white mb-4">
//             Chemicals & Allied Products
//           </h3>
//           <p className="text-sm leading-relaxed text-gray-400 mb-6">
//             Chemicals & Allied Products is a Gujarat-based manufacturing
//             company committed to delivering high-quality and reliable
//             chemical solutions for domestic and global markets.
//           </p>

//           <p className="text-white font-semibold mb-3">Follow us</p>
//           <div className="flex gap-4">
//             <a className="p-2 rounded-full bg-white/5 hover:bg-blue-500 transition">
//               <Facebook size={16} />
//             </a>
//             <a className="p-2 rounded-full bg-white/5 hover:bg-blue-500 transition">
//               <Twitter size={16} />
//             </a>
//             <a className="p-2 rounded-full bg-white/5 hover:bg-blue-500 transition">
//               <Instagram size={16} />
//             </a>
//           </div>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h4 className="text-lg font-semibold text-white mb-5 relative inline-block">
//             Quick Links
//             <span className="absolute left-0 -bottom-2 w-10 h-[2px] bg-blue-500"></span>
//           </h4>

//           <ul className="space-y-3 text-sm">
//             {quickLinks.map((item) => (
//               <li key={item.name}>
//                 <Link
//                   href={item.href}
//                   className="hover:text-white transition cursor-pointer block"
//                 >
//                   {item.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Products */}

//         <div>
//           <h4 className="text-lg font-semibold text-white mb-5 relative inline-block">
//             Our Products
//             <span className="absolute left-0 -bottom-2 w-10 h-[2px] bg-blue-500"></span>
//           </h4>
//           <div className="space-y-3 text-sm">
//             {categories.map((cat) => (
//               <Link
//                 key={cat.id}
//                 href={`/category/${cat.slug}`}
//                 className="hover:text-white transition cursor-pointer flex items-center gap-2 "
//               >
//                 {cat.name}
//               </Link>
//             ))}
//           </div>
//         </div>

//         {/* Contact */}
//         <div>
//           <h4 className="text-lg font-semibold text-white mb-5 relative inline-block">
//             Contact Us
//             <span className="absolute left-0 -bottom-2 w-10 h-[2px] bg-blue-500"></span>
//           </h4>
//           <ul className="space-y-4 text-sm text-gray-400">
//             <li className="flex gap-3">
//               <Mail size={16} className="text-blue-500" />
//               ajantadfpens@gmail.com
//             </li>
//             <li className="flex gap-3">
//               <Phone size={16} className="text-blue-500" />
//               +91 99040 31137
//             </li>
//             <li className="flex gap-3">
//               <MapPin size={16} className="text-blue-500" />
//               Keshod, Gujarat, India
//             </li>
//           </ul>
//         </div>

//       </div>

//       {/* ================= COPYRIGHT ================= */}
//       <div className="border-t border-white/10 bg-black">
//         <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-500">
//           © 2024 Chemicals & Allied Products. All Rights Reserved.
//           <span className="block mt-1 text-red-500">
//             Website Designed by Recreators design and medis pvt. ltd.
//           </span>
//         </div>
//       </div>

//       <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-4">

//         {/* CALL BUTTON */}
//         <a
//           href="tel:+971526806400"
//           aria-label="Call Us"
//           className="group relative flex h-14 w-14 items-center justify-center rounded-full 
//     bg-[#1b3163] shadow-[0_12px_30px_rgba(27,49,99,0.35)]
//     transition-all duration-300 hover:scale-110"
//         >
//           <span className="absolute inset-0 rounded-full animate-ping bg-[#1b3163]/30"></span>
//           <img
//             src="https://img.icons8.com/ios-filled/50/ffffff/phone.png"
//             alt="call"
//             className="relative w-5 h-5"
//           />
//         </a>

//         {/* WHATSAPP BUTTON */}
//         <a
//           href="https://wa.me/971526806400?text=Hello%20Insight%20Integrators,%20I%20would%20like%20to%20discuss%20compliance%20advisory."
//           aria-label="WhatsApp"
//           className="group relative flex h-14 w-14 items-center justify-center rounded-full 
//     bg-[#25d366] shadow-[0_12px_30px_rgba(37,211,102,0.35)]
//     transition-all duration-300 hover:scale-110"
//         >
//           <span className="absolute inset-0 rounded-full animate-ping bg-[#25d366]/30"></span>
//           <img
//             src="https://img.icons8.com/ios-filled/50/ffffff/whatsapp--v1.png"
//             alt="whatsapp"
//             className="relative w-5 h-5"
//           />
//         </a>

//       </div>

//     </footer>
//   );
// }

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Plus,
  Minus,
} from "lucide-react";
import axios from "axios";


export default function Footer() {
  const [openSection, setOpenSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://chemical-backend-6oix.onrender.com";

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/categories/admin/all`),
        ]);
        const sortedCategories = (catRes.data.data || []).reverse().slice(0, 6);
        setCategories(sortedCategories);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log("categories", categories);


  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Our Products", href: "/agricultural-herbicides-insecticide" },
    { name: "Contact Us", href: "/contact-us" },
    { name: "Blogs", href: "/blogs" },
    { name: "Market Area", href: "/market-area" },
  ];

  const SectionHeader = ({ title, id }) => (
    <button
      onClick={() => toggleSection(id)}
      className="flex w-full items-center justify-between text-left lg:block"
    >
      <h4 className="text-lg font-semibold text-white relative inline-block">
        {title}
        <span className="absolute left-0 -bottom-2 w-10 h-[2px] bg-[#25d366]"></span>
      </h4>

      {/* Mobile Icon */}
      <span className="lg:hidden">
        {openSection === id ? <Minus size={18} /> : <Plus size={18} />}
      </span>
    </button>
  );

  return (
    <footer className="bg-gradient-to-b from-[#0c0c0c] to-black text-gray-300">

      {/* ================= MAIN FOOTER ================= */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid gap-10 lg:grid-cols-4">

        {/* ABOUT */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">
            Chemicals & Allied Products
          </h3>
          <p className="text-sm text-gray-400 mb-6">
            Delivering precision-formulated agrochemical solutions since 1974, serving domestic and international agricultural markets with quality, consistency, and trust.
          </p>

          <div className="flex gap-4">
            <Facebook />
            <Twitter />
            <Instagram />
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <SectionHeader title="Quick Links" id="quick" />

          <div
            className={`overflow-hidden transition-all duration-500 ${openSection === "quick" ? "max-h-96 mt-5" : "max-h-0 lg:max-h-full lg:mt-5"
              }`}
          >
            <ul className="space-y-3 text-sm">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-white block">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* PRODUCTS */}
        <div>
          <SectionHeader title="Our Products" id="products" />

          <div
            className={`overflow-hidden transition-all duration-500 ${openSection === "products" ? "max-h-96 mt-5" : "max-h-0 lg:max-h-full lg:mt-5"
              }`}
          >
            <div className="space-y-3 text-sm">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className="block hover:text-white"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <SectionHeader title="Contact Us" id="contact" />

          <div
            className={`overflow-hidden transition-all duration-500 ${openSection === "contact" ? "max-h-96 mt-5" : "max-h-0 lg:max-h-full lg:mt-5"
              }`}
          >
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex gap-3">
                <Mail size={16} /> marketing@chemicalsallied.in
              </li>
              <li className="flex gap-3">
                <Phone size={16} /> +91 7706862269
              </li>
              <li className="flex gap-3">
                <MapPin size={16} />  Gorakhpur Road, Industrial Area, Deoria - 274001, Uttar Pradesh, India
              </li>
            </ul>
          </div>
        </div>


      </div>
      {/* ================= COPYRIGHT ================= */}
      <div className="border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-500">
          © 2026 Chemicals & Allied Products. All Rights Reserved.
          <span className="block mt-1 text-red-500">
            Website Designed by Recreators design and media pvt. ltd.
          </span>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-4">

        {/* CALL BUTTON */}
        <a
          href="tel:+91  7706862269"
          aria-label="Call Us"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full 
     bg-[#1b3163] shadow-[0_12px_30px_rgba(27,49,99,0.35)]
     transition-all duration-300 hover:scale-110"
        >
          <span className="absolute inset-0 rounded-full animate-ping bg-[#1b3163]/30"></span>
          <img
            src="https://img.icons8.com/ios-filled/50/ffffff/phone.png"
            alt="call"
            className="relative w-5 h-5"
          />
        </a>

        {/* WHATSAPP BUTTON */}
        <a
          href="https://wa.me/7706862269?text=Hello%20Insight%20Integrators,%20I%20would%20like%20to%20discuss%20compliance%20advisory."
          aria-label="WhatsApp"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full 
     bg-[#25d366] shadow-[0_12px_30px_rgba(37,211,102,0.35)]
     transition-all duration-300 hover:scale-110"
        >
          <span className="absolute inset-0 rounded-full animate-ping bg-[#25d366]/30"></span>
          <img
            src="https://img.icons8.com/ios-filled/50/ffffff/whatsapp--v1.png"
            alt="whatsapp"
            className="relative w-5 h-5"
          />
        </a>

      </div>
    </footer>
  );
}

