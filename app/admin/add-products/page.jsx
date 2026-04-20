// "use client";

// import { useState, useEffect, useCallback, useMemo } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//     Upload,
//     X,
//     Plus,
//     Save,
//     ArrowLeft,
//     Image as ImageIcon,
//     Package,
//     DollarSign,
//     FileText,
//     Tag,
//     Layers,
//     AlertCircle,
//     CheckCircle,
//     Loader2,
// } from "lucide-react";
// import Link from "next/link";
// import AdminLayout from "../components/layout";
// import Image from "next/image";

// // Dynamically import CKEditor with no SSR
// // import dynamic from 'next/dynamic';

// // const CKEditor = dynamic(() => import('@ckeditor/ckeditor5-react').then(mod => mod.CKEditor), {
// //     ssr: false,
// //     loading: () => (
// //         <div className="flex items-center justify-center h-64 bg-gray-50 rounded-xl border border-gray-200">
// //             <div className="flex flex-col items-center gap-2">
// //                 <Loader2 className="h-8 w-8 animate-spin text-red-600" />
// //                 <p className="text-sm text-gray-600">Loading editor...</p>
// //             </div>
// //         </div>
// //     )
// // });

// // // Import the editor build directly (only on client side)
// // let ClassicEditor;
// // if (typeof window !== 'undefined') {
// //     ClassicEditor = require('@ckeditor/ckeditor5-build-classic');
// // }

// // Form validation schema
// const validateForm = (formData, thumbPreview) => {
//     const errors = {};

//     if (!formData.name?.trim()) errors.name = "Product name is required";
//     else if (formData.name.length < 3) errors.name = "Product name must be at least 3 characters";

//     if (!formData.slug?.trim()) errors.slug = "Slug is required";
//     else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(formData.slug)) {
//         errors.slug = "Slug can only contain lowercase letters, numbers, and hyphens";
//     }

//     if (!formData.price?.trim()) errors.price = "Price is required";
//     else if (!/^Rs\.?\s*\d+/.test(formData.price) && !/^\d+/.test(formData.price)) {
//         errors.price = "Price should be like 'Rs. 1500' or '1500'";
//     }

//     if (!formData.minimumOrderQuantity?.trim()) {
//         errors.minimumOrderQuantity = "Minimum order quantity is required";
//     }

//     if (formData.category.length === 0) errors.category = "Select at least one category";

//     if (!formData.shortDescription?.trim()) errors.shortDescription = "Short description is required";
//     else if (formData.shortDescription.length < 10) {
//         errors.shortDescription = "Short description must be at least 10 characters";
//     } else if (formData.shortDescription.length > 200) {
//         errors.shortDescription = "Short description must be less than 200 characters";
//     }

//     if (!formData.description?.trim()) errors.description = "Full description is required";
//     else {
//         // Strip HTML tags for character count
//         const textContent = formData.description.replace(/<[^>]*>?/gm, '');
//         if (textContent.length < 5) {
//             errors.description = "Full description must be at least 50 characters (without HTML tags)";
//         }
//     }

//     if (!thumbPreview) errors.thumbImg = "Thumbnail image is required";

//     return errors;
// };

// export default function AddProductPage() {
//     const router = useRouter();
//     const [loading, setLoading] = useState(false);
//     const [categories, setCategories] = useState([]);
//     const [categoriesLoading, setCategoriesLoading] = useState(true);
//     const [formData, setFormData] = useState({
//         name: "",
//         slug: "",
//         price: "",
//         description: "",
//         shortDescription: "",
//         category: [],
//         minimumOrderQuantity: "",
//     });
//     const [thumbPreview, setThumbPreview] = useState(null);
//     const [galleryPreviews, setGalleryPreviews] = useState([]);
//     const [selectedFiles, setSelectedFiles] = useState({
//         thumbImg: null,
//         galleryImg: [],
//     });
//     const [errors, setErrors] = useState({});
//     const [touched, setTouched] = useState({});
//     const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
//     // const [editorLoaded, setEditorLoaded] = useState(false);
    
//     const descriptionEditorRef = useRef(null);
//     const shortDescriptionEditorRef = useRef(null);


//     // Fetch categories
//     useEffect(() => {
//         fetchCategories();
//         // Set editor loaded flag
//         setEditorLoaded(true);
//     }, []);

//     const fetchCategories = async () => {
//         try {
//             setCategoriesLoading(true);
//             const response = await axios.get("http://localhost:5000/api/categories/admin/all");
//             setCategories(response.data.data);
//         } catch (error) {
//             toast.error("Failed to fetch categories");
//             console.error("Categories fetch error:", error);
//         } finally {
//             setCategoriesLoading(false);
//         }
//     };

//     // Generate slug from name
//     const generateSlug = useCallback((text) => {
//         return text
//             .toLowerCase()
//             .replace(/[^\w\s-]/g, '')
//             .replace(/[\s_-]+/g, '-')
//             .replace(/^-+|-+$/g, '');
//     }, []);

//     // Auto-generate slug from name only if not manually edited
//     const handleNameChange = (e) => {
//         const name = e.target.value;
//         setFormData(prev => ({
//             ...prev,
//             name,
//             slug: !slugManuallyEdited ? generateSlug(name) : prev.slug,
//         }));

//         if (touched.name) {
//             validateField('name', name);
//         }
//     };

//     // Handle manual slug edit
//     const handleSlugChange = (e) => {
//         const slug = e.target.value;
//         setFormData(prev => ({ ...prev, slug }));
//         setSlugManuallyEdited(true);

//         if (touched.slug) {
//             validateField('slug', slug);
//         }
//     };

//     // Handle text input changes
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));

//         if (touched[name]) {
//             validateField(name, value);
//         }
//     };

//     // Handle CKEditor change
//     const handleEditorChange = (event, editor) => {
//         const data = editor.getData();
//         setFormData(prev => ({ ...prev, description: data }));

//         if (touched.description) {
//             validateField('description', data);
//         }
//     };

//     // Validate single field
//     const validateField = (name, value) => {
//         const fieldErrors = { ...errors };

//         switch (name) {
//             case 'name':
//                 if (!value?.trim()) fieldErrors.name = "Product name is required";
//                 else if (value.length < 3) fieldErrors.name = "Product name must be at least 3 characters";
//                 else delete fieldErrors.name;
//                 break;

//             case 'slug':
//                 if (!value?.trim()) fieldErrors.slug = "Slug is required";
//                 else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
//                     fieldErrors.slug = "Slug can only contain lowercase letters, numbers, and hyphens";
//                 } else delete fieldErrors.slug;
//                 break;

//             case 'price':
//                 if (!value?.trim()) fieldErrors.price = "Price is required";
//                 else if (!/^Rs\.?\s*\d+/.test(value) && !/^\d+/.test(value)) {
//                     fieldErrors.price = "Price should be like 'Rs. 1500' or '1500'";
//                 } else delete fieldErrors.price;
//                 break;

//             case 'minimumOrderQuantity':
//                 if (!value?.trim()) fieldErrors.minimumOrderQuantity = "Minimum order quantity is required";
//                 else delete fieldErrors.minimumOrderQuantity;
//                 break;

//             case 'shortDescription':
//                 if (!value?.trim()) {
//                     fieldErrors.shortDescription = "Short description is required";
//                 } else {
//                     const textContent = value.replace(/<[^>]*>?/gm, '');
//                     if (textContent.length < 10) {
//                         fieldErrors.shortDescription = "Short description must be at least 10 characters";
//                     } else if (textContent.length > 200) {
//                         fieldErrors.shortDescription = "Short description must be less than 200 characters";
//                     } else {
//                         delete fieldErrors.shortDescription;
//                     }
//                 }
//                 break;


//             case 'description':
//                 if (!value?.trim()) {
//                     fieldErrors.description = "Full description is required";
//                 } else {
//                     const textContent = value.replace(/<[^>]*>?/gm, '');
//                     if (textContent.length < 5) {
//                         fieldErrors.description = "Full description must be at least 5 characters (without HTML tags)";
//                     } else {
//                         delete fieldErrors.description;
//                     }
//                 }
//                 break;
//         }

