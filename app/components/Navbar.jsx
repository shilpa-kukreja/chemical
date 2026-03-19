// "use client";

// import Link from "next/link";
// import { useState, useEffect, useRef } from "react";
// import {
//   ChevronDown,
//   Phone,
//   Mail,
//   Menu,
//   X,
//   PenTool,
//   Quote,
// } from "lucide-react";
// import { categories } from "@/public/assets";



// export default function Navbar() {
//   const [openDropdown, setOpenDropdown] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const dropdownRef = useRef(null);

//   /* Scroll shadow */
//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   /* Close dropdown on outside click */
//   useEffect(() => {
//     const handler = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setOpenDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   /* Disable scroll on mobile menu */
//   useEffect(() => {
//     document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
//     return () => (document.body.style.overflow = "unset");
//   }, [isMenuOpen]);

//   return (
//     <header className="sticky top-0 z-50">
//       {/* ================= TOP BAR ================= */}
//       <div className="bg-gray-900 text-white text-sm">
//         <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap justify-between items-center gap-2">
//           <div className="flex items-center gap-6">
//             <a href="mailto:info@chemicalwriting.com" className="flex gap-2">
//               <Mail size={14} /> info@chemicalwriting.com
//             </a>
//             <a href="tel:+919904031137" className="flex gap-2">
//               <Phone size={14} /> +91 99040 31137
//             </a>
//           </div>
//           <Link
//             href="/get-quote"
//             className="bg-red-600 hover:bg-red-700 px-4 py-1.5 rounded text-white font-semibold flex gap-2 items-center"
//           >
//             <Quote size={14} /> Get Quote
//           </Link>
//         </div>
//       </div>

//       {/* ================= MAIN NAV ================= */}
//       <nav
//         className={`bg-white transition ${scrolled ? "shadow-lg" : "shadow"
//           }`}
//       >
//         <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
//           {/* LOGO */}
//           <Link href="/" className="font-bold text-xl">
//             Chemicals
//             <span className="block text-xs text-gray-500">
//               & Allied Products
//             </span>
//           </Link>

//           {/* ========== DESKTOP MENU ========== */}
//           <ul className="hidden lg:flex items-center gap-6 font-medium">
//             <li>
//               <Link href="/" className="hover:text-red-600">
//                 Home
//               </Link>
//             </li>

//             {/* PRODUCTS DROPDOWN */}
//             <li className="relative" ref={dropdownRef}>
//               <button
//                 onClick={() => setOpenDropdown(!openDropdown)}
//                 className="flex items-center gap-1 hover:text-red-600"
//               >
//                 <PenTool size={16} /> Our Products
//                 <ChevronDown
//                   size={14}
//                   className={`transition ${openDropdown ? "rotate-180" : ""
//                     }`}
//                 />
//               </button>

//               {openDropdown && (
//                 <div className="absolute left-0 top-full mt-3 w-[340px] rounded-md bg-white/95 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-gray-200 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">

//                   {/* ===== Header ===== */}
//                   <div className="px-6 py-5 bg-gradient-to-r from-red-50 to-white border-b">
//                     <h3 className="text-sm font-semibold text-gray-900 tracking-wide">
//                       Product Categories
//                     </h3>
//                     <p className="text-xs text-gray-600 mt-1">
//                       Explore our chemical solutions
//                     </p>
//                   </div>

//                   {/* ===== Category List ===== */}
//                   <div className="p-4 space-y-1">
//                     {categories.map((cat) => (
//                       <Link
//                         key={cat.id}
//                         href={`/category/${cat.slug}`}

//                         onClick={() => setOpenDropdown(false)}
//                         className="group flex items-start gap-3 rounded-md px-4 py-3 transition-all duration-200 hover:bg-red-50 hover:shadow-sm"
//                       >
//                         {/* Optional Icon */}
//                         <div className="mt-1 h-2 w-2 rounded-full bg-red-500 opacity-0 group-hover:opacity-100 transition" />

//                         <div>

//                           <h4 className="text-sm font-medium text-gray-800 group-hover:text-red-600">
//                             {cat.name}
//                           </h4>
//                           {cat.desc && (
//                             <p className="text-xs text-gray-500 mt-0.5">
//                               {cat.desc}
//                             </p>
//                           )}
//                         </div>
//                       </Link>
//                     ))}
//                   </div>

