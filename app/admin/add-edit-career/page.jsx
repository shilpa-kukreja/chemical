// app/admin/add-edit-career/page.jsx
"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import AdminLayout from "../components/layout";

// Job type and experience options
const jobTypeOptions = [
  "Full-time",
  "Part-time",
  "Contract",
  "Freelance",
  "Internship",
  "Remote",
  "Hybrid",
];

const experienceOptions = [
  "Entry Level",
  "Junior (1-2 years)",
  "Mid-Level (3-5 years)",
  "Senior (5+ years)",
  "Lead (7+ years)",
  "Executive",
];

const AddEditCareerPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  const [loading, setLoading] = useState(!!editId);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");


    // const NEXT_PUBLIC_BACKEND_URL="http://localhost:5001";
    const NEXT_PUBLIC_BACKEND_URL="https://chemicalsallied.in";

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    type: "",
    description: "",
    tags: "",
    salary: "",
    experience: "",
    applicationDeadline: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});

  // Fetch career data when editing
  useEffect(() => {
    if (!editId) return;

    const fetchCareer = async () => {
      try {
        const { data } = await axios.get(
          `${NEXT_PUBLIC_BACKEND_URL}/api/career/careers/${editId}`,
        );
        setFormData({
          title: data.title || "",
          location: data.location || "",
          type: data.type || "",
          description: data.description || "",
          tags: data.tags ? data.tags.join(", ") : "",
          salary: data.salary || "",
          experience: data.experience || "",
          applicationDeadline: data.applicationDeadline || "",
        });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load career");
      } finally {
        setLoading(false);
      }
    };

    fetchCareer();
  }, [editId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validate form
  const validate = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = "Job title is required";
    if (!formData.location.trim()) errors.location = "Location is required";
    if (!formData.type.trim()) errors.type = "Job type is required";
    if (!formData.description.trim())
      errors.description = "Job description is required";
    if (formData.description.replace(/<[^>]*>/g, "").length < 20)
      errors.description = "Description must be at least 20 characters";
    if (
      formData.applicationDeadline &&
      new Date(formData.applicationDeadline) < new Date()
    )
      errors.applicationDeadline = "Deadline must be in the future";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
      };

      const url = `${NEXT_PUBLIC_BACKEND_URL}/api/career/careers`;
      if (editId) {
        await axios.put(`${url}/${editId}`, payload);
        toast.success("Career updated successfully! 🎉");
      } else {
        await axios.post(url, payload);
        toast.success("Career created successfully! 🎉");
      }

      setTimeout(() => router.push("/admin/list-career"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving career");
    } finally {
      setSubmitting(false);
    }
  };

  // Cancel and go back
  const handleCancel = () => {
    router.push("/admin/list-career");
  };

  // Loading state
  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600">Loading career...</span>
        </div>
      </AdminLayout>
    );
  }

  // Error state
  if (error) {
    return (
      <AdminLayout>
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      </AdminLayout>
    );
  }

  // Main form
  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
        <h2 className="text-xl font-semibold text-slate-800 mb-6">
          {editId ? "Edit Career Opportunity" : "Create New Career Opportunity"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Senior Frontend Developer"
              className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                fieldErrors.title ? "border-red-500" : "border-gray-300"
              }`}
            />
            {fieldErrors.title && (
              <p className="mt-1 text-sm text-red-500">{fieldErrors.title}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., New York, NY or Remote"
              className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                fieldErrors.location ? "border-red-500" : "border-gray-300"
              }`}
            />
            {fieldErrors.location && (
              <p className="mt-1 text-sm text-red-500">
                {fieldErrors.location}
              </p>
            )}
          </div>

          {/* Job Type & Experience (side by side) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700"
              >
                Job Type <span className="text-red-500">*</span>
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  fieldErrors.type ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Type</option>
                {jobTypeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {fieldErrors.type && (
                <p className="mt-1 text-sm text-red-500">{fieldErrors.type}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="experience"
                className="block text-sm font-medium text-gray-700"
              >
                Experience Level
              </label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Experience</option>
                {experienceOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Salary & Deadline (side by side) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="salary"
                className="block text-sm font-medium text-gray-700"
              >
                Salary Range
              </label>
              <input
                type="text"
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="e.g., $80,000 - $120,000"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="applicationDeadline"
                className="block text-sm font-medium text-gray-700"
              >
                Application Deadline
              </label>
              <input
                type="date"
                id="applicationDeadline"
                name="applicationDeadline"
                value={formData.applicationDeadline}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  fieldErrors.applicationDeadline
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {fieldErrors.applicationDeadline && (
                <p className="mt-1 text-sm text-red-500">
                  {fieldErrors.applicationDeadline}
                </p>
              )}
            </div>
          </div>

          {/* Description (textarea) */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={6}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the role, responsibilities, requirements..."
              className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                fieldErrors.description ? "border-red-500" : "border-gray-300"
              }`}
            />
            {fieldErrors.description && (
              <p className="mt-1 text-sm text-red-500">
                {fieldErrors.description}
              </p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Minimum 20 characters (currently{" "}
              {formData.description.replace(/<[^>]*>/g, "").length})
            </p>
          </div>

          {/* Tags */}
          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700"
            >
              Skills & Technologies (comma separated)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g., React, Node.js, AWS"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="mt-1 text-xs text-gray-500">
              Separate tags with commas
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {submitting ? (
                <>
                  <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                  {editId ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>{editId ? "Update Career" : "Create Career"}</>
              )}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={submitting}
              className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default function AddEditCareerPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddEditCareerPageContent />
    </Suspense>
  );
}
