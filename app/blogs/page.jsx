"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/blog/blogs`
        );

        if (Array.isArray(res.data)) {
          setBlogs(res.data);
        } else if (Array.isArray(res.data.blogs)) {
          setBlogs(res.data.blogs);
        } else {
          setBlogs([]);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load blogs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className=" text-gray-800">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl font-bold text-[#1b3163] mb-3">Our Blog</h1>
        <p className="text-white max-w-2xl mx-auto">
          Insights, guides, and expert knowledge.
        </p>
      </div>

      {loading && <p className="text-center">Loading blogs...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && blogs.length === 0 && (
        <p className="text-center">No blogs available.</p>
      )}

      {/* BLOG GRID */}
      <div className="grid md:grid-cols-2  lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-5 sm:px-16 pb-20">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </section>
  );
}

/* BLOG CARD */

function BlogCard({ blog }) {
  const imageUrl = blog.blogImg
    ? `${API_BASE_URL}${blog.blogImg}`
    : "/placeholder.jpg";

  return (
    <Link
      href={`/blog/${blog.blogSlug}`}
      className="group bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition flex flex-col"
    >
      {/* IMAGE — FULL SHOW, NO CROP */}
      <div className="w-full h-[300px] bg-gray-100">
        <img
          src={imageUrl}
          alt={blog.blogName || "Blog image"}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* CONTENT */}
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-sm font-semibold text-gray-500 mb-2">
          11 March 2025
        </p>

        <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#1e8a25] transition line-clamp-2">
          {blog.blogName}
        </h3>

        <div
          className="text-gray-600 text-sm mt-3 line-clamp-3 flex-grow"
          dangerouslySetInnerHTML={{
            __html: blog.blogDetail?.substring(0, 150),
          }}
        />

        <button className="mt-5 px-5 py-2 bg-[#1e8a25] text-white font-semibold rounded-full hover:bg-[#b8865b] transition">
          Read More →
        </button>
      </div>
    </Link>
  );
}