//         setErrors(fieldErrors);
//         return !fieldErrors[name];
//     };

//     // Handle field blur
//     const handleBlur = (e) => {
//         const { name, value } = e.target;
//         setTouched(prev => ({ ...prev, [name]: true }));
//         validateField(name, value);
//     };

//     // Handle category selection
//     const handleCategoryChange = (e) => {
//         const options = e.target.options;
//         const selected = [];
//         for (let i = 0; i < options.length; i++) {
//             if (options[i].selected) {
//                 selected.push(options[i].value);
//             }
//         }
//         setFormData(prev => ({ ...prev, category: selected }));

//         if (touched.category) {
//             if (selected.length === 0) {
//                 setErrors(prev => ({ ...prev, category: "Select at least one category" }));
//             } else {
//                 setErrors(prev => {
//                     const newErrors = { ...prev };
//                     delete newErrors.category;
//                     return newErrors;
//                 });
//             }
//         }
//     };

//     // Handle thumbnail upload
//     const handleThumbUpload = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
//             if (!validTypes.includes(file.type)) {
//                 toast.error("Please upload a valid image (JPEG, PNG, WEBP)");
//                 return;
//             }

//             if (file.size > 5 * 1024 * 1024) {
//                 toast.error("Image size should be less than 5MB");
//                 return;
//             }

//             setSelectedFiles(prev => ({ ...prev, thumbImg: file }));

