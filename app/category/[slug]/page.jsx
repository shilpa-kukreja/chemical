// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import axios from "axios";
// import EnquiryModal from "@/app/components/EnquiryModal";

// export default function CategoryProductsPage() {
//   const { slug } = useParams();
//   const router = useRouter();

//   const [category, setCategory] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]); // ✅ Initialize as empty array
//   const [openEnquiry, setOpenEnquiry] = useState(false);

//   useEffect(() => {
//     if (slug) {
//       fetchCategory();
//       fetchCategories();
//       fetchProducts();
//     }
//   }, [slug]);

//   // ✅ Fetch single category by slug
//   const fetchCategory = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/categories/${slug}`
//       );
//       setCategory(res.data.data);
//     } catch (error) {
//       console.error("Category error:", error);
//     }
//   };

//   // ✅ Fetch all categories (for sidebar)
//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/categories/admin/all"
//       );
//       setCategories(res.data.data);
//     } catch (error) {
//       console.error("Categories error:", error);
//     }
//   };

//   // ✅ Fetch all products - FIXED
//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/products");
//       console.log("Products API response:", res.data);
      
//       // Handle different response structures
//       if (Array.isArray(res.data)) {
//         setProducts(res.data);
//       } else if (res.data?.data && Array.isArray(res.data.data)) {
//         setProducts(res.data.data);
//       } else {
//         console.error("Unexpected products response format:", res.data);
//         setProducts([]);
//       }
//     } catch (error) {
//       console.error("Products error:", error);
//       setProducts([]);
//     }
//   };

//   // Only proceed with filtering if products is an array
//   const filteredProducts = Array.isArray(products) 
//     ? products.filter((product) => {
//         if (!product.category || !Array.isArray(product.category)) return false;
        
//         return product.category.some((cat) => {
//           // Handle different possible formats of category data
//           if (typeof cat === 'string') {
//             return cat === category?._id || cat === category?._id.toString();
//           } else if (cat && typeof cat === 'object') {
//             // Handle case where category is an object with _id
//             const catId = cat._id || cat.id;
//             return catId && category?._id && catId.toString() === category._id.toString();
//           }
//           return false;
//         });
//       })
//     : [];

//   if (!category) {
//     return (
//       <div className="py-20 text-center text-gray-600">
//         Loading...
//       </div>
//     );
//   }
//   return (
//     <section className="bg-gray-50 min-h-screen py-12">
//       <div className="max-w-7xl mx-auto px-4">

//         {/* ===== PAGE HEADER ===== */}
//         <div className="mb-10 text-center">
//           <h1 className="sm:text-4xl text-3xl font-bold text-gray-900 mb-2">
//             {category.name}
//           </h1>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

//           {/* ===== SIDEBAR ===== */}
//           <aside className="lg:col-span-1 sm:sticky sm:top-28 static h-fit">
//             <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
//               <h3 className="text-base font-semibold text-gray-900 mb-5">
//                 Product Categories
//               </h3>

//               <ul className="space-y-2">
//                 {categories.map((cat) => {
//                   const isActive = cat.slug === slug;

//                   return (
//                     <li key={cat._id}>
//                       <button
//                         onClick={() =>
//                           router.push(`/category/${cat.slug}`)
//                         }
//                         className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition
//                           ${
//                             isActive
//                               ? "bg-red-600 text-white"
//                               : "text-gray-700 hover:bg-red-50 hover:text-red-600"
//                           }
//                         `}
//                       >
//                         {cat.name}
//                       </button>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>
//           </aside>

//           {/* ===== PRODUCTS GRID ===== */}
//           <div className="lg:col-span-3">
//             {filteredProducts.length === 0 ? (
//               <p className="text-center text-gray-500">
//                 No products available in this category.
//               </p>
//             ) : (
//               <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8 gap-4">
//                 {filteredProducts.map((product) => (
//                   <div
//                     key={product._id}
//                     className="border border-gray-300 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition"
//                   >
//                     {/* Image */}
//                     <Link
//                       href={`/product/${product.slug}`}
//                       className="relative bg-gray-100 flex items-center justify-center h-64"
//                     >
//                       <img
//                         src={`http://localhost:5000${product.thumbImg}`} // Adjust path as needed
//                         alt={product.name}
                       
