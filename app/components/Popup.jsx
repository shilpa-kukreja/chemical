// components/Popup.jsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Popup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if popup was closed during this session
    const popupClosed = sessionStorage.getItem("popupClosed");
    if (!popupClosed) {
      // Show after a small delay for smoother page load
      const timer = setTimeout(() => setIsOpen(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    // Remember that the user closed it for this session only
    sessionStorage.setItem("popupClosed", "true");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden animate-fadeInUp">
        {/* Close button */}
        <button
          onClick={closePopup}
          className="absolute top-3 right-3 z-10 text-gray-500 hover:text-gray-700 bg-white/80 rounded-full p-1.5 transition"
          aria-label="Close popup"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Image */}
        <div className="relative w-full h-64 bg-gray-100">
          <Image
            src="/popup/image.jpeg" // change to your image path
            alt="Special offer"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <h3 className="text-2xl font-bold text-slate-800 mb-2">
            Partner With Us
          </h3>
          <p className="text-gray-600 mb-6">
            Grow your business with quality products at competitive bulk prices.
          </p>

          {/* Contact Us Button */}
          <a
            href="mailto:hr@chemicalsallied.in?subject=Website%20Inquiry"
            onClick={closePopup}
            className="inline-block w-full py-3 bg-[#1B3163] hover:bg-[#102147] text-white font-semibold rounded-lg transition duration-200 shadow-md hover:shadow-lg text-center"
          >
             Become a Distributor →
          </a>
        </div>
      </div>
    </div>
  );
}