//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setThumbPreview(reader.result);
//                 setErrors(prev => {
//                     const newErrors = { ...prev };
//                     delete newErrors.thumbImg;
//                     return newErrors;
//                 });
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleGalleryUpload = (e) => {
//         const files = Array.from(e.target.files);

//         if (galleryPreviews.length + files.length > 10) {
//             toast.error("Maximum 10 gallery images allowed");
//             return;
//         }

//         const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
//         const newFiles = [];
//         const previewPromises = [];

//         files.forEach((file) => {
//             if (!validTypes.includes(file.type)) {
//                 toast.error(`${file.name} is not a valid image`);
//                 return;
//             }

//             if (file.size > 5 * 1024 * 1024) {
//                 toast.error(`${file.name} size should be less than 5MB`);
//                 return;
//             }

//             newFiles.push(file);

//             previewPromises.push(
//                 new Promise((resolve) => {
//                     const reader = new FileReader();
//                     reader.onloadend = () => resolve(reader.result);
//                     reader.readAsDataURL(file);
//                 })
//             );
//         });

//         Promise.all(previewPromises).then((previews) => {
//             setGalleryPreviews((prev) => [...prev, ...previews]);
//         });

//         setSelectedFiles((prev) => ({
//             ...prev,
//             galleryImg: [...prev.galleryImg, ...newFiles],
//         }));
//     };


//     // Remove gallery image
//     const removeGalleryImage = (index) => {
//         setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
//         setSelectedFiles(prev => ({
//             ...prev,
//             galleryImg: prev.galleryImg.filter((_, i) => i !== index),
//         }));
//     };

//     // Remove thumbnail
//     const removeThumbnail = () => {
//         setThumbPreview(null);
//         setSelectedFiles(prev => ({ ...prev, thumbImg: null }));
//         setErrors(prev => ({ ...prev, thumbImg: "Thumbnail image is required" }));
//     };

//     // Get plain text from HTML for character count
//     const getPlainTextLength = (html) => {
//         if (!html) return 0;
//         const text = html.replace(/<[^>]*>?/gm, '');
//         return text.length;
//     };

//     // Validate entire form
//     const isFormValid = useMemo(() => {
//         const validationErrors = validateForm(formData, thumbPreview);
//         return Object.keys(validationErrors).length === 0;
//     }, [formData, thumbPreview]);

//     // Handle form submit
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const validationErrors = validateForm(formData, thumbPreview);
//         setErrors(validationErrors);

//         const allTouched = {};
//         Object.keys(formData).forEach(key => { allTouched[key] = true; });
//         allTouched.thumbImg = true;
//         setTouched(allTouched);

//         if (Object.keys(validationErrors).length > 0) {
//             toast.error("Please fix the errors before submitting");
//             return;
//         }

//         setLoading(true);

//         try {
//             const formDataToSend = new FormData();
//             formDataToSend.append("name", formData.name.trim());
//             formDataToSend.append("slug", formData.slug.trim());
//             formDataToSend.append("price", formData.price.trim());
//             formDataToSend.append("description", formData.description.trim());
//             formDataToSend.append("shortDescription", formData.shortDescription.trim());
//             formDataToSend.append("minimumOrderQuantity", formData.minimumOrderQuantity.trim());

//             formData.category.forEach((catId) => {
//                 formDataToSend.append("category", catId);
//             });

//             formDataToSend.append("thumbImg", selectedFiles.thumbImg);
//             selectedFiles.galleryImg.forEach((file) => {
//                 formDataToSend.append("galleryImg", file);
//             });

//             const response = await axios.post("http://localhost:5000/api/products", formDataToSend, {
//                 headers: { "Content-Type": "multipart/form-data" },
//             });

//             toast.success(
//                 <div className="flex items-center gap-2">
//                     <CheckCircle className="h-5 w-5" />
//                     <span>Product created successfully!</span>
//                 </div>,
//                 { className: "bg-green-50 text-green-800 border border-green-200" }
//             );

//             setTimeout(() => {
//                 router.push("/admin/list-products");
//             }, 1500);
//         } catch (error) {
//             toast.error(
//                 <div className="flex items-center gap-2">
//                     <AlertCircle className="h-5 w-5" />
//                     <span>{error.response?.data?.message || "Failed to create product"}</span>
//                 </div>,
//                 { className: "bg-red-50 text-red-800 border border-red-200" }
//             );
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <AdminLayout>
//             <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
//                 <ToastContainer
//                     position="top-right"
//                     autoClose={3000}
//                     hideProgressBar={false}
//                     newestOnTop
//                     closeOnClick
//                     rtl={false}
//                     pauseOnFocusLoss
//                     draggable
//                     pauseOnHover
//                     theme="colored"
//                 />

//                 <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
//                     {/* Header */}
//                     <div className="mb-8">
//                         <div className="flex items-center justify-between">
//                             <div className="flex items-center space-x-4">
//                                 <Link
//                                     href="/admin/list-products"
//                                     className="group flex items-center justify-center w-10 h-10 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
//                                 >
//                                     <ArrowLeft size={20} className="text-gray-600 group-hover:text-gray-900" />
//                                 </Link>
//                                 <div>
//                                     <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
//                                         <Package className="h-8 w-8 text-red-600" />
//                                         Add New Product
//                                     </h1>
//                                     <p className="mt-1 text-sm text-gray-600">
//                                         Fill in the details below to create a new product in your catalog
//                                     </p>
//                                 </div>
//                             </div>

//                             {/* Progress Steps */}
//                             <div className="hidden md:flex items-center space-x-2">
//                                 <div className="flex items-center">
//                                     <div className="flex items-center justify-center w-8 h-8 bg-red-600 text-white rounded-full">
//                                         1
//                                     </div>
//                                     <span className="ml-2 text-sm font-medium text-gray-900">Details</span>
//                                 </div>
//                                 <div className="w-12 h-0.5 bg-gray-300"></div>
//                                 <div className="flex items-center">
//                                     <div className="flex items-center justify-center w-8 h-8 bg-gray-200 text-gray-600 rounded-full">
//                                         2
//                                     </div>
//                                     <span className="ml-2 text-sm font-medium text-gray-500">Images</span>
//                                 </div>
//                                 <div className="w-12 h-0.5 bg-gray-300"></div>
//                                 <div className="flex items-center">
//                                     <div className="flex items-center justify-center w-8 h-8 bg-gray-200 text-gray-600 rounded-full">
//                                         3
//                                     </div>
//                                     <span className="ml-2 text-sm font-medium text-gray-500">Review</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Form */}
//                     <form onSubmit={handleSubmit} className="space-y-8">
//                         {/* Product Information Card */}
//                         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
//                             <div className="px-6 py-5 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
//                                 <div className="flex items-center gap-3">
//                                     <div className="p-2 bg-red-100 rounded-lg">
//                                         <FileText className="h-5 w-5 text-red-600" />
//                                     </div>
//                                     <div>
//                                         <h2 className="text-lg font-semibold text-gray-900">Product Information</h2>
//                                         <p className="text-sm text-gray-600">Basic details about your product</p>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="p-6 space-y-6">
//                                 {/* Product Name */}
//                                 <div className="space-y-2">
//                                     <label className="block text-sm font-semibold text-gray-700">
//                                         Product Name <span className="text-red-500">*</span>
//                                     </label>
//                                     <div className="relative">
//                                         <input
//                                             type="text"
//                                             name="name"
//                                             value={formData.name}
//                                             onChange={handleNameChange}
//                                             onBlur={handleBlur}
//                                             required
//                                             className={`w-full px-4 py-3 pl-11 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${errors.name && touched.name
//                                                 ? "border-red-300 bg-red-50"
//                                                 : "border-gray-300 hover:border-gray-400"
//                                                 }`}
//                                             placeholder="e.g. Pretilachlor 50% EC Herbicides"
//                                         />
//                                         <Tag className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
//                                     </div>
//                                     {errors.name && touched.name && (
//                                         <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
//                                             <AlertCircle className="h-4 w-4" />
//                                             {errors.name}
//                                         </p>
//                                     )}
//                                 </div>

//                                 {/* Slug */}
//                                 <div className="space-y-2">
//                                     <label className="block text-sm font-semibold text-gray-700">
//                                         URL Slug <span className="text-red-500">*</span>
//                                     </label>
//                                     <div className="relative">
//                                         <input
//                                             type="text"
//                                             name="slug"
//                                             value={formData.slug}
//                                             onChange={handleSlugChange}
//                                             onBlur={handleBlur}
//                                             required
//                                             className={`w-full px-4 py-3 pl-11 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-gray-50 ${errors.slug && touched.slug
//                                                 ? "border-red-300 bg-red-50"
//                                                 : "border-gray-300"
//                                                 }`}
//                                             placeholder="product-slug"
//                                         />
//                                         <span className="absolute left-3 top-3.5 text-sm text-gray-500">/</span>
//                                     </div>
//                                     <div className="flex items-center justify-between">
//                                         <p className="text-xs text-gray-500">
//                                             URL: /{formData.slug || "product-slug"}
//                                         </p>
//                                         <button
//                                             type="button"
//                                             onClick={() => {
//                                                 setSlugManuallyEdited(false);
//                                                 setFormData(prev => ({
//                                                     ...prev,
//                                                     slug: generateSlug(prev.name),
//                                                 }));
//                                             }}
//                                             className="text-xs text-red-600 hover:text-red-700 font-medium"
//                                         >
//                                             Generate from name
//                                         </button>
//                                     </div>
//                                     {errors.slug && touched.slug && (
//                                         <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
//                                             <AlertCircle className="h-4 w-4" />
//                                             {errors.slug}
//                                         </p>
//                                     )}
//                                 </div>

//                                 {/* Price and MOQ */}
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                     <div className="space-y-2">
//                                         <label className="block text-sm font-semibold text-gray-700">
//                                             Price <span className="text-red-500">*</span>
//                                         </label>
//                                         <div className="relative">
//                                             <input
//                                                 type="text"
//                                                 name="price"
//                                                 value={formData.price}
//                                                 onChange={handleInputChange}
//                                                 onBlur={handleBlur}
//                                                 required
//                                                 className={`w-full px-4 py-3 pl-11 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${errors.price && touched.price
//                                                     ? "border-red-300 bg-red-50"
//                                                     : "border-gray-300 hover:border-gray-400"
//                                                     }`}
//                                                 placeholder="e.g. Rs. 1500"
//                                             />
//                                             <DollarSign className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
//                                         </div>
//                                         {errors.price && touched.price && (
//                                             <p className="text-sm text-red-600 flex items-center gap-1">
//                                                 <AlertCircle className="h-4 w-4" />
//                                                 {errors.price}
//                                             </p>
//                                         )}
//                                     </div>
//                                     <div className="space-y-2">
//                                         <label className="block text-sm font-semibold text-gray-700">
//                                             Minimum Order Quantity <span className="text-red-500">*</span>
//                                         </label>
//                                         <div className="relative">
//                                             <input
//                                                 type="text"
//                                                 name="minimumOrderQuantity"
//                                                 value={formData.minimumOrderQuantity}
//                                                 onChange={handleInputChange}
//                                                 onBlur={handleBlur}
//                                                 required
//                                                 className={`w-full px-4 py-3 pl-11 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${errors.minimumOrderQuantity && touched.minimumOrderQuantity
//                                                     ? "border-red-300 bg-red-50"
//                                                     : "border-gray-300 hover:border-gray-400"
//                                                     }`}
//                                                 placeholder="e.g. 1000 Liters"
//                                             />
//                                             <Layers className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
//                                         </div>
//                                         {errors.minimumOrderQuantity && touched.minimumOrderQuantity && (
//                                             <p className="text-sm text-red-600 flex items-center gap-1">
//                                                 <AlertCircle className="h-4 w-4" />
//                                                 {errors.minimumOrderQuantity}
//                                             </p>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Category Card */}
//                         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
//                             <div className="px-6 py-5 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
//                                 <div className="flex items-center gap-3">
//                                     <div className="p-2 bg-blue-100 rounded-lg">
//                                         <Layers className="h-5 w-5 text-blue-600" />
//                                     </div>
//                                     <div>
//                                         <h2 className="text-lg font-semibold text-gray-900">Category</h2>
//                                         <p className="text-sm text-gray-600">Assign product to categories</p>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="p-6">
//                                 <div className="space-y-2">
//                                     <label className="block text-sm font-semibold text-gray-700">
//                                         Select Categories <span className="text-red-500">*</span>
//                                     </label>
//                                     {categoriesLoading ? (
//                                         <div className="flex items-center justify-center py-8">
//                                             <Loader2 className="h-8 w-8 animate-spin text-red-600" />
//                                         </div>
//                                     ) : (
//                                         <>
//                                             <select
//                                                 multiple
//                                                 value={formData.category}
//                                                 onChange={handleCategoryChange}
//                                                 onBlur={() => setTouched(prev => ({ ...prev, category: true }))}
//                                                 className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all min-h-[160px] ${errors.category && touched.category
//                                                     ? "border-red-300 bg-red-50"
//                                                     : "border-gray-300 hover:border-gray-400"
//                                                     }`}
//                                                 size="4"
//                                                 required
//                                             >
//                                                 {categories.map((cat) => (
//                                                     <option
//                                                         key={cat._id}
//                                                         value={cat._id}
//                                                         className="py-2"
//                                                     >
//                                                         {cat.name}
//                                                     </option>
//                                                 ))}
//                                             </select>
//                                             <div className="flex items-center justify-between mt-2">
//                                                 <p className="text-xs text-gray-500">
//                                                     Hold Ctrl/Cmd to select multiple categories
//                                                 </p>
//                                                 <p className="text-xs font-medium text-gray-700">
//                                                     Selected: {formData.category.length}
//                                                 </p>
//                                             </div>
//                                         </>
//                                     )}
//                                     {errors.category && touched.category && (
//                                         <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
//                                             <AlertCircle className="h-4 w-4" />
//                                             {errors.category}
//                                         </p>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Images Card */}
//                         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
//                             <div className="px-6 py-5 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
//                                 <div className="flex items-center gap-3">
//                                     <div className="p-2 bg-purple-100 rounded-lg">
//                                         <ImageIcon className="h-5 w-5 text-purple-600" />
//                                     </div>
//                                     <div>
//                                         <h2 className="text-lg font-semibold text-gray-900">Product Images</h2>
//                                         <p className="text-sm text-gray-600">Upload product photos</p>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="p-6 space-y-6">
//                                 {/* Thumbnail Image */}
//                                 <div className="space-y-2">
//                                     <label className="block text-sm font-semibold text-gray-700">
//                                         Thumbnail Image <span className="text-red-500">*</span>
//                                     </label>
//                                     {!thumbPreview ? (
//                                         <div className="relative">
//                                             <input
//                                                 type="file"
//                                                 accept="image/*"
//                                                 onChange={handleThumbUpload}
//                                                 className="hidden"
//                                                 id="thumb-upload"
//                                             />
//                                             <label
//                                                 htmlFor="thumb-upload"
//                                                 className={`cursor-pointer flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl transition-all ${errors.thumbImg
//                                                     ? "border-red-300 bg-red-50"
//                                                     : "border-gray-300 hover:border-red-500 hover:bg-red-50"
//                                                     }`}
//                                             >
//                                                 <Upload className={`h-12 w-12 mb-4 ${errors.thumbImg ? "text-red-400" : "text-gray-400"
//                                                     }`} />
//                                                 <span className="text-sm font-medium text-gray-900">
//                                                     Click to upload thumbnail
//                                                 </span>
//                                                 <span className="text-xs text-gray-500 mt-1">
//                                                     PNG, JPG, WEBP up to 5MB
//                                                 </span>
//                                                 <span className="text-xs text-gray-400 mt-2">
//                                                     Recommended: 800x800px or larger
//                                                 </span>
//                                             </label>
//                                         </div>
//                                     ) : (
//                                         <div className="relative group">
//                                             <div className="relative w-64 h-64 rounded-xl overflow-hidden border-2 border-gray-200">
//                                                 <Image
//                                                     src={thumbPreview}
//                                                     alt="Thumbnail preview"
//                                                     fill
//                                                     className="object-cover"
//                                                 />
//                                                 <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
//                                                     <button
//                                                         type="button"
//                                                         onClick={removeThumbnail}
//                                                         className="opacity-0 group-hover:opacity-100 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transform scale-90 hover:scale-100 transition-all"
//                                                     >
//                                                         <X size={20} />
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                             <p className="text-xs text-gray-500 mt-2">
//                                                 Click the image to remove or replace
//                                             </p>
//                                         </div>
//                                     )}
//                                     {errors.thumbImg && (
//                                         <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
//                                             <AlertCircle className="h-4 w-4" />
//                                             {errors.thumbImg}
//                                         </p>
//                                     )}
//                                 </div>

//                                 {/* Gallery Images */}
//                                 <div className="space-y-2">
//                                     <label className="block text-sm font-semibold text-gray-700">
//                                         Gallery Images <span className="text-gray-400 font-normal">(Optional)</span>
//                                     </label>
//                                     <p className="text-xs text-gray-500 mb-3">
//                                         Upload up to 10 additional product images
//                                     </p>

//                                     <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//                                         {galleryPreviews.map((preview, index) => (
//                                             <div key={index} className="relative group">
//                                                 <div className="relative h-32 w-full rounded-lg overflow-hidden border border-gray-200">
//                                                     <Image
//                                                         src={preview}
//                                                         alt={`Gallery ${index + 1}`}
//                                                         fill
//                                                         className="object-cover"
//                                                     />
//                                                     <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
//                                                         <button
//                                                             type="button"
//                                                             onClick={() => removeGalleryImage(index)}
//                                                             className="opacity-0 group-hover:opacity-100 p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 transform scale-90 hover:scale-100 transition-all"
//                                                         >
//                                                             <X size={14} />
//                                                         </button>
//                                                     </div>
//                                                 </div>
//                                                 <span className="absolute -top-2 -right-2 w-5 h-5 bg-gray-800 text-white text-xs flex items-center justify-center rounded-full">
//                                                     {index + 1}
//                                                 </span>
//                                             </div>
//                                         ))}

//                                         {galleryPreviews.length < 10 && (
//                                             <div className="relative">
//                                                 <input
//                                                     type="file"
//                                                     accept="image/*"
//                                                     multiple
//                                                     onChange={handleGalleryUpload}
//                                                     className="hidden"
//                                                     id="gallery-upload"
//                                                 />
//                                                 <label
//                                                     htmlFor="gallery-upload"
//                                                     className="cursor-pointer flex flex-col items-center justify-center h-32 w-full border-2 border-dashed border-gray-300 rounded-lg hover:border-red-500 hover:bg-red-50 transition-all"
//                                                 >
//                                                     <Plus className="h-6 w-6 text-gray-400" />
//                                                     <span className="text-xs text-gray-500 mt-1">Add Image</span>
//                                                 </label>
//                                             </div>
//                                         )}
//                                     </div>

//                                     <div className="flex items-center justify-between mt-2">
//                                         <p className="text-xs text-gray-500">
//                                             {galleryPreviews.length}/10 images uploaded
//                                         </p>
//                                         <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
//                                             <div
//                                                 className="h-full bg-red-600 rounded-full transition-all"
//                                                 style={{ width: `${(galleryPreviews.length / 10) * 100}%` }}
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Description Card */}
//                         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
//                             <div className="px-6 py-5 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
//                                 <div className="flex items-center gap-3">
//                                     <div className="p-2 bg-green-100 rounded-lg">
//                                         <FileText className="h-5 w-5 text-green-600" />
//                                     </div>
//                                     <div>
//                                         <h2 className="text-lg font-semibold text-gray-900">Product Description</h2>
//                                         <p className="text-sm text-gray-600">Detailed information about your product</p>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="p-6 space-y-6">
//                                 {/* Short Description */}
//                                 <div className="space-y-2">
//                                     <label className="block text-sm font-semibold text-gray-700">
//                                         Short Description <span className="text-red-500">*</span>
//                                     </label>
//                                     <div className="relative">
//                                         <div
//                                             className={`border rounded-xl overflow-hidden transition-all ${errors.shortDescription && touched.shortDescription
//                                                 ? "border-red-300"
//                                                 : "border-gray-300 hover:border-gray-400"
//                                                 }`}
//                                         >
//                                             {editorLoaded && ClassicEditor && (
//                                                 <CKEditor
//                                                     editor={ClassicEditor}
//                                                     data={formData.shortDescription}
//                                                     onChange={(event, editor) => {
//                                                         const data = editor.getData();
//                                                         setFormData((prev) => ({
//                                                             ...prev,
//                                                             shortDescription: data,
//                                                         }));
//                                                     }}
//                                                     onBlur={() => {
//                                                         setTouched((prev) => ({
//                                                             ...prev,
//                                                             shortDescription: true,
//                                                         }));
//                                                         validateField("shortDescription", formData.shortDescription);
//                                                     }}
//                                                     config={{
//                                                         toolbar: [
//                                                             "bold",
//                                                             "italic",
//                                                             "bulletedList",
//                                                             "numberedList",
//                                                             "undo",
//                                                             "redo",
//                                                             "link",
//                                                             "blockQuote",
//                                                             "mediaEmbed",
//                                                             "mediaEmbedToolbar",
//                                                             "htmlEmbed",
                                                        