//                   {/* ===== Footer ===== */}
//                   <div className="bg-gray-50 border-t px-6 py-4 text-center">
//                     <Link
//                       href="/agricultural-herbicides-insecticide"
//                       onClick={() => setOpenDropdown(false)}
//                       className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700"
//                     >
//                       View All Products
//                       <span className="text-lg">→</span>
//                     </Link>
//                   </div>
//                 </div>
//               )}

//             </li>

//             <li>
//               <Link href="/about-us" className="hover:text-red-600">
//                 Company Profile
//               </Link>
//             </li>

//             <li>
//               <Link href="/contact-us" className="hover:text-red-600">
//                 Contact Us
//               </Link>
//             </li>
//           </ul>

//           {/* ========== MOBILE BUTTON ========== */}
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="lg:hidden"
//           >
//             {isMenuOpen ? <X /> : <Menu />}
//           </button>
//         </div>

//         {/* ========== MOBILE MENU ========== */}
//         {isMenuOpen && (
//           <div className="lg:hidden bg-white border-t">
//             <div className="px-4 py-4 space-y-2">
//               <Link href="/" onClick={() => setIsMenuOpen(false)}>
//                 Home
//               </Link>

//               <div>
//                 <p className="font-semibold flex gap-2 items-center">
//                   <PenTool size={16} /> Our Products
//                 </p>

//                 <div className="mt-2 space-y-2">
//                   {categories.map((cat) => (
//                     <Link
//                       key={cat.id}
//                       href={cat.slug}
//                       onClick={() => setIsMenuOpen(false)}
//                       className="flex gap-3 items-center p-2 rounded hover:bg-red-50"
//                     >
//                       <img
//                         src={cat.image}
//                         className="w-10 h-10 rounded object-cover"
//                         alt={cat.name}
//                       />
//                       <span className="text-sm">{cat.name}</span>
//                     </Link>
//                   ))}
//                 </div>
//               </div>

//               <Link
//                 href="/contact-us"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Contact Us
//               </Link>
//             </div>
//           </div>
//         )}
//       </nav>
//     </header>
//   );
// }

// "use client";

// import Link from "next/link";
// import { useState, useEffect, useRef } from "react";
// import {
//   ChevronDown,
//   Phone,
//   Mail,
//   Menu,
//   X,
//   PenTool,
//   Quote,
//   Loader2
// } from "lucide-react";
// import axios from "axios";
// import EnquiryModal from "./EnquiryModals";
// import { usePathname, useSearchParams } from "next/navigation";



// export default function Navbar() {
//   const [openDropdown, setOpenDropdown] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
//   const [products, setProducts] = useState([]);
//   const dropdownRef = useRef(null);


//   const pathname = usePathname();
//   const isHome = pathname === "/";

//   // Fetch categories from API
//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/categories/admin/all");
//       setCategories(response.data.data);
//     } catch (error) {
//       console.error("Failed to fetch categories:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/products");
//       setProducts(res.data.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//     fetchProducts();
//   }, []);

//   /* Scroll shadow */
//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   /* Close dropdown on outside click */
//   useEffect(() => {
//     const handler = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setOpenDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   /* Disable scroll on mobile menu */
//   useEffect(() => {
//     document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
//     return () => (document.body.style.overflow = "unset");
//   }, [isMenuOpen]);

//   return (
//     <header
//       className={`w-full z-50 transition-all duration-300 ${isHome
//           ? "absolute top-0 bg-transparent shadow-none"
//           : "sticky top-0 bg-white shadow-md"
//         }`}
//     >

//       {/* ================= TOP BAR ================= */}
//       <div className=" text-white text-sm">
//         <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap justify-between items-center gap-2">
//           <div className="flex items-center gap-6">
//             <a href="mailto:info@chemicalwriting.com" className="flex gap-2">
//               <Mail size={14} /> info@chemicalwriting.com
//             </a>
//             <a href="tel:+919904031137" className="flex gap-2">
//               <Phone size={14} /> +91 08046047240
//             </a>
//           </div>
//           <button
//             onClick={() => setIsEnquiryOpen(true)}
//             className="bg-[#1e8a25] hidden  hover:bg-green-700 px-4 py-1.5 rounded text-white sm:flex font-semibold gap-2 items-center"
//           >
//             <Quote size={14} /> Get Quote
//           </button>

