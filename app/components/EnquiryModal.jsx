// "use client";

// import { X } from "lucide-react";

// export default function EnquiryModal({ isOpen, onClose, productName }) {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center">
//       {/* Overlay */}
//       <div
//         className="absolute inset-0  "
//         onClick={onClose}
//       />

//       {/* Modal */}
//       <div className="relative bg-white w-full max-w-md rounded-md shadow-2xl p-8 z-10 animate-scaleIn">
//         {/* Close */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
//         >
//           <X size={22} />
//         </button>

//         {/* Header */}
//         <div className="mb-6">
//           <h2 className="text-2xl font-bold text-gray-900">
//             Get Best Quote
//           </h2>
//           <p className="text-sm text-gray-500 mt-1">
//             Fill the form and our team will contact you shortly
//           </p>
//         </div>

//         {/* Form */}
//         <form className="space-y-4">
//           <input
//             type="text"
//             value={productName}
//             disabled
//             className="w-full border rounded-lg px-4 py-2 bg-gray-100 text-gray-600"
//           />

//           <input
//             type="text"
//             placeholder="Your Name"
//             className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
//           />

//           <input
//             type="email"
//             placeholder="Email Address"
//             className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
//           />

//           <input
//             type="tel"
//             placeholder="Phone Number"
//             className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
//           />

//           <textarea
//             rows="4"
//             placeholder="Your Requirement"
//             className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
//           />

//           <button
//             type="submit"
//             className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
//           >
//             Submit Enquiry
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


"use client";

import { X } from "lucide-react";
import { useState } from "react";
import axios from "axios";

export default function EnquiryModal({ isOpen, onClose, productName }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    requirement: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://chemicalsallied.in";

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear message when user starts typing
    if (message.text) setMessage({ type: "", text: "" });
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) return "Please enter a valid email";
    if (!formData.phone.trim()) return "Phone number is required";
    if (!/^[\d\s\+\-\(\)]{10,}$/.test(formData.phone)) return "Please enter a valid phone number";
    if (!formData.requirement.trim()) return "Requirement is required";
    if (formData.requirement.length < 10) return "Requirement must be at least 10 characters";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setMessage({ type: "error", text: validationError });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/enquiries`,
        {
          productName,
          ...formData
        }
      );
     
      if (response.data.success) {
        setMessage({
          type: "success",
          text: "Enquiry submitted successfully! We'll contact you soon."
        });
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          requirement: ""
        });

        // Close modal after 3 seconds
        setTimeout(() => {
          onClose();
          setMessage({ type: "", text: "" });
        }, 3000);
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to submit enquiry. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-md rounded-xl shadow-2xl p-8 z-10 animate-scaleIn">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          disabled={loading}
        >
          <X size={22} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Get Best Quote
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Fill the form and our team will contact you shortly
          </p>
        </div>

        {/* Message */}
        {message.text && (
          <div className={`mb-4 p-3 rounded-lg ${
            message.type === "success" 
              ? "bg-green-50 text-green-700 border border-green-200" 
              : "bg-red-50 text-red-700 border border-red-200"
          }`}>
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={productName}
            disabled
            className="w-full border rounded-lg px-4 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
          />

          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name *"
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none transition"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address *"
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none transition"
            />
          </div>

          <div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number *"
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none transition"
            />
          </div>

          <div>
            <textarea
              rows="4"
              name="requirement"
              value={formData.requirement}
              onChange={handleChange}
              placeholder="Your Requirement *"
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none transition resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1e8a25] hover:bg-[#1e8a25]  text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              "Submit Enquiry"
            )}
          </button>
        </form>

        {/* Required fields note */}
        <p className="text-xs text-gray-400 mt-4 text-center">
          * Required fields
        </p>
      </div>
    </div>
  );
}