//                                                             "imageUpload",
//                                                         ],
//                                                         placeholder: "Write short product description...",
//                                                     }}
//                                                 />
//                                             )}
//                                         </div>

//                                         <div className="absolute bottom-3 right-3">
//                                             <span className={`text-xs ${formData.shortDescription.length > 180
//                                                 ? formData.shortDescription.length >= 200
//                                                     ? "text-red-600"
//                                                     : "text-orange-600"
//                                                 : "text-gray-400"
//                                                 }`}>
//                                                 {formData.shortDescription.length}/200
//                                             </span>
//                                         </div>
//                                     </div>
//                                     {errors.shortDescription && touched.shortDescription && (
//                                         <p className="text-sm text-red-600 flex items-center gap-1">
//                                             <AlertCircle className="h-4 w-4" />
//                                             {errors.shortDescription}
//                                         </p>
//                                     )}
//                                 </div>

//                                 {/* Full Description with CKEditor */}
//                                 <div className="space-y-2">
//                                     <label className="block text-sm font-semibold text-gray-700">
//                                         Full Description <span className="text-red-500">*</span>
//                                     </label>
//                                     <div className={`border rounded-xl overflow-hidden transition-all ${errors.description && touched.description
//                                         ? "border-red-300"
//                                         : "border-gray-300 hover:border-gray-400"
//                                         }`}>
//                                         {editorLoaded && ClassicEditor && (
//                                             <CKEditor
//                                                 editor={ClassicEditor}
//                                                 data={formData.description}
//                                                 onChange={handleEditorChange}
//                                                 onBlur={() => {
//                                                     setTouched(prev => ({ ...prev, description: true }));
//                                                     validateField('description', formData.description);
//                                                 }}
//                                                 config={{
//                                                     toolbar: [
//                                                         'heading',
//                                                         '|',
//                                                         'bold',
//                                                         'italic',
//                                                         'link',
//                                                         'bulletedList',
//                                                         'numberedList',
//                                                         '|',
//                                                         'blockQuote',
//                                                         'insertTable',
//                                                         '|',
//                                                         'undo',
//                                                         'redo'
//                                                     ],
//                                                     placeholder: 'Write detailed product description here...',
//                                                     heading: {
//                                                         options: [
//                                                             { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
//                                                             { model: 'heading1', view: 'h2', title: 'Heading 1', class: 'ck-heading_heading1' },
//                                                             { model: 'heading2', view: 'h3', title: 'Heading 2', class: 'ck-heading_heading2' }
//                                                         ]
//                                                     }
//                                                 }}
//                                             />
//                                         )}
//                                     </div>
//                                     <div className="flex items-center justify-between mt-1">
//                                         <div>
//                                             {errors.description && touched.description ? (
//                                                 <p className="text-sm text-red-600 flex items-center gap-1">
//                                                     <AlertCircle className="h-4 w-4" />
//                                                     {errors.description}
//                                                 </p>
//                                             ) : (
//                                                 <p className="text-xs text-gray-500">
//                                                     Use the editor to format your product description
//                                                 </p>
//                                             )}
//                                         </div>
//                                         <span className={`text-xs ${getPlainTextLength(formData.description) < 5
//                                             ? "text-orange-600"
//                                             : "text-gray-400"
//                                             }`}>
//                                             {getPlainTextLength(formData.description)} characters (plain text)
//                                             {getPlainTextLength(formData.description) < 5 && " - min 5"}
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Form Actions */}
//                         <div className="flex items-center justify-end gap-4 pt-6">
//                             <Link
//                                 href="/admin/products"
//                                 className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
//                             >
//                                 Cancel
//                             </Link>
//                             <button
//                                 type="submit"
//                                 disabled={loading || !isFormValid}
//                                 className={`px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all ${loading || !isFormValid
//                                     ? "opacity-50 cursor-not-allowed hover:scale-100"
//                                     : "hover:from-red-700 hover:to-red-800"
//                                     }`}
//                             >
//                                 {loading ? (
//                                     <>
//                                         <Loader2 className="h-5 w-5 animate-spin" />
//                                         Creating Product...
//                                     </>
//                                 ) : (
//                                     <>
//                                         <Save className="h-5 w-5" />
//                                         Create Product
//                                     </>
//                                 )}
//                             </button>
//                         </div>