//         </div>
//       </div>

//       {/* ================= MAIN NAV ================= */}
//       <nav
//         className={`transition ${scrolled ? "shadow-lg" : "shadow"
//           }`}
//       >
//         <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             {/* LOGO */}
//             <Link href="/" className="font-bold text-xl">
//               <img src="/image/chemical-logo.jpg" alt="logo" className="h-12" /></Link>
//             <Link href="/" className="font-bold text-xl">
//               Chemicals
//               <span className="block text-xs text-gray-500">
//                 & Allied Products
//               </span>
//             </Link>
//           </div>

//           {/* ========== DESKTOP MENU ========== */}
//           <ul className="hidden lg:flex items-center gap-6 font-medium">
//             <li>
//               <Link href="/" className="hover:text-red-600">
//                 Home
//               </Link>
//             </li>

//             {/* PRODUCTS DROPDOWN */}
//             <li className="relative" ref={dropdownRef}>
//               <button
//                 onClick={() => setOpenDropdown(!openDropdown)}
//                 className="flex items-center gap-1 hover:text-red-600"
//               >
//                 <PenTool size={16} /> Our Products
//                 <ChevronDown
//                   size={14}
//                   className={`transition ${openDropdown ? "rotate-180" : ""
//                     }`}
//                 />
//               </button>

//               {openDropdown && (
//                 <div className="absolute left-0 top-full mt-3 w-[340px] rounded-md bg-white/95 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-gray-200 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">

//                   {/* ===== Header ===== */}
//                   <div className="px-6 py-5 bg-gradient-to-r from-red-50 to-white border-b">
//                     <h3 className="text-sm font-semibold text-gray-900 tracking-wide">
//                       Product Categories
//                     </h3>
//                     <p className="text-xs text-gray-600 mt-1">
//                       Explore our chemical solutions
//                     </p>
//                   </div>

//                   {/* ===== Category List ===== */}
//                   <div className="p-4 space-y-1">
//                     {loading ? (
//                       <div className="flex items-center justify-center py-4">
//                         <Loader2 className="animate-spin text-red-600" size={20} />
//                         <span className="ml-2 text-sm">Loading categories...</span>
//                       </div>
//                     ) : categories.length > 0 ? (
//                       categories.map((cat) => (
//                         <Link
//                           key={cat._id}
//                           href={`/category/${cat.slug}`}
//                           onClick={() => setOpenDropdown(false)}
//                           className="group flex items-start gap-3 rounded-md px-4 py-3 transition-all duration-200 hover:bg-red-50 hover:shadow-sm"
//                         >
//                           <div className="mt-1 h-2 w-2 rounded-full bg-[#1e8a25] opacity-0 group-hover:opacity-100 transition" />
//                           <div>
//                             <h4 className="text-sm font-medium text-gray-800 group-hover:text-green-700">
//                               {cat.name}
//                             </h4>
//                             {/* {cat.description && (
//                               <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
//                                 {cat.description}
//                               </p>
//                             )} */}
//                           </div>
//                         </Link>
//                       ))
//                     ) : (
//                       <div className="text-center py-4">
//                         <p className="text-sm text-gray-500">No categories found</p>
//                       </div>
//                     )}
//                   </div>

//                   {/* ===== Footer ===== */}
//                   <div className="bg-gray-50 border-t px-6 py-4 text-center">
//                     <Link
//                       href="/agricultural-herbicides-insecticide"
//                       onClick={() => setOpenDropdown(false)}
//                       className="inline-flex items-center gap-2 text-sm font-semibold text-[#1e8a25] hover:text-green-700"
//                     >
//                       View All Products
//                       <span className="text-lg">→</span>
//                     </Link>
//                   </div>
//                 </div>
//               )}

//             </li>

//             <li>
//               <Link href="/about-us" className="hover:text-red-600">
//                 Company Profile
//               </Link>
//             </li>

//             <li>
//               <Link href="/contact-us" className="hover:text-red-600">
//                 Contact Us
//               </Link>
//             </li>
//           </ul>

