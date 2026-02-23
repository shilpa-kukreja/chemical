// "use client";

// import Image from "next/image";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import EnquiryModal from "./EnquiryModal";
// import Link from "next/link";



// export default function ProductsShowcase() {
//   // const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   // useEffect(() => {
//   //   fetchProducts();
//   // }, []);

//   // const fetchProducts = async () => {
//   //   try {
//   //     const res = await axios.get(
//   //       `http://localhost:5000/api/products?limit=8`
//   //     );

//   //     console.log("Products:", res.data);

//   //     setProducts(res.data || []);
//   //   } catch (error) {
//   //     console.error("Error fetching products:", error);
//   //   }
//   // };


//   //   const fetchProducts = async () => {
//   //   try {
//   //     const res = await axios.get("http://localhost:5000/api/products?limit=8");
//   //     console.log("Products API response:", res.data);
      
//   //     // Handle different response structures
//   //     if (Array.isArray(res.data)) {
//   //       setProducts(res.data);
//   //     } else if (res.data?.data && Array.isArray(res.data.data)) {
//   //       setProducts(res.data.data);
//   //     } else {
//   //       console.error("Unexpected products response format:", res.data);
//   //       setProducts([]);
//   //     }
//   //   } catch (error) {
//   //     console.error("Products error:", error);
//   //     setProducts([]);
//   //   }
//   // };

    

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/categories/admin/all?limit=8");
//        const sortedCategories = (res.data.data || []).reverse();
//       setCategories(sortedCategories);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };


//   const handleOpen = (product) => {
//     setSelectedProduct(product);
//   };

//   const handleClose = () => {
//     setSelectedProduct(null);
//   };

//   return (
//     <section className="sm:py-16 py-8 ">
//       <div className="max-w-7xl mx-auto px-4">

//         {/* Header */}
//         <div className="text-center mb-12">
//           <h2 className="sm:text-4xl text-3xl font-bold text-[#1b3163] mb-3">
//             Agricultural Herbicides & Insecticide
//           </h2>
//           <p className="text-white max-w-2xl mx-auto">
//             Explore our premium agricultural solutions designed for effective
//             crop protection and higher yield.
//           </p>
//         </div>

//         {/* Products Grid */}
//         <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 sm:gap-8 gap-2">
//           {categories.map((product) => (
//             <div
//               key={product._id}
//               className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition duration-300"
//             >
//               {/* Image Section */}
//               <Link href={`/category/${product.slug}`} className="relative bg-gray-100 flex items-center justify-center pt-4 h-64">
//                 {/* <span className="absolute top-3 left-3 bg-cyan-500 text-white text-xs font-semibold px-3 py-1 rounded-md">
//                   New
//                 </span> */}
                
//                 <img
//                   src={`http://localhost:5000${product.image}`}
//                   alt={product.name}
//                   className="object-contain h-full w-full  transition-transform duration-300  overflow-hidden"
//                 />
                
//               </Link>

//               {/* Product Name */}
//               <div className="bg-[#1b3163] text-white text-center px-4 py-3 font-semibold text-sm truncate mx-4 rounded-md mt-4">
//                 {product.name}
//               </div>

//               {/* Buttons */}
//               <div className="flex justify-between gap-3 p-4">
//                 <button
//                   onClick={() => handleOpen(product)}
//                   className="flex-1 bg-[#1e8a25] hover:bg-[#1e8a25] text-white text-sm font-medium py-2 rounded-md transition"
//                 >
//                   Get Quote
//                 </button>

//                 <button className="flex-1 sm:block hidden bg-black hover:bg-gray-800 text-white text-sm font-medium py-2 rounded-md transition">
//                   Chat Now
//                 </button>
//               </div>
//             </div>
//           ))}

         
//         </div>


       
            
//         {/* Modal */}
//         <EnquiryModal
//           isOpen={!!selectedProduct}
//           productName={selectedProduct?.name}
//           onClose={handleClose}
//         />
//       </div>
//       <Link href="/agricultural-herbicides-insecticide" className="text-gray-500 flex items-center justify-center px-6 py-2 text-center bg-[#1b3163] hover:text-gray-700 font-semibold">
//               View All Categories
//             </Link>
          
//     </section>
//   );
// }

"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import EnquiryModal from "./EnquiryModal";
import Link from "next/link";

export default function ProductsShowcase() {
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
   const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://chemical-backend-6oix.onrender.com";

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/categories/admin/all`
      );

      const sortedLimitedCategories = (res.data.data || [])
        .reverse()      // last → first
        .slice(0, 12);  // show only 12

      setCategories(sortedLimitedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleOpen = (product) => setSelectedProduct(product);
  const handleClose = () => setSelectedProduct(null);

  return (
    <section className="sm:py-16 py-8">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="sm:text-4xl text-3xl font-bold text-[#1b3163] mb-3">
            Agricultural Herbicides & Insecticide
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our premium agricultural solutions designed for effective
            crop protection and higher yield.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {categories.map((product) => (
            <div
              key={product._id}
              className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition duration-300"
            >
              {/* Image */}
              <Link
                href={`/category/${product.slug}`}
                className="relative bg-gray-100 flex items-center justify-center pt-4 h-64"
              >
                <img
                  src={`http://localhost:5000${product.image}`}
                  alt={product.name}
                  className="object-contain h-full w-full transition-transform duration-300 hover:scale-105"
                />
              </Link>

              {/* Name */}
              <div className="bg-[#1b3163] text-white text-center px-4 py-3 font-semibold text-sm truncate mx-4 rounded-md mt-4">
                {product.name}
              </div>

              {/* Buttons */}
              <div className="flex justify-between gap-3 p-4">
                <button
                  onClick={() => handleOpen(product)}
                  className="flex-1 bg-[#1e8a25] hover:bg-green-700 text-white text-sm font-medium py-2 rounded-md transition"
                >
                  Get Quote
                </button>

                <button className="flex-1 hidden sm:block bg-black hover:bg-gray-800 text-white text-sm font-medium py-2 rounded-md transition">
                  Chat Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Center Button */}
        <div className="flex justify-center mt-12">
          <Link
            href="/agricultural-herbicides-insecticide"
            className="bg-[#1b3163] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#2a4585] transition"
          >
            View All Categories
          </Link>
        </div>

        {/* Modal */}
        <EnquiryModal
          isOpen={!!selectedProduct}
          productName={selectedProduct?.name}
          onClose={handleClose}
        />
      </div>
    </section>
  );
}
