// "use client";

// import { User, Mail, Phone, MapPin } from "lucide-react";

// export default function ContactPage() {
//   return (
//     <section className="bg-white text-gray-800">

//       {/* ===== BREADCRUMB ===== */}
//       <div className="bg-gray-100 py-3 text-sm text-center text-gray-500">
//         Home <span className="mx-1">/</span>
//         <span className="font-medium text-gray-800">Contact Us</span>
//       </div>

//       {/* ===== MAIN SECTION ===== */}
//       <div className="max-w-7xl mx-auto px-6 py-20 grid gap-20 lg:grid-cols-2 items-start">

//         {/* ===== LEFT INFO ===== */}
//         <div>
//           <h2 className="text-4xl font-bold text-gray-900 mb-5">
//             Get In Touch
//           </h2>

//           <p className="text-gray-600 mb-12 max-w-md leading-relaxed">
//             We’re here to answer your questions, discuss your requirements,
//             and help you find the right writing solutions for your business.
//           </p>

//           <div className="space-y-6">
//             <InfoBox
//               icon={<User size={20} />}
//               title="Contact Person"
//               value="Mr. Yogesh Patel"
//             />
//             <InfoBox
//               icon={<Mail size={20} />}
//               title="Email Address"
//               value="ajantadfpens@gmail.com"
//             />
//             <InfoBox
//               icon={<Phone size={20} />}
//               title="Phone Number"
//               value="+91 9904031137"
//             />
//             <InfoBox
//               icon={<MapPin size={20} />}
//               title="Office Address"
//               value="Survey No. 114/p, Plot No. 13, Near Total Hotel, Veraval Road,
//               Keshod SONDARDA 362227, Gujarat, India"
//             />
//           </div>
//         </div>

//         {/* ===== RIGHT FORM ===== */}
//         <div className="bg-white border border-gray-200 rounded-md p-10 shadow-lg">
//           <h3 className="text-2xl font-semibold text-gray-900 mb-8">
//             Reach Out To Us
//           </h3>

//           <form className="space-y-6">
//             <Input label="Your Name" placeholder="Enter your name" />
//             <Input label="Your Email" placeholder="Enter your email" type="email" />
//             <Input label="Phone Number" placeholder="Enter phone number" />
//             <Input label="Your Address" placeholder="Enter your address" />

//             <div>
//               <label className="block text-sm font-medium mb-2">
//                 Your Message <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 rows="5"
//                 placeholder="Write your message here..."
//                 className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none resize-none"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-gray-900 text-white py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition"
//             >
//               Submit Enquiry
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* ===== MAP SECTION ===== */}
//       <div className="max-w-7xl mx-auto px-6 pb-20">
//         <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
//           Our Location
//         </h2>

//         <div className="w-full h-[420px] rounded-md overflow-hidden border shadow-lg">
//           <iframe
//             src="https://www.google.com/maps?q=25%20no.%20building%20aakar%20builders%20Byramji%20Town%20Nagpur&output=embed"
//             width="100%"
//             height="100%"
//             style={{ border: 0 }}
//             allowFullScreen=""
//             loading="lazy"
//             referrerPolicy="no-referrer-when-downgrade"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ===== INFO BOX ===== */
// function InfoBox({ icon, title, value }) {
//   return (
//     <div className="flex gap-4 items-start border border-gray-200 rounded-xl p-6 hover:shadow-md transition bg-white">
//       <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 text-white">
//         {icon}
//       </div>
//       <div>
//         <h4 className="font-semibold text-gray-900">{title}</h4>
//         <p className="text-sm text-gray-600 mt-1 leading-relaxed">
//           {value}
//         </p>
//       </div>
//     </div>
//   );
// }

// /* ===== INPUT FIELD ===== */
// function Input({ label, placeholder, type = "text" }) {
//   return (
//     <div>
//       <label className="block text-sm font-medium mb-2">
//         {label} <span className="text-red-500">*</span>
//       </label>
//       <input
//         type={type}
//         placeholder={placeholder}
//         className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none"
//       />
//     </div>
//   );
// }


"use client";