//           {/* ========== MOBILE BUTTON ========== */}
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="lg:hidden"
//           >
//             {isMenuOpen ? <X /> : <Menu />}
//           </button>
//         </div>

//         {/* ========== MOBILE MENU ========== */}
//         {isMenuOpen && (
//           <div className="lg:hidden bg-white border-t">
//             <div className="px-4 py-4 space-y-2">
//               <Link href="/" onClick={() => setIsMenuOpen(false)}>
//                 Home
//               </Link>

//               <div>
//                 <p className="font-semibold flex gap-2 items-center">
//                   <PenTool size={16} /> Our Products
//                 </p>

//                 <div className="mt-2 space-y-2">
//                   {loading ? (
//                     <div className="flex items-center justify-center py-4">
//                       <Loader2 className="animate-spin text-red-600" size={20} />
//                       <span className="ml-2 text-sm">Loading...</span>
//                     </div>
//                   ) : categories.length > 0 ? (
//                     categories.map((cat) => (
//                       <Link
//                         key={cat._id}
//                         href={`/category/${cat.slug}`}
//                         onClick={() => setIsMenuOpen(false)}
//                         className="flex gap-3 items-center p-2 rounded hover:bg-red-50"
//                       >
//                         <img
//                           src={cat.image || "/placeholder.jpg"}
//                           className="w-10 h-10 rounded object-cover"
//                           alt={cat.name}
//                         />
//                         <span className="text-sm">{cat.name}</span>
//                       </Link>
//                     ))
//                   ) : (
//                     <p className="text-sm text-gray-500 p-2">No categories</p>
//                   )}
//                 </div>
//               </div>

//               <Link
//                 href="/contact-us"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Contact Us
//               </Link>
//             </div>
//           </div>
//         )}
//       </nav>
//       {/* ===== MOBILE DRAWER ===== */}
//       <div
//         className={`fixed inset-0 z-[999] transition-all duration-300 ${isMenuOpen ? "visible" : "invisible"
//           }`}
//       >
//         {/* Overlay */}
//         <div
//           onClick={() => setIsMenuOpen(false)}
//           className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0"
//             }`}
//         />

//         {/* Drawer */}
//         <div
//           className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"
//             }`}
//         >
//           {/* Header */}
//           <div className="flex items-center justify-between px-6 py-5 border-b">
//             <h2 className="font-bold text-lg">Menu</h2>
//             <button onClick={() => setIsMenuOpen(false)}>
//               <X />
//             </button>
//           </div>

//           {/* Links */}
//           <div className="p-6 space-y-4 text-gray-700">

//             <Link href="/" onClick={() => setIsMenuOpen(false)} className="block hover:text-red-600">
//               Home
//             </Link>

//             <Link href="/about-us" onClick={() => setIsMenuOpen(false)} className="block hover:text-red-600">
//               Company Profile
//             </Link>

//             <Link href="/contact-us" onClick={() => setIsMenuOpen(false)} className="block hover:text-red-600">
//               Contact Us
//             </Link>

//             {/* Divider */}
//             <div className="border-t my-4" />

//             {/* Products */}
//             <p className="font-semibold text-gray-900">Our Products</p>

//             <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
//               {loading ? (
//                 <div className="flex items-center gap-2 text-sm">
//                   <Loader2 className="animate-spin" size={16} />
//                   Loading...
//                 </div>
//               ) : (
//                 categories.map((cat) => (
//                   <Link
//                     key={cat._id}
//                     href={`/category/${cat.slug}`}
//                     onClick={() => setIsMenuOpen(false)}
//                     className="flex items-center gap-3 p-2 rounded-lg hover:bg-red-50 transition"
//                   >
//                     <img
//                       src={`http://localhost:5000${cat.image || "/placeholder.jpg"}`}
//                       className="w-10 h-10 object-cover rounded"
//                       alt={cat.name}
//                     />
//                     <span className="text-sm">{cat.name}</span>
//                   </Link>
//                 ))
//               )}
//             </div>
//             <Link
//               href="/agricultural-herbicides-insecticide"
//               onClick={() => setIsMenuOpen(false)}
//               className="inline-flex items-center gap-2 text-sm font-semibold text-[#1e8a25] hover:text-green-700"
//             >
//               View All Products
//               <span className="text-lg">→</span>
//             </Link>

