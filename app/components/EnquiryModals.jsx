// "use client";

// import { X } from "lucide-react";
// import { useState } from "react";
// import axios from "axios";

// export default function EnquiryModal({
//   isOpen,
//   onClose,
//   products = []
// }) {
//   const [formData, setFormData] = useState({
//     productName: "",
//     name: "",
//     email: "",
//     phone: "",
//     requirement: ""
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ type: "", text: "" });

//   if (!isOpen) return null;

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     if (message.text) setMessage({ type: "", text: "" });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setLoading(true);

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/enquiries",
//         formData
//       );

//       if (res.data.success) {
//         setMessage({
//           type: "success",
//           text: "Enquiry submitted successfully!",
//         });

//         setFormData({
//           productName: "",
//           name: "",
//           email: "",
//           phone: "",
//           requirement: ""
//         });

//         setTimeout(onClose, 2000);
//       }
//     } catch (err) {
//       setMessage({
//         type: "error",
//         text: "Something went wrong",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center">
//       <div
//         className="absolute inset-0 bg-black/50"
//         onClick={onClose}
//       />

//       <div className="relative bg-white w-full max-w-md p-6 rounded-xl">
//         <button
//           onClick={onClose}
//           className="absolute right-4 top-4"
//         >
//           <X />
//         </button>

//         <h2 className="text-xl font-bold mb-4">Get Best Quote</h2>

//         {message.text && (
//           <p className="text-sm mb-3">{message.text}</p>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-3">

//           {/* PRODUCT SELECT */}
//           <select
//             name="productName"
//             value={formData.productName}
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded"
//           >
//             <option value="">Select Product</option>
//             {products.map((p) => (
//               <option key={p._id} value={p.name}>
//                 {p.name}
//               </option>
//             ))}
//           </select>

//           <input
//             name="name"
//             placeholder="Your Name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />

//           <input
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />

//           <input
//             name="phone"
//             placeholder="Phone"
//             value={formData.phone}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />

//           <textarea
//             name="requirement"
//             placeholder="Requirement"
//             value={formData.requirement}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />

//           <button
//             disabled={loading}
//             className="w-full bg-[#1e8a25] text-white py-2 rounded"
//           >
//             {loading ? "Submitting..." : "Submit"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";

