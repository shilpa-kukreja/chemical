// "use client";

// import { useParams } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import { products } from "@/public/assets";
// import { useState } from "react";

// // Swiper
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Thumbs } from "swiper/modules";

// // Swiper styles
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/thumbs";
// import EnquiryModal from "@/app/components/EnquiryModal";

// export default function ProductDetailPage() {
//     const { slug } = useParams();
//     const [openEnquiry, setOpenEnquiry] = useState(false);

//     const product = products.find(
//         (p) => p.slug.replace("/", "") === slug
//     );

//     const [thumbsSwiper, setThumbsSwiper] = useState(null);

//     if (!product) {
//         return (
//             <div className="py-20 text-center text-gray-500">
//                 Product not found
//             </div>
//         );
//     }

//     // Related products
//     const relatedProducts = products.filter(
//         (p) =>
//             p.id !== product.id &&
//             p.category.some((cat) => product.category.includes(cat))
//     );

//     return (
//         <section className="bg-gray-50 py-12 min-h-screen">
//             <div className="max-w-7xl mx-auto px-4">

//                 {/* ================= PRODUCT DETAILS ================= */}
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-8 rounded-md shadow">

//                     {/* LEFT: SWIPER GALLERY */}
//                     <div>
//                         {/* Main Slider */}
//                         <Swiper
//                             spaceBetween={10}
//                             navigation
//                             thumbs={{ swiper: thumbsSwiper }}
//                             modules={[Navigation, Thumbs]}
//                             className="rounded-xl bg-gray-100 mb-4"
//                         >
//                             {product.galleryImg.map((img, index) => (
//                                 <SwiperSlide key={index}>
//                                     <div className="h-[420px] flex items-center justify-center">
//                                         <Image
//                                             src={img}
//                                             alt={product.name}
//                                             width={420}
//                                             height={420}
//                                             className="object-contain"
//                                         />
//                                     </div>
//                                 </SwiperSlide>
//                             ))}
//                         </Swiper>

//                         {/* Thumbnails */}
//                         <Swiper
//                             onSwiper={setThumbsSwiper}
//                             spaceBetween={12}
//                             slidesPerView={4}
//                             watchSlidesProgress
//                             modules={[Thumbs]}
//                             className="mt-3"
//                         >
//                             {product.galleryImg.map((img, index) => (
//                                 <SwiperSlide key={index}>
//                                     <div className="border border-gray-400 rounded-lg p-2 bg-gray-100 cursor-pointer hover:border-red-500 transition">
//                                         <img
//                                             src={img}
//                                             alt="thumbnail"

//                                             className="object-contain w-full h-20"
//                                         />
//                                     </div>
//                                 </SwiperSlide>
//                             ))}
//                         </Swiper>
//                     </div>

//                     {/* RIGHT: PRODUCT INFO */}
//                     <div>
//                         <h1 className="text-3xl font-bold text-gray-900 mb-3">
//                             {product.name}
//                         </h1>

//                         <p className="text-gray-600 mb-5">
//                             {product.shortDescription}
//                         </p>

//                         <div className="border-t border-gray-400 border-b py-4 mb-6 space-y-2">
//                             <p className="text-lg font-semibold">
//                                 Price:{" "}
//                                 <span className="text-red-600">{product.price}</span>
//                             </p>
//                             <p className="text-gray-700">
//                                 Minimum Order Quantity:{" "}
//                                 <span className="font-medium">
//                                     {product.MinimumOrderQuantity}
//                                 </span>
//                             </p>
//                         </div>

//                         <p className="text-gray-600 leading-relaxed mb-8">
//                             {product.description}
//                         </p>

//                         {/* CTA */}
//                         <div className="flex flex-wrap gap-4">
//                             <button
//                                 onClick={() => setOpenEnquiry(true)}
//                                 className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
//                             >
//                                 Get Best Quote
//                             </button>


//                             <a
//                                 href={`https://wa.me/91XXXXXXXXXX?text=I am interested in ${product.name}`}
//                                 target="_blank"
//                                 className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition"
//                             >
//                                 Enquiry on WhatsApp
//                             </a>
//                         </div>
//                     </div>
//                 </div>

//                 {/* ================= RELATED PRODUCTS ================= */}
//                 {relatedProducts.length > 0 && (
//                     <div className="mt-20">
//                         <h2 className="text-2xl font-bold text-gray-900 mb-8">
//                             Related Products
//                         </h2>

//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//                             {relatedProducts.map((item) => (
//                                 <ProductCard key={item.id} product={item} />
//                             ))}
//                         </div>
//                     </div>
//                 )}

//             </div>
//             <EnquiryModal
//                 isOpen={openEnquiry}
//                 onClose={() => setOpenEnquiry(false)}
//                 productName={product.name}
//             />

//         </section>
//     );
// }

// /* ================================================= */
// /* =============== PRODUCT CARD ==================== */
// /* ================================================= */