//                         {/* Form Status */}
//                         {!isFormValid && Object.keys(touched).length > 0 && (
//                             <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
//                                 <div className="flex items-start gap-3">
//                                     <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
//                                     <div>
//                                         <h3 className="text-sm font-medium text-amber-800">
//                                             Please fix the following errors:
//                                         </h3>
//                                         <ul className="mt-2 text-sm text-amber-700 list-disc list-inside">
//                                             {Object.keys(errors).map((key) => (
//                                                 <li key={key} className="capitalize">
//                                                     {key === 'thumbImg' ? 'Thumbnail image' : key}: {errors[key]}
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </form>
//                 </div>
//             </div>
//         </AdminLayout>
//     );
// }


"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    Upload,
    X,
    Plus,
    Save,
    ArrowLeft,
    Image as ImageIcon,
    Package,
    DollarSign,
    FileText,
    Tag,
    Layers,
    AlertCircle,
    CheckCircle,
    Loader2,
} from "lucide-react";
import Link from "next/link";
import AdminLayout from "../components/layout";
import Image from "next/image";

// Form validation schema
const validateForm = (formData, thumbPreview) => {
    const errors = {};

    if (!formData.name?.trim()) errors.name = "Product name is required";
    else if (formData.name.length < 3) errors.name = "Product name must be at least 3 characters";

    if (!formData.slug?.trim()) errors.slug = "Slug is required";
    else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(formData.slug)) {
        errors.slug = "Slug can only contain lowercase letters, numbers, and hyphens";
    }

    if (!formData.price?.trim()) errors.price = "Price is required";
    else if (!/^Rs\.?\s*\d+/.test(formData.price) && !/^\d+/.test(formData.price)) {
        errors.price = "Price should be like 'Rs. 1500' or '1500'";
    }

    if (!formData.minimumOrderQuantity?.trim()) {
        errors.minimumOrderQuantity = "Minimum order quantity is required";
    }

    if (formData.category.length === 0) errors.category = "Select at least one category";

    if (!formData.shortDescription?.trim()) errors.shortDescription = "Short description is required";
    else {
        const textContent = formData.shortDescription.replace(/<[^>]*>?/gm, '');
        if (textContent.length < 10) {
            errors.shortDescription = "Short description must be at least 10 characters";
        } else if (textContent.length > 200) {
            errors.shortDescription = "Short description must be less than 200 characters";
        }
    }

    if (!formData.description?.trim()) errors.description = "Full description is required";
    else {
        const textContent = formData.description.replace(/<[^>]*>?/gm, '');
        if (textContent.length < 5) {
            errors.description = "Full description must be at least 5 characters (without HTML tags)";
        }
    }

    if (!thumbPreview) errors.thumbImg = "Thumbnail image is required";

    return errors;
};