import { X, Loader2, Send, CheckCircle, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function EnquirySideModal({ products = [] }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    name: "",
    email: "",
    phone: "",
    requirement: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [focusedField, setFocusedField] = useState("");
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://chemicalsallied.in";

  // Reset message after 5 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ text: "", type: "" }), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      await axios.post(`${API_BASE_URL}/api/enquiries`, formData);
      
      setMessage({ 
        text: "Enquiry submitted successfully! We'll contact you soon.", 
        type: "success" 
      });
      
      setFormData({
        productName: "",
        name: "",
        email: "",
        phone: "",
        requirement: "",
      });

      // Close modal after success
      setTimeout(() => {
        setOpen(false);
        setMessage({ text: "", type: "" });
      }, 2000);
    } catch (error) {
      setMessage({ 
        text: error.response?.data?.message || "Something went wrong. Please try again.", 
        type: "error" 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setMessage({ text: "", type: "" });
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 group"
        aria-label="Open enquiry form"
      >
        <div className="bg-[#1e8a25]
          text-white px-2 py-2 rounded-md
          font-semibold tracking-wider text-sm
          shadow-lg hover:shadow-xl
          transform transition-all duration-300
         
          rotate-180 [writing-mode:vertical-rl]"
        >
          Enquiry Now
        </div>
      </button>

      {/* Modal */}
      <div
        className={`fixed inset-0 z-50 sm:max-h-[70vh] max-h-[80vh]  transition-all ease-in duration-300 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0  bg-opacity-50 "
          onClick={handleClose}
        />

        {/* Panel */}
        <div
          className={`absolute top-20 right-0  w-[90%] sm:w-[350px]
            bg-white shadow-2xl rounded-md
            transform transition-all duration-500 ease-out
            ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          {/* Header */}
          <div className="relative h-20 bg-[#1e8a25] ">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 
                bg-black bg-opacity-20 rounded-full
                flex items-center justify-center
                hover:bg-opacity-30 transition-all
                focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-white" />
            </button>
            
            <div className="absolute bottom-0 left-0 p-6">
              <h2 className="text-xl font-bold text-white">
                Get Best Quote
              </h2>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 overflow-y-auto" style={{ maxHeight: "calc(100vh - 6rem)" }}>
            {/* Message Alert */}
            {message.text && (
              <div
                className={`mb-4 p-3 rounded-lg flex items-center gap-2 text-sm
                  ${message.type === "success" 
                    ? "bg-green-50 text-green-700 border border-green-200" 
                    : "bg-red-50 text-red-700 border border-red-200"
                  }`}
              >
                {message.type === "success" ? (
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                )}
                <span>{message.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Product */}
              <div>
                {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Product <span className="text-red-500">*</span>
                </label> */}
                <select
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("product")}
                  onBlur={() => setFocusedField("")}
                  required
                  className={`w-full px-3 py-2 rounded-lg
                    border transition-all duration-200
                    ${focusedField === "product"
                      ? "border-[#1e8a25] ring-2 ring-[#1e8a25]/30" 
                      : "border-gray-300 hover:border-gray-400"
                    }
                    bg-gray-50 focus:bg-white
                    text-gray-900 outline-none`}
                >
                  <option value="">Choose a product</option>
                  {products.map((product, index) => (
                    <option key={product._id || index} value={product.name}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Name */}
              <div>
                {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label> */}
                <input
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField("")}
                  required
                  className={`w-full px-3 py-2 rounded-lg
                    border transition-all duration-200
                    ${focusedField === "name"
                      ? "border-[#1e8a25] ring-2 ring-[#1e8a25]/30" 
                      : "border-gray-300 hover:border-gray-400"
                    }
                    bg-gray-50 focus:bg-white
                    text-gray-900 outline-none`}
                />
              </div>

              {/* Email */}
              <div>
                {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label> */}
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField("")}
                  required
                  className={`w-full px-3 py-2 rounded-lg
                    border transition-all duration-200
                    ${focusedField === "email"
                      ? "border-[#1e8a25] ring-2 ring-[#1e8a25]/30" 
                      : "border-gray-300 hover:border-gray-400"
                    }
                    bg-gray-50 focus:bg-white
                    text-gray-900 outline-none`}
                />
              </div>

              {/* Phone */}
              <div>
                {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label> */}
                <input
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField("")}
                  required
                  className={`w-full px-3 py-2 rounded-lg
                    border transition-all duration-200
                    ${focusedField === "phone"
                      ? "border-[#1e8a25] ring-2 ring-[#1e8a25]/30" 
                      : "border-gray-300 hover:border-gray-400"
                    }
                    bg-gray-50 focus:bg-white
                    text-gray-900 outline-none`}
                />
              </div>

              {/* Requirement */}
              <div>
                {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Requirement <span className="text-red-500">*</span>
                </label> */}
                <textarea
                  name="requirement"
                  placeholder="Please describe your requirements..."
                  value={formData.requirement}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("requirement")}
                  onBlur={() => setFocusedField("")}
                  required
                  rows="3"
                  className={`w-full px-3 py-2 rounded-lg
                    border transition-all duration-200 resize-none
                    ${focusedField === "requirement"
                      ? "border-[#1e8a25] ring-2 ring-[#1e8a25]/30" 
                      : "border-gray-300 hover:border-gray-400"
                    }
                    bg-gray-50 focus:bg-white
                    text-gray-900 outline-none`}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 bg-[#1e8a25]
                  text-white font-semibold py-3 px-4 rounded-lg
                  hover:from-[#1e8a25] 
                  focus:outline-none focus:ring-2 focus:ring-[#1e8a25] focus:ring-offset-2
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-200
                  flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Enquiry</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