// function ProductCard({ product }) {
//      const [openEnquiry, setOpenEnquiry] = useState(false);
//     return (
//         <div className="group bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">

//             <Link href={`/product/${product.slug.replace("/", "")}`}>
//                 <div className="relative bg-gray-100 h-56 flex items-center justify-center">
//                     <span className="absolute top-3 left-3 bg-cyan-600 text-white text-xs px-3 py-1 rounded-md">
//                         New
//                     </span>

//                     <Image
//                         src={product.thumbImg}
//                         alt={product.name}
//                         width={200}
//                         height={240}
//                         className="object-contain  transition"
//                     />
//                 </div>
//             </Link>

//             <div className="p-5">
//                 <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">
//                     {product.name}
//                 </h3>

//                 <p className="text-xs text-gray-500 mb-3 line-clamp-2">
//                     {product.shortDescription}
//                 </p>

//                 <p className="text-sm font-semibold text-red-600 mb-4">
//                     {product.price}
//                 </p>

//                 <div className="flex gap-3">
//                     <button
//                         onClick={() => setOpenEnquiry(true)}
//                         className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-lg transition"
//                     >
//                         Get Quote
//                     </button>

//                     <Link
//                         href={`/product/${product.slug.replace("/", "")}`}
//                         className="flex-1 text-center bg-black hover:bg-gray-800 text-white text-sm py-2 rounded-lg transition"
//                     >
//                         Enquiry
//                     </Link>
//                 </div>
//             </div>
//             <EnquiryModal
//                 isOpen={openEnquiry}
//                 onClose={() => setOpenEnquiry(false)}
//                 productName={product.name}
//             />
//         </div>
//     );
// }


"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import EnquiryModal from "@/app/components/EnquiryModal";