//             {/* CTA */}
//             <button
//               onClick={() => {
//                 setIsMenuOpen(false);
//                 setIsEnquiryOpen(true);
//               }}
//               className="w-full mt-6 bg-[#1e8a25] hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
//             >
//               Get Quote
//             </button>

//           </div>
//         </div>
//       </div>


//       <EnquiryModal
//         isOpen={isEnquiryOpen}
//         onClose={() => setIsEnquiryOpen(false)}
//         products={products}
//       />

//     </header>
//   );
// }


"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  Phone,
  Mail,
  Menu,
  X,
  PenTool,
  Quote,
  Loader2,
} from "lucide-react";
import axios from "axios";

import { usePathname } from "next/navigation";
import EnquirySideModal from "./EnquiryModals";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://chemical-backend-6oix.onrender.com";

  const dropdownRef = useRef(null);

  /* ================= FETCH DATA ================= */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/categories/admin/all`),
          axios.get(`${API_BASE_URL}/api/products`),
        ]);
      const sortedCategories = (catRes.data.data || []).reverse();
      setCategories(sortedCategories);
       
        setProducts(prodRes.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ================= SCROLL EFFECT ================= */

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= OUTSIDE CLICK ================= */

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ================= BODY SCROLL LOCK ================= */

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  /* ================= NAVBAR STYLE ================= */

  const navStyle = isHome
    ? scrolled
      ? "bg-white/90 backdrop-blur-md shadow-md sticky top-0"
      : "absolute top-0 bg-transparent"
    : "bg-white shadow-md sticky top-0";

  const linkStyle = (path) =>
    `transition hover:text-red-600 ${pathname === path ? "text-red-600 font-semibold" : ""
    }`;

  return (
    <>
      <header className={`w-full z-50 transition-all duration-300 ${navStyle}`}>
        {/* ================= TOP BAR ================= */}
        <div
          className={`text-sm ${isHome && !scrolled ? "text-gray-600" : "bg-gray-900 text-white"
            }`}
        >
          {/* <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
            <div className="flex gap-6">
              <a href="mailto:info@chemicalwriting.com" className="flex gap-2">
                <Mail size={14} /> info@chemicalwriting.com
              </a>
              <a href="tel:+918046047240" className="flex gap-2">
                <Phone size={14} /> +91 08046047240
              </a>
            </div>

            <button
              onClick={() => setIsEnquiryOpen(true)}
              className="hidden sm:flex items-center gap-2 bg-[#1e8a25] px-4 py-1.5 rounded font-semibold hover:bg-green-700"
            >
              <Quote size={14} /> Get Quote
            </button>
          </div> */}
        </div>

        {/* ================= MAIN NAV ================= */}
        <nav>
          <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
            {/* LOGO */}
            <Link href="/" className="flex items-center gap-2">
              <img src="/image/cheimicallogo.jpg" className="h-12" />
              <div>
                {/* <h1 className="font-bold text-lg leading-4">
                  Chemicals
                  <span className="block text-xs text-gray-500">
                    & Allied Products
                  </span>
                </h1> */}
              </div>
            </Link>

            {/* DESKTOP MENU */}
            <ul className="hidden lg:flex items-center gap-8 font-medium">
              <li>
                <Link href="/" className={linkStyle("/")}>
                  Home
                </Link>
              </li>

              {/* PRODUCTS */}
              <li className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setOpenDropdown(!openDropdown)}
                  className="flex items-center gap-1 hover:text-red-600"
                >
                   Our Products
                  <ChevronDown
                    size={14}
                    className={`transition ${openDropdown ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {openDropdown && (
                  <div className="absolute left-0 top-full mt-3 w-[340px] rounded-md bg-white/95 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-gray-200 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                    {/* ===== Header ===== */}
                    <div className="px-6 py-5 bg-gradient-to-r from-red-50 to-white border-b">
                      <h3 className="text-sm font-semibold text-gray-900 tracking-wide">
                        Product Categories
                      </h3>
                      <p className="text-xs text-gray-600 mt-1">
                        Explore our chemical solutions
                      </p>
                    </div>

                    {/* ===== Category List ===== */}
                    <div className="p-4 space-y-1">
                      {loading ? (
                        <div className="flex items-center justify-center py-4">
                          <Loader2 className="animate-spin text-red-600" size={20} />
                          <span className="ml-2 text-sm">Loading categories...</span>
                        </div>
                      ) : categories.length > 0 ? (
                        categories.slice(0, 6).map((cat) => (
                          <Link
                            key={cat._id}
                            href={`/category/${cat.slug}`}
                            onClick={() => setOpenDropdown(false)}
                            className="group flex items-start gap-3 rounded-md px-4 py-3 transition-all duration-200 hover:bg-red-50 hover:shadow-sm"
                          >
                            <div className="mt-1 h-2 w-2 rounded-full bg-[#1e8a25] opacity-0 group-hover:opacity-100 transition" />

                            <div>
                              <h4 className="text-sm font-medium text-gray-800 group-hover:text-green-700">
                                {cat.name}
                              </h4>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-sm text-gray-500">No categories found</p>
                        </div>
                      )}
                    </div>


                    {/* ===== Footer ===== */}
                    <div className="bg-gray-50 border-t px-6 py-4 text-center">
                      <Link
                        href="/agricultural-herbicides-insecticide"
                        onClick={() => setOpenDropdown(false)}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#1e8a25] hover:text-green-700"
                      >
                        View All Products
                        <span className="text-lg">→</span>
                      </Link>
                    </div>
                  </div>
                )}
              </li>


              <li>
                <Link href="/about-us" className={linkStyle("/about-us")}>
                  Company Profile
                </Link>
              </li>

              <li>
                <Link href="/contact-us" className={linkStyle("/contact-us")}>
                  Contact Us
                </Link>
              </li>
            </ul>

            {/* MOBILE BUTTON */}
            <button onClick={() => setIsMenuOpen(true)} className="lg:hidden">
              <Menu />
            </button>
          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-[999] transition-all duration-300 ${isMenuOpen ? "visible" : "invisible"
          }`}
      >
        {/* Overlay */}
        <div
          onClick={() => setIsMenuOpen(false)}
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0"
            }`}
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b">
            <h2 className="font-bold text-lg">Menu</h2>
            <button onClick={() => setIsMenuOpen(false)}>
              <X />
            </button>
          </div>

          {/* Links */}
          <div className="p-6 space-y-4 text-gray-700">

            <Link href="/" onClick={() => setIsMenuOpen(false)} className="block hover:text-red-600">
              Home
            </Link>

            <Link href="/about-us" onClick={() => setIsMenuOpen(false)} className="block hover:text-red-600">
              Company Profile
            </Link>

            <Link href="/contact-us" onClick={() => setIsMenuOpen(false)} className="block hover:text-red-600">
              Contact Us
            </Link>

            {/* Divider */}
            <div className="border-t my-4" />

            {/* Products */}
            <p className="font-semibold text-gray-900">Our Products</p>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
              {loading ? (
                <div className="flex items-center gap-2 text-sm">
                  <Loader2 className="animate-spin" size={16} />
                  Loading...
                </div>
              ) : (
                categories.map((cat) => (
                  <Link
                    key={cat._id}
                    href={`/category/${cat.slug}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-red-50 transition"
                  >
                    <img
                      src={`${API_BASE_URL}${cat.image || "/placeholder.jpg"}`}
                      className="w-10 h-10 object-cover rounded"
                      alt={cat.name}
                    />
                    <span className="text-sm">{cat.name}</span>
                  </Link>
                ))
              )}
            </div>
            <Link
              href="/agricultural-herbicides-insecticide"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1e8a25] hover:text-green-700"
            >
              View All Products
              <span className="text-lg">→</span>
            </Link>

            {/* CTA */}
            <button
              onClick={() => {
                setIsMenuOpen(false);
                setIsEnquiryOpen(true);
              }}
              className="w-full mt-6 bg-[#1e8a25] hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
            >
              Get Quote
            </button>

          </div>
        </div>
      </div>


      {/* ENQUIRY MODAL */}
      <EnquirySideModal
        // isOpen={isEnquiryOpen}
        // onClose={() => setIsEnquiryOpen(false)}
        products={products}
      />
    </>
  );
}

