// app/careers/page.jsx
"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

export default function CareersListPage() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    position: "",
    coverLetter: "",
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const fileInputRef = useRef(null);
  const NEXT_PUBLIC_BACKEND_URL = "https://chemicalsallied.in";
    // const NEXT_PUBLIC_BACKEND_URL = "http://localhost:5001";

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const { data } = await axios.get(
          `${NEXT_PUBLIC_BACKEND_URL}/api/career/careers`
        );
        setCareers(data);
      } catch (err) {
        setError("Failed to load careers");
        toast.error("Failed to load careers");
      } finally {
        setLoading(false);
      }
    };
    fetchCareers();
  }, []);

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleApplyClick = (career) => {
    setSelectedCareer(career);
    setFormData({
      fullname: "",
      email: "",
      phone: "",
      position: career.title,
      coverLetter: "",
    });
    setResumeFile(null);
    setFormErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const closeModal = () => {
    setSelectedCareer(null);
    setFormData({
      fullname: "",
      email: "",
      phone: "",
      position: "",
      coverLetter: "",
    });
    setResumeFile(null);
    setFormErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowed = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowed.includes(file.type)) {
        toast.error("Please upload a PDF, DOC, or DOCX file");
        e.target.value = "";
        return;
      }
      setResumeFile(file);
      if (formErrors.resume) setFormErrors((prev) => ({ ...prev, resume: "" }));
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.fullname.trim()) errors.fullname = "Full name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Email is invalid";
    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    if (!formData.position.trim()) errors.position = "Position is required";
    if (!resumeFile) errors.resume = "Please upload your resume";
    else if (resumeFile.size > 5 * 1024 * 1024)
      errors.resume = "Resume must be smaller than 5MB";
    if (!formData.coverLetter.trim())
      errors.coverLetter = "Cover letter is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setSubmitting(true);
    try {
      const payload = new FormData();
      payload.append("fullname", formData.fullname);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      payload.append("position", formData.position);
      payload.append("coverLetter", formData.coverLetter);
      payload.append("resume", resumeFile);

      await axios.post(
        `${NEXT_PUBLIC_BACKEND_URL}/api/careerform/carrer-forms`,
        payload,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Application submitted successfully! 🎉");
      closeModal();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit application");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading careers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded max-w-md">
          <p className="text-sm text-red-700">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 text-sm text-blue-600 hover:underline"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-slate-800">Career Opportunities</h1>
            <p className="text-gray-600 mt-2">Find your next role and apply today</p>
          </div>

          {careers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No career opportunities available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {careers.map((career) => (
                <div
                  key={career._id}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col"
                >
                  <div className="p-6 flex-1">
                    <h2 className="text-xl font-bold text-slate-800 mb-2">
                      {career.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-3">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {career.location}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {career.type}
                      </span>
                      {career.experience && (
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {career.experience}
                        </span>
                      )}
                    </div>

                    {/* New fields: Age, Working Hours, Qualification */}
                    {career.age && (
                      <p className="text-sm text-gray-600 mb-1">👤 Age: {career.age}</p>
                    )}
                    {career.workingHours && (
                      <p className="text-sm text-gray-600 mb-1">🕒 Working Hours: {career.workingHours}</p>
                    )}
                    {career.qualification && (
                      <p className="text-sm text-gray-600 mb-2">🎓 Qualification: {career.qualification}</p>
                    )}

                    <div className="flex flex-wrap gap-1 mb-3">
                      {(career.tags || []).slice(0, 4).map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {tag}
                        </span>
                      ))}
                      {(career.tags || []).length > 4 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          +{(career.tags || []).length - 4}
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-700 line-clamp-3">
                      {career.description}
                    </p>
                  </div>

                  <div className="px-6 pb-6">
                    <button
                      onClick={() => handleApplyClick(career)}
                      className="w-full inline-flex justify-center items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal Overlay - unchanged */}
      {selectedCareer && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    Apply for {selectedCareer.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Fill out the form below to submit your application
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formErrors.fullname ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {formErrors.fullname && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.fullname}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formErrors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formErrors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {formErrors.phone && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                    Position <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                    readOnly
                  />
                </div>

                <div>
                  <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
                    Resume (PDF, DOC, DOCX) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    id="resume"
                    ref={fileInputRef}
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${
                      formErrors.resume ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {formErrors.resume && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.resume}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">Max size: 5MB</p>
                </div>

                <div>
                  <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">
                    Cover Letter <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="coverLetter"
                    name="coverLetter"
                    rows={4}
                    value={formData.coverLetter}
                    onChange={handleChange}
                    placeholder="Tell us why you're a great fit for this role..."
                    className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      formErrors.coverLetter ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {formErrors.coverLetter && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.coverLetter}</p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    {submitting ? (
                      <>
                        <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                        Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={submitting}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}