export default function AddProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        price: "",
        description: "",
        shortDescription: "",
        category: [],
        minimumOrderQuantity: "",
    });
    const [thumbPreview, setThumbPreview] = useState(null);
    const [galleryPreviews, setGalleryPreviews] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState({
        thumbImg: null,
        galleryImg: [],
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
    const [ckeditorLoaded, setCkeditorLoaded] = useState(false);
    
    // Refs for CKEditor instances
    const descriptionEditorRef = useRef(null);
    const shortDescriptionEditorRef = useRef(null);
    const descriptionContainerRef = useRef(null);
    const shortDescriptionContainerRef = useRef(null);

    // Load CKEditor from CDN
    useEffect(() => {
        // Load CKEditor script if not already loaded
        if (!window.CKEDITOR) {
            const script = document.createElement('script');
            script.src = 'https://cdn.ckeditor.com/4.16.2/full/ckeditor.js';
            script.async = true;
            script.onload = () => {
                setCkeditorLoaded(true);
            };
            document.body.appendChild(script);
        } else {
            setCkeditorLoaded(true);
        }

        // Cleanup function
        return () => {
            if (descriptionEditorRef.current) {
                descriptionEditorRef.current.destroy();
            }
            if (shortDescriptionEditorRef.current) {
                shortDescriptionEditorRef.current.destroy();
            }
        };
    }, []);

    // Initialize CKEditor instances when loaded
  // Initialize CKEditor instances when loaded
useEffect(() => {
    if (ckeditorLoaded && descriptionContainerRef.current && shortDescriptionContainerRef.current) {
        // Small timeout to ensure DOM is ready
        setTimeout(() => {
            // Initialize Short Description Editor
            if (shortDescriptionContainerRef.current && !shortDescriptionEditorRef.current) {
                shortDescriptionEditorRef.current = window.CKEDITOR.replace(
                    shortDescriptionContainerRef.current,
                    {
                        height: '200px',
                        toolbar: [
                            { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike'] },
                            { name: 'paragraph', items: ['NumberedList', 'BulletedList', 'Blockquote'] },
                            { name: 'links', items: ['Link', 'Unlink'] },
                            { name: 'styles', items: ['Format'] },
                            { name: 'tools', items: ['Maximize'] },
                            { name: 'editing', items: ['Scayt'] }
                        ],
                        format_tags: 'p;h1;h2;h3;h4;h5;h6',
                        removeButtons: 'Subscript,Superscript',
                        removeDialogTabs: 'image:advanced;link:advanced'
                        // ✅ Removed wordcount plugin configuration
                    }
                );

                shortDescriptionEditorRef.current.on('change', () => {
                    const data = shortDescriptionEditorRef.current.getData();
                    setFormData(prev => ({ ...prev, shortDescription: data }));
                    
                    if (touched.shortDescription) {
                        validateField('shortDescription', data);
                    }
                });

                shortDescriptionEditorRef.current.on('blur', () => {
                    setTouched(prev => ({ ...prev, shortDescription: true }));
                });

                // Set initial data if exists
                if (formData.shortDescription) {
                    shortDescriptionEditorRef.current.setData(formData.shortDescription);
                }
            }

            // Initialize Description Editor
            if (descriptionContainerRef.current && !descriptionEditorRef.current) {
                descriptionEditorRef.current = window.CKEDITOR.replace(
                    descriptionContainerRef.current,
                    {
                        height: '300px',
                        toolbar: [
                            { name: 'document', items: ['Source', '-', 'NewPage', 'Preview', '-', 'Templates'] },
                            { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
                            { name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'Scayt'] },
                            '/',
                            { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat'] },
                            { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language'] },
                            { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
                            { name: 'insert', items: ['Image', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe'] },
                            '/',
                            { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
                            { name: 'colors', items: ['TextColor', 'BGColor'] },
                            { name: 'tools', items: ['Maximize', 'ShowBlocks'] }
                        ],
                        format_tags: 'p;h1;h2;h3;h4;h5;h6;pre;address;div',
                        removeButtons: 'Subscript,Superscript',
                        removeDialogTabs: 'image:advanced;link:advanced'
                        // ✅ Removed wordcount plugin configuration
                    }
                );

                descriptionEditorRef.current.on('change', () => {
                    const data = descriptionEditorRef.current.getData();
                    setFormData(prev => ({ ...prev, description: data }));
                    
                    if (touched.description) {
                        validateField('description', data);
                    }
                });

                descriptionEditorRef.current.on('blur', () => {
                    setTouched(prev => ({ ...prev, description: true }));
                });

                // Set initial data if exists
                if (formData.description) {
                    descriptionEditorRef.current.setData(formData.description);
                }
            }
        }, 100);
    }
}, [ckeditorLoaded, formData.shortDescription, formData.description]);

    // Fetch categories
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setCategoriesLoading(true);
            const response = await axios.get("https://chemicalsallied.in/api/categories/admin/all");
            setCategories(response.data.data);
        } catch (error) {
            toast.error("Failed to fetch categories");
            console.error("Categories fetch error:", error);
        } finally {
            setCategoriesLoading(false);
        }
    };

    // Generate slug from name
    const generateSlug = useCallback((text) => {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }, []);

    // Auto-generate slug from name only if not manually edited
    const handleNameChange = (e) => {
        const name = e.target.value;
        setFormData(prev => ({
            ...prev,
            name,
            slug: !slugManuallyEdited ? generateSlug(name) : prev.slug,
        }));

        if (touched.name) {
            validateField('name', name);
        }
    };

    // Handle manual slug edit
    const handleSlugChange = (e) => {
        const slug = e.target.value;
        setFormData(prev => ({ ...prev, slug }));
        setSlugManuallyEdited(true);

        if (touched.slug) {
            validateField('slug', slug);
        }
    };

    // Handle text input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (touched[name]) {
            validateField(name, value);
        }
    };

    // Validate single field
    const validateField = (name, value) => {
        const fieldErrors = { ...errors };

        switch (name) {
            case 'name':
                if (!value?.trim()) fieldErrors.name = "Product name is required";
                else if (value.length < 3) fieldErrors.name = "Product name must be at least 3 characters";
                else delete fieldErrors.name;
                break;

            case 'slug':
                if (!value?.trim()) fieldErrors.slug = "Slug is required";
                else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
                    fieldErrors.slug = "Slug can only contain lowercase letters, numbers, and hyphens";
                } else delete fieldErrors.slug;
                break;

            case 'price':
                if (!value?.trim()) fieldErrors.price = "Price is required";
                else if (!/^Rs\.?\s*\d+/.test(value) && !/^\d+/.test(value)) {
                    fieldErrors.price = "Price should be like 'Rs. 1500' or '1500'";
                } else delete fieldErrors.price;
                break;

            case 'minimumOrderQuantity':
                if (!value?.trim()) fieldErrors.minimumOrderQuantity = "Minimum order quantity is required";
                else delete fieldErrors.minimumOrderQuantity;
                break;

            case 'shortDescription':
                if (!value?.trim()) {
                    fieldErrors.shortDescription = "Short description is required";
                } else {
                    const textContent = value.replace(/<[^>]*>?/gm, '');
                    if (textContent.length < 10) {
                        fieldErrors.shortDescription = "Short description must be at least 10 characters";
                    } else if (textContent.length > 200) {
                        fieldErrors.shortDescription = "Short description must be less than 200 characters";
                    } else {
                        delete fieldErrors.shortDescription;
                    }
                }
                break;

            case 'description':
                if (!value?.trim()) {
                    fieldErrors.description = "Full description is required";
                } else {
                    const textContent = value.replace(/<[^>]*>?/gm, '');
                    if (textContent.length < 5) {
                        fieldErrors.description = "Full description must be at least 5 characters (without HTML tags)";
                    } else {
                        delete fieldErrors.description;
                    }
                }
                break;
        }

        setErrors(fieldErrors);
        return !fieldErrors[name];
    };

    // Handle field blur
    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        validateField(name, value);
    };

    // Handle category selection
    const handleCategoryChange = (e) => {
        const options = e.target.options;
        const selected = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selected.push(options[i].value);
            }
        }
        setFormData(prev => ({ ...prev, category: selected }));

        if (touched.category) {
            if (selected.length === 0) {
                setErrors(prev => ({ ...prev, category: "Select at least one category" }));
            } else {
                setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.category;
                    return newErrors;
                });
            }
        }
    };

    // Handle thumbnail upload
    const handleThumbUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
            if (!validTypes.includes(file.type)) {
                toast.error("Please upload a valid image (JPEG, PNG, WEBP)");
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                toast.error("Image size should be less than 5MB");
                return;
            }

            setSelectedFiles(prev => ({ ...prev, thumbImg: file }));

            const reader = new FileReader();
            reader.onloadend = () => {
                setThumbPreview(reader.result);
                setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.thumbImg;
                    return newErrors;
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGalleryUpload = (e) => {
        const files = Array.from(e.target.files);

        if (galleryPreviews.length + files.length > 10) {
            toast.error("Maximum 10 gallery images allowed");
            return;
        }

        const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
        const newFiles = [];
        const previewPromises = [];

        files.forEach((file) => {
            if (!validTypes.includes(file.type)) {
                toast.error(`${file.name} is not a valid image`);
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                toast.error(`${file.name} size should be less than 5MB`);
                return;
            }

            newFiles.push(file);

            previewPromises.push(
                new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(file);
                })
            );
        });

        Promise.all(previewPromises).then((previews) => {
            setGalleryPreviews((prev) => [...prev, ...previews]);
        });

        setSelectedFiles((prev) => ({
            ...prev,
            galleryImg: [...prev.galleryImg, ...newFiles],
        }));
    };

    // Remove gallery image
    const removeGalleryImage = (index) => {
        setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
        setSelectedFiles(prev => ({
            ...prev,
            galleryImg: prev.galleryImg.filter((_, i) => i !== index),
        }));
    };

    // Remove thumbnail
    const removeThumbnail = () => {
        setThumbPreview(null);
        setSelectedFiles(prev => ({ ...prev, thumbImg: null }));
        setErrors(prev => ({ ...prev, thumbImg: "Thumbnail image is required" }));
    };

    // Get plain text from HTML for character count
    const getPlainTextLength = (html) => {
        if (!html) return 0;
        const text = html.replace(/<[^>]*>?/gm, '');
        return text.length;
    };

    // Validate entire form
    const isFormValid = useMemo(() => {
        const validationErrors = validateForm(formData, thumbPreview);
        return Object.keys(validationErrors).length === 0;
    }, [formData, thumbPreview]);

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Update form data with latest editor content
        if (shortDescriptionEditorRef.current) {
            formData.shortDescription = shortDescriptionEditorRef.current.getData();
        }
        if (descriptionEditorRef.current) {
            formData.description = descriptionEditorRef.current.getData();
        }

        const validationErrors = validateForm(formData, thumbPreview);
        setErrors(validationErrors);

        const allTouched = {};
        Object.keys(formData).forEach(key => { allTouched[key] = true; });
        allTouched.thumbImg = true;
        setTouched(allTouched);

        if (Object.keys(validationErrors).length > 0) {
            toast.error("Please fix the errors before submitting");
            return;
        }

        setLoading(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name.trim());
            formDataToSend.append("slug", formData.slug.trim());
            formDataToSend.append("price", formData.price.trim());
            formDataToSend.append("description", formData.description.trim());
            formDataToSend.append("shortDescription", formData.shortDescription.trim());
            formDataToSend.append("minimumOrderQuantity", formData.minimumOrderQuantity.trim());

            formData.category.forEach((catId) => {
                formDataToSend.append("category", catId);
            });

            formDataToSend.append("thumbImg", selectedFiles.thumbImg);
            selectedFiles.galleryImg.forEach((file) => {
                formDataToSend.append("galleryImg", file);
            });

            const response = await axios.post("https://chemicalsallied.in/api/products", formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            toast.success(
                <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>Product created successfully!</span>
                </div>,
                { className: "bg-green-50 text-green-800 border border-green-200" }
            );

            setTimeout(() => {
                router.push("/admin/list-products");
            }, 1500);
        } catch (error) {
            toast.error(
                <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    <span>{error.response?.data?.message || "Failed to create product"}</span>
                </div>,
                { className: "bg-red-50 text-red-800 border border-red-200" }
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/admin/list-products"
                                    className="group flex items-center justify-center w-10 h-10 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                                >
                                    <ArrowLeft size={20} className="text-gray-600 group-hover:text-gray-900" />
                                </Link>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                                        <Package className="h-8 w-8 text-red-600" />
                                        Add New Product
                                    </h1>
                                    <p className="mt-1 text-sm text-gray-600">
                                        Fill in the details below to create a new product in your catalog
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Product Information Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="px-6 py-5 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-red-100 rounded-lg">
                                        <FileText className="h-5 w-5 text-red-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">Product Information</h2>
                                        <p className="text-sm text-gray-600">Basic details about your product</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 space-y-6">
                                {/* Product Name */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Product Name <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleNameChange}
                                            onBlur={handleBlur}
                                            required
                                            className={`w-full px-4 py-3 pl-11 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${errors.name && touched.name
                                                ? "border-red-300 bg-red-50"
                                                : "border-gray-300 hover:border-gray-400"
                                                }`}
                                            placeholder="e.g. Pretilachlor 50% EC Herbicides"
                                        />
                                        <Tag className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                    </div>
                                    {errors.name && touched.name && (
                                        <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                                            <AlertCircle className="h-4 w-4" />
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* Slug */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        URL Slug <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="slug"
                                            value={formData.slug}
                                            onChange={handleSlugChange}
                                            onBlur={handleBlur}
                                            required
                                            className={`w-full px-4 py-3 pl-11 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-gray-50 ${errors.slug && touched.slug
                                                ? "border-red-300 bg-red-50"
                                                : "border-gray-300"
                                                }`}
                                            placeholder="product-slug"
                                        />
                                        <span className="absolute left-3 top-3.5 text-sm text-gray-500">/</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs text-gray-500">
                                            URL: /{formData.slug || "product-slug"}
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSlugManuallyEdited(false);
                                                setFormData(prev => ({
                                                    ...prev,
                                                    slug: generateSlug(prev.name),
                                                }));
                                            }}
                                            className="text-xs text-red-600 hover:text-red-700 font-medium"
                                        >
                                            Generate from name
                                        </button>
                                    </div>
                                    {errors.slug && touched.slug && (
                                        <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                                            <AlertCircle className="h-4 w-4" />
                                            {errors.slug}
                                        </p>
                                    )}
                                </div>

                                {/* Price and MOQ */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700">
                                            Price <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleInputChange}
                                                onBlur={handleBlur}
                                                required
                                                className={`w-full px-4 py-3 pl-11 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${errors.price && touched.price
                                                    ? "border-red-300 bg-red-50"
                                                    : "border-gray-300 hover:border-gray-400"
                                                    }`}
                                                placeholder="e.g. Rs. 1500"
                                            />
                                            <DollarSign className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                        </div>
                                        {errors.price && touched.price && (
                                            <p className="text-sm text-red-600 flex items-center gap-1">
                                                <AlertCircle className="h-4 w-4" />
                                                {errors.price}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700">
                                            Minimum Order Quantity <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="minimumOrderQuantity"
                                                value={formData.minimumOrderQuantity}
                                                onChange={handleInputChange}
                                                onBlur={handleBlur}
                                                required
                                                className={`w-full px-4 py-3 pl-11 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all ${errors.minimumOrderQuantity && touched.minimumOrderQuantity
                                                    ? "border-red-300 bg-red-50"
                                                    : "border-gray-300 hover:border-gray-400"
                                                    }`}
                                                placeholder="e.g. 1000 Liters"
                                            />
                                            <Layers className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                        </div>
                                        {errors.minimumOrderQuantity && touched.minimumOrderQuantity && (
                                            <p className="text-sm text-red-600 flex items-center gap-1">
                                                <AlertCircle className="h-4 w-4" />
                                                {errors.minimumOrderQuantity}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Category Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="px-6 py-5 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <Layers className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">Category</h2>
                                        <p className="text-sm text-gray-600">Assign product to categories</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Select Categories <span className="text-red-500">*</span>
                                    </label>
                                    {categoriesLoading ? (
                                        <div className="flex items-center justify-center py-8">
                                            <Loader2 className="h-8 w-8 animate-spin text-red-600" />
                                        </div>
                                    ) : (
                                        <>
                                            <select
                                                multiple
                                                value={formData.category}
                                                onChange={handleCategoryChange}
                                                onBlur={() => setTouched(prev => ({ ...prev, category: true }))}
                                                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all min-h-[160px] ${errors.category && touched.category
                                                    ? "border-red-300 bg-red-50"
                                                    : "border-gray-300 hover:border-gray-400"
                                                    }`}
                                                size="4"
                                                required
                                            >
                                                {categories.map((cat) => (
                                                    <option
                                                        key={cat._id}
                                                        value={cat._id}
                                                        className="py-2"
                                                    >
                                                        {cat.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="flex items-center justify-between mt-2">
                                                <p className="text-xs text-gray-500">
                                                    Hold Ctrl/Cmd to select multiple categories
                                                </p>
                                                <p className="text-xs font-medium text-gray-700">
                                                    Selected: {formData.category.length}
                                                </p>
                                            </div>
                                        </>
                                    )}
                                    {errors.category && touched.category && (
                                        <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                                            <AlertCircle className="h-4 w-4" />
                                            {errors.category}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Images Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="px-6 py-5 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-100 rounded-lg">
                                        <ImageIcon className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">Product Images</h2>
                                        <p className="text-sm text-gray-600">Upload product photos</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 space-y-6">
                                {/* Thumbnail Image */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Thumbnail Image <span className="text-red-500">*</span>
                                    </label>
                                    {!thumbPreview ? (
                                        <div className="relative">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleThumbUpload}
                                                className="hidden"
                                                id="thumb-upload"
                                            />
                                            <label
                                                htmlFor="thumb-upload"
                                                className={`cursor-pointer flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl transition-all ${errors.thumbImg
                                                    ? "border-red-300 bg-red-50"
                                                    : "border-gray-300 hover:border-red-500 hover:bg-red-50"
                                                    }`}
                                            >
                                                <Upload className={`h-12 w-12 mb-4 ${errors.thumbImg ? "text-red-400" : "text-gray-400"
                                                    }`} />
                                                <span className="text-sm font-medium text-gray-900">
                                                    Click to upload thumbnail
                                                </span>
                                                <span className="text-xs text-gray-500 mt-1">
                                                    PNG, JPG, WEBP up to 5MB
                                                </span>
                                                <span className="text-xs text-gray-400 mt-2">
                                                    Recommended: 800x800px or larger
                                                </span>
                                            </label>
                                        </div>
                                    ) : (
                                        <div className="relative group">
                                            <div className="relative w-64 h-64 rounded-xl overflow-hidden border-2 border-gray-200">
                                                <Image
                                                    src={thumbPreview}
                                                    alt="Thumbnail preview"
                                                    fill
                                                    className="object-cover"
                                                />
                                                <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                                                    <button
                                                        type="button"
                                                        onClick={removeThumbnail}
                                                        className="opacity-0 group-hover:opacity-100 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transform scale-90 hover:scale-100 transition-all"
                                                    >
                                                        <X size={20} />
                                                    </button>
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-2">
                                                Click the image to remove or replace
                                            </p>
                                        </div>
                                    )}
                                    {errors.thumbImg && (
                                        <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                                            <AlertCircle className="h-4 w-4" />
                                            {errors.thumbImg}
                                        </p>
                                    )}
                                </div>

                                {/* Gallery Images */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Gallery Images <span className="text-gray-400 font-normal">(Optional)</span>
                                    </label>
                                    <p className="text-xs text-gray-500 mb-3">
                                        Upload up to 10 additional product images
                                    </p>

                                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                        {galleryPreviews.map((preview, index) => (
                                            <div key={index} className="relative group">
                                                <div className="relative h-32 w-full rounded-lg overflow-hidden border border-gray-200">
                                                    <Image
                                                        src={preview}
                                                        alt={`Gallery ${index + 1}`}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                                                        <button
                                                            type="button"
                                                            onClick={() => removeGalleryImage(index)}
                                                            className="opacity-0 group-hover:opacity-100 p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 transform scale-90 hover:scale-100 transition-all"
                                                        >
                                                            <X size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                                <span className="absolute -top-2 -right-2 w-5 h-5 bg-gray-800 text-white text-xs flex items-center justify-center rounded-full">
                                                    {index + 1}
                                                </span>
                                            </div>
                                        ))}

                                        {galleryPreviews.length < 10 && (
                                            <div className="relative">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    onChange={handleGalleryUpload}
                                                    className="hidden"
                                                    id="gallery-upload"
                                                />
                                                <label
                                                    htmlFor="gallery-upload"
                                                    className="cursor-pointer flex flex-col items-center justify-center h-32 w-full border-2 border-dashed border-gray-300 rounded-lg hover:border-red-500 hover:bg-red-50 transition-all"
                                                >
                                                    <Plus className="h-6 w-6 text-gray-400" />
                                                    <span className="text-xs text-gray-500 mt-1">Add Image</span>
                                                </label>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between mt-2">
                                        <p className="text-xs text-gray-500">
                                            {galleryPreviews.length}/10 images uploaded
                                        </p>
                                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-red-600 rounded-full transition-all"
                                                style={{ width: `${(galleryPreviews.length / 10) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="px-6 py-5 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <FileText className="h-5 w-5 text-green-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">Product Description</h2>
                                        <p className="text-sm text-gray-600">Detailed information about your product</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 space-y-6">
                                {/* Short Description */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Short Description <span className="text-red-500">*</span>
                                    </label>
                                    {!ckeditorLoaded ? (
                                        <div className="flex items-center justify-center h-48 bg-gray-50 rounded-xl border border-gray-200">
                                            <div className="flex flex-col items-center gap-2">
                                                <Loader2 className="h-8 w-8 animate-spin text-red-600" />
                                                <p className="text-sm text-gray-600">Loading editor...</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="relative">
                                            <textarea
                                                ref={shortDescriptionContainerRef}
                                                id="short-description-editor"
                                                name="shortDescription"
                                                className="hidden"
                                                defaultValue={formData.shortDescription}
                                            />
                                            <div 
                                                className={`border rounded-xl overflow-hidden transition-all ${
                                                    errors.shortDescription && touched.shortDescription
                                                        ? "border-red-300"
                                                        : "border-gray-300 hover:border-gray-400"
                                                }`}
                                            >
                                                {/* CKEditor will replace this textarea */}
                                            </div>
                                            <div className="absolute bottom-3 right-3 pointer-events-none">
                                                <span className={`text-xs ${
                                                    getPlainTextLength(formData.shortDescription) > 180
                                                        ? getPlainTextLength(formData.shortDescription) >= 200
                                                            ? "text-red-600"
                                                            : "text-orange-600"
                                                        : "text-gray-400"
                                                }`}>
                                                    {getPlainTextLength(formData.shortDescription)}/200
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    {errors.shortDescription && touched.shortDescription && (
                                        <p className="text-sm text-red-600 flex items-center gap-1">
                                            <AlertCircle className="h-4 w-4" />
                                            {errors.shortDescription}
                                        </p>
                                    )}
                                </div>

                                {/* Full Description */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Full Description <span className="text-red-500">*</span>
                                    </label>
                                    {!ckeditorLoaded ? (
                                        <div className="flex items-center justify-center h-64 bg-gray-50 rounded-xl border border-gray-200">
                                            <div className="flex flex-col items-center gap-2">
                                                <Loader2 className="h-8 w-8 animate-spin text-red-600" />
                                                <p className="text-sm text-gray-600">Loading editor...</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="relative">
                                            <textarea
                                                ref={descriptionContainerRef}
                                                id="description-editor"
                                                name="description"
                                                className="hidden"
                                                defaultValue={formData.description}
                                            />
                                            <div 
                                                className={`border rounded-xl overflow-hidden transition-all ${
                                                    errors.description && touched.description
                                                        ? "border-red-300"
                                                        : "border-gray-300 hover:border-gray-400"
                                                }`}
                                            >
                                                {/* CKEditor will replace this textarea */}
                                            </div>
                                            <div className="absolute bottom-3 right-3 pointer-events-none">
                                                <span className={`text-xs ${
                                                    getPlainTextLength(formData.description) < 5
                                                        ? "text-orange-600"
                                                        : "text-gray-400"
                                                }`}>
                                                    {getPlainTextLength(formData.description)} characters
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    {errors.description && touched.description && (
                                        <p className="text-sm text-red-600 flex items-center gap-1">
                                            <AlertCircle className="h-4 w-4" />
                                            {errors.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex items-center justify-end gap-4 pt-6">
                            <Link
                                href="/admin/list-products"
                                className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={loading || !isFormValid}
                                className={`px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all ${
                                    loading || !isFormValid
                                        ? "opacity-50 cursor-not-allowed hover:scale-100"
                                        : "hover:from-red-700 hover:to-red-800"
                                }`}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        Creating Product...
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-5 w-5" />
                                        Create Product
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Form Status */}
                        {!isFormValid && Object.keys(touched).length > 0 && (
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="text-sm font-medium text-amber-800">
                                            Please fix the following errors:
                                        </h3>
                                        <ul className="mt-2 text-sm text-amber-700 list-disc list-inside">
                                            {Object.keys(errors).map((key) => (
                                                <li key={key} className="capitalize">
                                                    {key === 'thumbImg' ? 'Thumbnail image' : key}: {errors[key]}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}