//                         className="object-contain transition-transform duration-300 hover:scale-105 h-full w-full overflow-hidden"
//                       />
//                     </Link>

//                     {/* Name */}
//                     <div className="bg-red-600 text-white text-center py-3 font-semibold text-sm truncate mx-4 rounded-md">
//                       {product.name}
//                     </div>

//                     {/* Actions */}
//                     <div className="flex justify-between gap-3 p-4">
//                       <button
//                         onClick={() => setOpenEnquiry(true)}
//                         className="flex-1 bg-blue-600 text-white text-sm py-2 rounded-md"
//                       >
//                         Get Quote
//                       </button>
//                       <button className="sm:flex-1 hidden  bg-black text-white text-sm py-2 rounded-md">
//                         Enquiry
//                       </button>
//                     </div>

//                     <EnquiryModal
//                       isOpen={openEnquiry}
//                       productName={product.name}
//                       onClose={() => setOpenEnquiry(false)}
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }



"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import EnquiryModal from "@/app/components/EnquiryModal";
import { 
  FunnelIcon, 
  XMarkIcon, 
  MagnifyingGlassIcon,
  ChevronRightIcon,
  CubeIcon 
} from "@heroicons/react/24/outline";

export default function CategoryProductsPage() {
  const { slug } = useParams();
  const router = useRouter();

  // State management
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // UI State
  const [openEnquiry, setOpenEnquiry] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [categorySearch, setCategorySearch] = useState("");
  const [sortBy, setSortBy] = useState("name");

  // API Base URL
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://chemical-backend-6oix.onrender.com";

  // Fetch data on mount and when slug changes
  useEffect(() => {
    if (slug) {
      fetchAllData();
    }
  }, [slug]);

  const fetchAllData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await Promise.all([
        fetchCategory(),
        fetchCategories(),
        fetchProducts()
      ]);
    } catch (error) {
      setError("Failed to load data. Please try again.");
      console.error("Data fetching error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategory = async () => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/categories/${slug}`
      );
      setCategory(data.data);
    } catch (error) {
      console.error("Category fetch error:", error);
      throw error;
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/categories/admin/all`
      );
      // Sort categories alphabetically
     const sortedCategories = (data.data || []).reverse();
      setCategories(sortedCategories);
    } catch (error) {
      console.error("Categories fetch error:", error);
      throw error;
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/products`
      );
      
      const productsData = Array.isArray(data) ? data : data?.data || [];
      setProducts(productsData);
    } catch (error) {
      console.error("Products fetch error:", error);
      throw error;
    }
  };

  // Memoized filtered and sorted products
  const filteredProducts = useMemo(() => {
    if (!products.length || !category) return [];

    return products
      .filter((product) => {
        if (!product.category || !Array.isArray(product.category)) return false;
        
        return product.category.some((cat) => {
          if (typeof cat === 'string') {
            return cat === category._id || cat === category._id.toString();
          } else if (cat && typeof cat === 'object') {
            const catId = cat._id || cat.id;
            return catId && category._id && catId.toString() === category._id.toString();
          }
          return false;
        });
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price":
            return (a.price || 0) - (b.price || 0);
          case "newest":
            return (b._id || "").localeCompare(a._id || "");
          default:
            return a.name.localeCompare(b.name);
        }
      });
  }, [products, category, sortBy]);

  // Memoized filtered categories
  const filteredCategories = useMemo(() => {
    return categories.filter((cat) =>
      cat.name.toLowerCase().includes(categorySearch.toLowerCase())
    );
  }, [categories, categorySearch]);

  const handleEnquiryClick = useCallback((product) => {
    setSelectedProduct(product);
    setOpenEnquiry(true);
  }, []);

  const handleCategoryChange = useCallback((categorySlug) => {
    router.push(`/category/${categorySlug}`);
    setIsFilterOpen(false);
    setCategorySearch("");
  }, [router]);

  const closeFilter = useCallback(() => setIsFilterOpen(false), []);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-red-600"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-8 w-8 animate-pulse rounded-full bg-red-600/20"></div>
              </div>
            </div>
            <p className="text-gray-600 font-medium animate-pulse">Loading categories...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !category) {
    return (
      <div className="min-h-screen  py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center bg-white rounded-2xl shadow-lg p-12 max-w-lg mx-auto">
            <div className="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <CubeIcon className="h-10 w-10 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Category Not Found</h2>
            <p className="text-gray-600 mb-8">
              {error || "The category you're looking for doesn't exist or has been removed."}
            </p>
            <button
              onClick={() => router.push('/categories')}
              className="inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors shadow-md hover:shadow-lg"
            >
              Browse All Categories
              <ChevronRightIcon className="h-5 w-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-red-600 transition-colors">
            Home
          </Link>
          <ChevronRightIcon className="h-4 w-4" />
          <Link href="/categories" className="hover:text-red-600 transition-colors">
            Categories
          </Link>
          <ChevronRightIcon className="h-4 w-4" />
          <span className="text-[#1b3163] font-medium">{category.name}</span>
        </nav>

        {/* Page Header */}
        <div className="mb-8 sm:mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1b3163] mb-3">
            {category.name}
          </h1>
          <div className="flex items-center justify-center space-x-3">
            <p className="text-gray-600 text-base sm:text-lg">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'} Available
            </p>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            {/* <p className="text-gray-600 text-base sm:text-lg">
              {categories.length} Categories
            </p> */}
          </div>
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-4 text-gray-700 font-medium shadow-sm hover:shadow-md hover:border-gray-300 transition-all"
          >
            <FunnelIcon className="h-5 w-5" />
            Filter Categories
          </button>
        </div>

        {/* Sort Options - Mobile & Desktop */}
        <div className="mb-6 flex items-center justify-end">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
            <option value="newest">Sort by Newest</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
              <div className="p-6">
                {/* Header */}
                <div className="mb-5">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <CubeIcon className="h-5 w-5 mr-2 text-red-600" />
                    Product Categories
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {categories.length} categories available
                  </p>
                </div>

                {/* Search */}
                <div className="relative mb-4">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search category..."
                    value={categorySearch}
                    onChange={(e) => setCategorySearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Category List */}
                <ul className="space-y-1 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                  {filteredCategories.map((cat) => {
                    const isActive = cat.slug === slug;

                    return (
                      <li key={cat._id}>
                        <button
                          onClick={() => handleCategoryChange(cat.slug)}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                            isActive
                              ? "bg-red-600 text-white shadow-md"
                              : "text-gray-700 hover:bg-red-50 hover:text-red-600"
                          }`}
                        >
                          <span className="truncate text-[#1b3163]">{cat.name}</span>
                          {cat.productCount && (
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full ml-2 ${
                                isActive
                                  ? "bg-white/20 text-white"
                                  : "bg-gray-100 text-gray-600 group-hover:bg-red-100"
                              }`}
                            >
                              {cat.productCount}
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                  
                  {filteredCategories.length === 0 && (
                    <li className="text-center py-8">
                      <p className="text-gray-500 text-sm">No categories found</p>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </aside>

          {/* Mobile Filter Drawer */}
          {isFilterOpen && (
            <>
              <div 
                className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
                onClick={closeFilter}
              />
              
              <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-white z-50 lg:hidden shadow-2xl transform transition-transform duration-300">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Categories
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {categories.length} available
                      </p>
                    </div>
                    <button
                      onClick={closeFilter}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      aria-label="Close filter"
                    >
                      <XMarkIcon className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="flex-1 overflow-y-auto p-6">
                    {/* Search */}
                    <div className="relative mb-4">
                      <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search category..."
                        value={categorySearch}
                        onChange={(e) => setCategorySearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                      />
                    </div>

                    <ul className="space-y-2">
                      {filteredCategories.map((cat) => {
                        const isActive = cat.slug === slug;

                        return (
                          <li key={cat._id}>
                            <button
                              onClick={() => handleCategoryChange(cat.slug)}
                              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                                isActive
                                  ? "bg-red-600 text-white shadow-md"
                                  : "text-gray-700 hover:bg-red-50 hover:text-red-600"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span>{cat.name}</span>
                                {cat.productCount && (
                                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                                    isActive
                                      ? "bg-white/20 text-white"
                                      : "bg-gray-100 text-gray-600"
                                  }`}>
                                    {cat.productCount}
                                  </span>
                                )}
                              </div>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Footer */}
                  <div className="p-6 border-t border-gray-200">
                    <button
                      onClick={closeFilter}
                      className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 shadow-sm">
                <div className="bg-gray-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <CubeIcon className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Products Found
                </h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  There are no products available in this category at the moment.
                </p>
                <button
                  onClick={() => router.push('/categories')}
                  className="inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors shadow-md hover:shadow-lg"
                >
                  Browse Other Categories
                  <ChevronRightIcon className="h-5 w-5 ml-2" />
                </button>
              </div>
            ) : (
              <>
                {/* Product count and info */}
                <div className="flex items-center justify-between mb-6">
                  <p className="text-gray-600">
                    Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> products
                  </p>
                  <p className="text-sm text-gray-500 hidden sm:block">
                    Page 1 of {Math.ceil(filteredProducts.length / 12)}
                  </p>
                </div>
                
                {/* Products Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {filteredProducts.map((product) => (
                    <div
                      key={product._id}
                      className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      {/* Image Container */}
                      <Link
                        href={`/product/${product.slug}`}
                        className="relative block bg-gray-50 aspect-square overflow-hidden"
                      >
                        <img
                          src={`${API_BASE_URL}${product.thumbImg}`}
                          alt={product.name}
                          className="w-full h-full object-contain p-4 transition-transform duration-500 "
                          loading="lazy"
                        />
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        {/* Stock Status */}
                        {product.inStock === false && (
                          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            Out of Stock
                          </div>
                        )}
                      </Link>

                      {/* Product Info */}
                      <div className="p-4">
                        <Link href={`/product/${product.slug}`}>
                          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 min-h-[2.5rem] hover:text-red-600 transition-colors">
                            {product.name}
                          </h3>
                        </Link>

                        {/* Price */}
                        {product.price && (
                          <div className="mt-2">
                            <span className="text-lg font-bold text-gray-900">
                              {product.price}
                            </span>
                          </div>
                        )}

                        {/* Description Preview */}
                        {/* {product.description && (
                          <p className="mt-2 text-xs text-gray-500 line-clamp-2">
                            {product.description}
                          </p>
                        )} */}

                        {/* Actions */}
                        <button
                          onClick={() => handleEnquiryClick(product)}
                          className="w-full mt-4 bg-[#1b3163] hover:bg-[#1b3163] text-white text-sm py-2.5 rounded-lg font-medium transition-all shadow-sm hover:shadow-md active:scale-95"
                        >
                          Get Quote
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load More Button (if needed) */}
                {filteredProducts.length > 12 && (
                  <div className="mt-10 text-center">
                    <button className="px-8 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm">
                      Load More Products
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={openEnquiry}
        productName={selectedProduct?.name}
        productId={selectedProduct?._id}
        onClose={() => {
          setOpenEnquiry(false);
          setSelectedProduct(null);
        }}
      />

      {/* Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e0;
          border-radius: 8px;
          transition: background 0.2s;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}