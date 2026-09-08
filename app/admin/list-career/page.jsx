// app/admin/career-list/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import AdminLayout from "../components/layout";

export default function CareerListPage() {
  const router = useRouter();
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // const NEXT_PUBLIC_BACKEND_URL = "https://chemicalsallied.in";
    const NEXT_PUBLIC_BACKEND_URL = "http://localhost:5001";

  // Fetch all careers
  const fetchCareers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${NEXT_PUBLIC_BACKEND_URL}/api/career/careers`
      );
      console.log("career data", data);
      setCareers(data);
      setError("");
    } catch (err) {
      setError("Failed to load career opportunities");
      toast.error("Failed to load careers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  // Delete handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this career?")) return;
    setDeletingId(id);
    try {
      await axios.delete(
        `${NEXT_PUBLIC_BACKEND_URL}/api/career/careers/${id}`
      );
      toast.success("Career deleted successfully");
      fetchCareers();
    } catch (err) {
      toast.error("Failed to delete career");
    } finally {
      setDeletingId(null);
    }
  };

  // Edit – navigate to add-edit page with id
  const handleEdit = (id) => {
    router.push(`/admin/add-edit-career?id=${id}`);
  };

  // View details – fetch and open modal
  const handleView = async (id) => {
    try {
      const { data } = await axios.get(
        `${NEXT_PUBLIC_BACKEND_URL}/api/career/careers/${id}`
      );
      setSelectedCareer(data);
      setIsModalOpen(true);
    } catch (err) {
      toast.error("Failed to load career details");
    }
  };

  // Export to Excel – added Qualification
  const handleExport = () => {
    if (careers.length === 0) {
      toast.warning("No careers to export");
      return;
    }
    setIsExporting(true);
    try {
      const exportData = careers.map((c) => ({
        Title: c.title,
        Location: c.location,
        Type: c.type,
        Experience: c.experience || "N/A",
        Age: c.age || "N/A",
        "Working Hours": c.workingHours || "N/A",
        Qualification: c.qualification || "N/A",
        Status: c.isActive ? "Active" : "Inactive",
        Tags: c.tags?.join(", ") || "",
      }));
      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Careers");
      XLSX.writeFile(wb, "careers.xlsx");
      toast.success("Exported successfully");
    } catch (err) {
      toast.error("Export failed");
    } finally {
      setIsExporting(false);
    }
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Status badge – now based on isActive
  const getStatusBadge = (career) => {
    if (career.isActive === false) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          Inactive
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        Active
      </span>
    );
  };

  // Loading state
  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600">Loading careers...</span>
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
          <button
            onClick={fetchCareers}
            className="mt-2 text-sm text-blue-600 hover:underline"
          >
            Retry
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">
              Career Opportunities
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage all your job postings
            </p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <button
              onClick={() => router.push("/admin/add-edit-career")}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add New
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting || careers.length === 0}
              className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 transition ${
                isExporting || careers.length === 0
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500"
              }`}
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              {isExporting ? "Exporting..." : "Export Excel"}
            </button>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
            <p className="text-sm text-gray-500">Total Jobs</p>
            <p className="text-2xl font-bold text-slate-800">{careers.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
            <p className="text-sm text-gray-500">Active</p>
            <p className="text-2xl font-bold text-slate-800">
              {careers.filter((c) => c.isActive !== false).length}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
            <p className="text-sm text-gray-500">Inactive</p>
            <p className="text-2xl font-bold text-slate-800">
              {careers.filter((c) => c.isActive === false).length}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
            <p className="text-sm text-gray-500">Unique Skills</p>
            <p className="text-2xl font-bold text-slate-800">
              {new Set(careers.flatMap((c) => c.tags || [])).size}
            </p>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {careers.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No career opportunities
              </h3>
              <p className="text-gray-600 mb-4">
                Create your first job posting to get started.
              </p>
              <button
                onClick={() => router.push("/admin/add-edit-career")}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Career
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Job Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type & Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tags
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {careers.map((career) => (
                    <tr key={career._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {career.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          Created {formatDate(career.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{career.type}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <svg
                            className="w-4 h-4 mr-1 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          {career.location}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {(career.tags || []).slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {tag}
                            </span>
                          ))}
                          {(career.tags || []).length > 3 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                              +{(career.tags || []).length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>{getStatusBadge(career)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleView(career._id)}
                            className="text-green-600 hover:text-green-800 focus:outline-none"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleEdit(career._id)}
                            className="text-blue-600 hover:text-blue-800 focus:outline-none"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(career._id)}
                            disabled={deletingId === career._id}
                            className="text-red-600 hover:text-red-800 disabled:opacity-50 focus:outline-none"
                          >
                            {deletingId === career._id ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-4 text-sm text-gray-500 text-center">
          Showing {careers.length} career{careers.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* View Details Modal – added Qualification */}
      {isModalOpen && selectedCareer && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-xl">
            {/* Modal header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold">{selectedCareer.title}</h2>
                  <div className="flex flex-wrap gap-3 mt-1 text-sm text-blue-100">
                    <span>{selectedCareer.location}</span>
                    <span>•</span>
                    <span>{selectedCareer.type}</span>
                    {selectedCareer.experience && (
                      <>
                        <span>•</span>
                        <span>{selectedCareer.experience}</span>
                      </>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-white hover:text-gray-200 transition"
                >
                  <svg
                    className="w-6 h-6"
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
              </div>
            </div>

            {/* Modal body */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)] space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Age Range</h4>
                  <p className="text-gray-900">
                    {selectedCareer.age || "Not specified"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Working Hours</h4>
                  <p className="text-gray-900">
                    {selectedCareer.workingHours || "Not specified"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Qualification</h4>
                  <p className="text-gray-900">
                    {selectedCareer.qualification || "Not specified"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Status</h4>
                  <div>{getStatusBadge(selectedCareer)}</div>
                </div>
                <div className="col-span-2">
                  <h4 className="text-sm font-medium text-gray-500">Created</h4>
                  <p className="text-gray-900">
                    {formatDate(selectedCareer.createdAt)}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">
                  Description
                </h4>
                <div
                  className="prose prose-sm max-w-none bg-gray-50 p-4 rounded border border-gray-200"
                  dangerouslySetInnerHTML={{ __html: selectedCareer.description }}
                />
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">
                  Skills & Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(selectedCareer.tags || []).map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  handleEdit(selectedCareer._id);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Edit Career
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}