"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

/* ===================== FAQ DATA ===================== */
const faqs = [
  {
    id: 1,
    question: "What products does your company primarily manufacture?",
    answer:
      "We manufacture a wide range of agricultural herbicides, insecticides, and soil enrichment formulations designed to protect crops, control weeds and pests, and enhance overall agricultural productivity.",
  },
  {
    id: 2,
    question: "Do you supply products internationally?",
    answer:
      "Yes, along with serving the domestic Indian market, we export our agrochemical products to selected countries across Asia and Africa, ensuring compliance with international trade and quality standards.",
  },
  {
    id: 3,
    question: "How do you ensure product quality and consistency?",
    answer:
      "Every formulation undergoes strict quality control checks, including raw material inspection, batch testing, and stability validation to ensure safe, effective, and consistent field performance.",
  },
  {
    id: 4,
    question: "What types of packaging do you offer?",
    answer:
      "We provide customized packaging solutions in liquid, powder, and granulated formats, tailored to distributor requirements and export regulations.",
  },
  {
    id: 5,
    question: "What is your manufacturing experience?",
    answer:
      "Established in 1974, we bring over five decades of industry expertise in agrochemical manufacturing, supported by structured production systems and professional management.",
  },
  {
    id: 6,
    question: " Which industries or sectors do your products serve?",
    answer:
      "Our products primarily serve the agricultural sector, including farmers, agro distributors, retailers, and international import partners seeking reliable crop protection solutions.",
  },
  
];

/* ===================== MAIN SECTION ===================== */
export default function FAQSection() {
  // 1st FAQ open by default
  const [activeId, setActiveId] = useState(1);

  const leftFaqs = faqs.filter((_, i) => i % 2 === 0);
  const rightFaqs = faqs.filter((_, i) => i % 2 !== 0);

  // toggle logic
  const handleToggle = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section className=" py-10">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="max-w-3xl mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1b3163] mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-white text-base md:text-lg">
            Clear answers to common questions about our agrochemical products, manufacturing standards, and export services.
          </p>
        </div>

        {/* Two Independent Columns */}
        <div className="flex flex-col md:flex-row gap-8">

          <div className="flex-1 flex flex-col gap-5">
            {leftFaqs.map((faq) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isActive={activeId === faq.id}
                onClick={() => handleToggle(faq.id)}
              />
            ))}
          </div>

          <div className="flex-1 flex flex-col gap-5">
            {rightFaqs.map((faq) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isActive={activeId === faq.id}
                onClick={() => handleToggle(faq.id)}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

/* ===================== FAQ ITEM ===================== */
function FAQItem({ faq, isActive, onClick }) {
  return (
    <div
      className={`rounded-md border transition-all duration-300 ${
        isActive
          ? "border-gray-400 bg-white shadow-sm"
          : "border-gray-400 bg-white hover:border-gray-500"
      }`}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between px-6 py-4 text-left"
      >
        <span className="font-medium text-gray-900 text-base md:text-lg">
          {faq.id}. {faq.question}
        </span>

        {/* Icon */}
        <span
          className={`ml-4 flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 ${
            isActive
              ? "border-gray-300 text-gray-500 rotate-90"
              : "border-gray-300 text-gray-500"
          }`}
        >
          <Plus size={18} />
        </span>
      </button>

      {/* Smooth Accordion */}
      <div
        className={`grid overflow-hidden transition-all space-y-1 duration-300 ${
          isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden px-6  text-gray-600 text-sm md:text-base leading-relaxed">
          {faq.answer}
        </div>
      </div>
    </div>
  );
}