export default function ProductDetailPage() {
    const { slug } = useParams();
    const [openEnquiry, setOpenEnquiry] = useState(false);
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://chemical-backend-6oix.onrender.com";

    // Fetch product by slug
    useEffect(() => {
        if (slug) {
            fetchProduct();
        }
    }, [slug]);

    const fetchProduct = async () => {
        try {
            setLoading(true);

            const res = await axios.get(
                `${API_BASE_URL}/api/products/${slug}`
            );

            console.log("Single Product:", res.data);

            // 🔥 FIX HERE
            const productData = res.data.data || res.data.product || res.data;

            setProduct(productData);

            if (productData.category) {
                fetchRelatedProducts(productData.category, productData._id);
            }

        } catch (error) {
            console.error("Error fetching product:", error);
        } finally {
            setLoading(false);
        }
    };


    // Fetch related products based on category
    const fetchRelatedProducts = async (categories, currentProductId) => {
        try {
            const categoryIds = categories
                .map((cat) => cat._id || cat)
                .join(",");

            const res = await axios.get(
                `${API_BASE_URL}/api/products?category=${categoryIds}&limit=4`
            );

            const productsArray =
                res.data.data || res.data.products || [];

            const filtered = productsArray.filter(
                (p) => p._id !== currentProductId
            );

            setRelatedProducts(filtered.slice(0, 4));

        } catch (error) {
            console.error("Error fetching related products:", error);
        }
    };


    const handleOpenEnquiry = (productName) => {
        setSelectedProduct(productName);
        setOpenEnquiry(true);
    };

    if (loading) {
        return (
            <div className="py-20 text-center text-gray-600">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mb-4"></div>
                <p>Loading product details...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="py-20 text-center text-gray-500">
                Product not found
            </div>
        );
    }

    // Get gallery images - handle both galleryImg and images field names
    const galleryImages = product.galleryImg || product.images || [];

    const allImages = [
        product.thumbImg,   // first show thumb
        ...galleryImages
    ].filter(Boolean);

    return (
        <section className=" py-12 min-h-screen">
            <div className="max-w-7xl mx-auto px-4">

                {/* ================= BREADCRUMB ================= */}
                <div className="mb-6 text-sm">
                    <Link href="/" className="text-gray-500 hover:text-red-600">
                        Home
                    </Link>
                    <span className="mx-2 text-gray-400">/</span>
                    <Link href="/categories" className="text-gray-500 hover:text-red-600">
                        Categories
                    </Link>
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="text-gray-900 font-medium">{product.name}</span>
                </div>

                {/* ================= PRODUCT DETAILS ================= */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white sm:p-8 p-2 rounded-md shadow">

                    {/* LEFT: SWIPER GALLERY */}
                    <div>
  {allImages.length > 0 ? (
    <>
      {/* MAIN SLIDER */}
      <Swiper
        spaceBetween={10}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Thumbs]}
        className="rounded-xl bg-gray-100 mb-4"
      >
        {allImages.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="h-[420px] flex items-center justify-center">
              <img
                src={`${API_BASE_URL}${img}`}
                alt={product.name}
                className="object-contain h-full w-full"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* THUMBNAILS */}
      {allImages.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={12}
          slidesPerView={4}
          watchSlidesProgress
          modules={[Thumbs]}
          className="mt-3"
        >
          {allImages.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="border border-gray-400 rounded-lg p-2 bg-gray-100 cursor-pointer hover:border-red-500">
                <img
                  src={`${API_BASE_URL}${img}`}
                  alt="thumb"
                  className="object-contain w-full h-20"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  ) : (
    <div className="h-[420px] flex items-center justify-center bg-gray-100 rounded-xl">
      <img
        src="/placeholder-image.jpg"
        alt="no image"
        className="object-contain h-full w-full"
      />
    </div>
  )}
</div>

                    {/* RIGHT: PRODUCT INFO */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-3">
                            {product.name}
                        </h1>

                        {/* {product.shortDescription && (
                            <div
                                className="text-gray-600 mb-5"
                                dangerouslySetInnerHTML={{
                                    __html: product.shortDescription
                                }}
                            />
                        )} */}

                        <div className="border-t border-gray-400 border-b py-4 mb-6 space-y-2">
                            <p className="text-lg font-semibold">
                                Price:{" "}
                                <span className="text-red-600">{product.price}</span>
                            </p>
                            {product.minimumOrderQuantity && (
                                <p className="text-gray-700">
                                    Minimum Order Quantity:{" "}
                                    <span className="font-medium">
                                        {product.minimumOrderQuantity} Units
                                    </span>
                                </p>
                            )}
                        </div>

                        {product.description && (
                            <div
                                className="text-gray-600 leading-relaxed mb-8"
                                dangerouslySetInnerHTML={{
                                    __html: product.description
                                }}
                            />
                        )}

                        {/* CTA */}
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => handleOpenEnquiry(product.name)}
                                className="px-6 py-3 bg-[#1b3163] hover:bg-[#1b3163] text-white rounded-lg font-medium transition"
                            >
                                Get Best Quote
                            </button>

                            <a
                                href={`https://wa.me/8046047240?text=I am interested in ${product.name} - ${product.price}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition"
                            >
                                Enquiry on WhatsApp
                            </a>
                        </div>
                    </div>
                </div>

                {/* ================= RELATED PRODUCTS ================= */}
                {relatedProducts.length > 0 && (
                    <div className="mt-20">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">
                            Related Products
                        </h2>

                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 sm:gap-8 gap-2">
                            {relatedProducts.map((item) => (
                                <ProductCard
                                    key={item._id}
                                    product={item}
                                    onEnquiryClick={handleOpenEnquiry}
                                    API_BASE_URL={API_BASE_URL}
                                />
                            ))}
                        </div>
                    </div>
                )}

            </div>

            {/* Single modal for entire page */}
            <EnquiryModal
                isOpen={openEnquiry}
                onClose={() => {
                    setOpenEnquiry(false);
                    setSelectedProduct(null);
                }}
                productName={selectedProduct}
            />
        </section>
    );
}

/* ================================================= */
/* =============== PRODUCT CARD ==================== */
/* ================================================= */

function ProductCard({ product, onEnquiryClick, API_BASE_URL }) {
    // Get the correct image path
    const productImage = product.thumbImg || product.images?.[0] || '';

    // Strip HTML from short description
    const shortDescription = product.shortDescription
        ? product.shortDescription.replace(/<[^>]*>/g, '').substring(0, 80) + '...'
        : '';

    return (
        <div className="group bg-white border border-gray-200 rounded-md overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
            <Link href={`/product/${product.slug}`}>
                <div className="relative bg-gray-100 h-56 py-3 flex items-center justify-center">
                    {/* <span className="absolute top-3 left-3 bg-cyan-600 text-white text-xs px-3 py-1 rounded-md">
                        New
                    </span> */}

                    <img
                        src={`${API_BASE_URL}${productImage}`}
                        alt={product.name}

                        className="object-contain transition  h-full w-full overflow-hidden"
                        onError={(e) => {
                            e.target.src = '/placeholder-image.jpg'; // Add a placeholder image
                        }}
                    />
                </div>
            </Link>

            <div className="p-5">
                <h3 className="text-sm font-semibold truncate text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                </h3>

                {/* <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                    {shortDescription}
                </p> */}

                <p className="text-sm font-semibold text-red-600 mb-4">
                    {product.price}
                </p>

                <div className="flex gap-3">
                    <button
                        onClick={() => onEnquiryClick(product.name)}
                        className="flex-1 text-center bg-[#1b3163] hover:bg-[#1b3163] text-white text-sm py-2 rounded-lg transition"
                    >
                        Get Quote
                    </button>

                    <Link
                        href={`/product/${product.slug}`}
                        className="sm:flex-1 text-center hidden  bg-black hover:bg-gray-800 text-white text-sm py-2 rounded-lg transition"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}