import { User, Mail, Phone, MapPin, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import axios from "axios";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear status when user starts typing
    if (submitStatus.message) setSubmitStatus({ type: "", message: "" });
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) return "Please enter a valid email";
    if (!formData.phone.trim()) return "Phone number is required";
    if (!/^[\d\s\+\-\(\)]{10,}$/.test(formData.phone)) return "Please enter a valid phone number";
    if (!formData.address.trim()) return "Address is required";
    if (formData.address.length < 5) return "Address must be at least 5 characters";
    if (!formData.message.trim()) return "Message is required";
    if (formData.message.length < 10) return "Message must be at least 10 characters";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setSubmitStatus({ type: "error", message: validationError });
      return;
    }

    setLoading(true);
    setSubmitStatus({ type: "", message: "" });

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/contact`,
        formData
      );

      if (response.data.success) {
        setSubmitStatus({
          type: "success",
          message: response.data.message
        });
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          message: ""
        });

        // Auto hide success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus({ type: "", message: "" });
        }, 5000);
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: error.response?.data?.message || "Failed to send message. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className=" text-gray-800">

      {/* ===== BREADCRUMB ===== */}
      <div className=" py-3 text-sm text-center text-gray-500">
        Home <span className="mx-1">/</span>
        <span className="font-medium text-[#1b3163]">Contact Us</span>
      </div>

      {/* ===== MAIN SECTION ===== */}
      <div className="max-w-7xl mx-auto px-6 sm:py-20 py-10 grid gap-20 lg:grid-cols-2 items-start">

        {/* ===== LEFT INFO ===== */}
        <div>
          <h2 className="text-4xl font-bold text-[#1b3163] mb-5">
            Get In Touch
          </h2>

          <p className="text-white mb-12 text-justify max-w-md leading-relaxed">
            Connect with us for bulk orders, export inquiries, or product details. Our team is ready to assist you with reliable agrochemical solutions tailored to your agricultural needs.
          </p>

          <div className="space-y-6">
            <InfoBox
              icon={<User size={20} />}
              title="Contact Person"
              value="Mr. Sanjeev Arora "
            />
            {/* <InfoBox
              icon={<Mail size={20} />}
              title="Email Address"
              value="ajantadfpens@gmail.com"
            /> */}
            <InfoBox
              icon={<Phone size={20} />}
              title="Phone Number"
              value="+91 08046047240"
            />
            <InfoBox
              icon={<MapPin size={20} className="w-20 " />}
              title="Office Address"
              value="Chemicals And Allied Products, Gorakhpur Road, Industrial Area, Deoria - 274001, Uttar Pradesh, India"
            />
          </div>
        </div>

        {/* ===== RIGHT FORM ===== */}
        <div className="bg-white border border-gray-200 rounded-md p-10 shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">
            Reach Out To Us
          </h3>

          {/* Status Message */}
          {submitStatus.message && (
            <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
              submitStatus.type === "success" 
                ? "bg-green-50 text-green-800 border border-green-200" 
                : "bg-red-50 text-red-800 border border-red-200"
            }`}>
              {submitStatus.type === "success" ? (
                <CheckCircle size={20} className="flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
              )}
              <p className="text-sm">{submitStatus.message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input 
              label="Your Name" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name" 
              required
            />
            <Input 
              label="Your Email" 
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email" 
              required
            />
            <Input 
              label="Phone Number" 
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number" 
              required
            />
            <Input 
              label="Your Address" 
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address" 
              required
            />

            <div>
              <label className="block text-sm font-medium mb-2">
                Your Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1b3163] text-white py-3 rounded-xl text-sm font-medium hover:bg-[#1e8a25] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
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

      {/* ===== MAP SECTION ===== */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Our Location
        </h2>

        <div className="w-full h-[420px] rounded-md overflow-hidden border shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3569.910108157431!2d83.76655197525761!3d26.523015376881567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3993db2d593b5cf7%3A0xb97c591b4a2160b8!2sCHEMICALS%20%26%20ALLIED%20PRODUCTS!5e0!3m2!1sen!2sin!4v1771239484379!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location"
          />
        </div>
      </div>
    </section>
  );
}

/* ===== INFO BOX ===== */
function InfoBox({ icon, title, value }) {
  return (
    <div className="flex gap-4 items-start border border-gray-200 rounded-xl p-6 hover:shadow-md transition bg-white">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 text-white">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <p className="text-sm text-gray-600 mt-1 leading-relaxed">
          {value}
        </p>
      </div>
    </div>
  );
}

/* ===== INPUT FIELD ===== */
function Input({ label, name, type = "text", value, onChange, placeholder, required }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none"
      />
    </div>
  );
}