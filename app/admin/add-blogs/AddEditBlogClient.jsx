"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchBlog } from "../lib/api";
import AdminLayout from "../components/layout";
import BlogForm from "../components/BlogForm";

export default function AddEditBlogClient() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      fetchBlog(id)
        .then((data) => {
          setBlog(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message || "Failed to load blog");
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600">Loading blog...</span>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
        <h2 className="text-xl font-semibold text-slate-800 mb-6">
          {id ? "Edit Blog" : "Create New Blog"}
        </h2>

        <BlogForm initialData={blog} blogId={id} />
      </div>
    </AdminLayout>
  );
}