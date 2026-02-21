"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import {
  FaArrowLeft,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const BlogDetails = () => {
  const { slug } = useParams();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

  // ✅ fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/blog/blogs`
        );

        const data = Array.isArray(res.data)
          ? res.data
          : res.data.blogs;

        setBlogs(data || []);
      } catch (err) {
        setError("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // ✅ find current blog
  const blogData = useMemo(
    () => blogs.find((b) => b.blogSlug === slug),
    [blogs, slug]
  );

  // ✅ latest blogs with slug only
  const latestBlogs = useMemo(
    () =>
      blogs
        .filter((b) => b.blogSlug)
        .slice(0, 4),
    [blogs]
  );

  // ✅ share URL safe for Next.js
  const currentUrl =
    typeof window !== "undefined" ? window.location.href : "";

  // ================= UI STATES =================

  if (loading)
    return (
      <div className="text-center py-20 text-lg font-medium">
        Loading blog...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 py-20">
        {error}
      </div>
    );

  if (!blogData)
    return (
      <div className="text-center py-20 text-2xl font-semibold text-gray-600">
        Blog not found
      </div>
    );

  // ================= MAIN UI =================

  return (
    <div className=" py-14">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">

        {/* ================= MAIN BLOG ================= */}
        <div className="md:col-span-2 bg-white p-8 rounded-xl shadow-sm">

          <Link
            href="/blogs"
            className="flex items-center gap-2 text-gray-500 hover:text-black mb-6"
          >
            <FaArrowLeft />
            Back to Blogs
          </Link>

          <img
            src={`http://localhost:5000${blogData.blogImg}`}
            alt={blogData.blogName}
            className="w-full aspect-ratio rounded-lg object-cover"
          />

          <h1 className="text-4xl font-bold mt-6 leading-tight">
            {blogData.blogName}
          </h1>

          <p className="text-sm text-gray-400 mt-2">
            Published on{" "}
            {new Date(blogData.createdAt).toDateString()}
          </p>

          <div
            className="prose max-w-none mt-6"
            dangerouslySetInnerHTML={{
              __html: blogData.blogDetail,
            }}
          />

          {/* SHARE */}
          <div className="mt-10 border-t pt-6">
            <h3 className="font-semibold mb-4">
              Share this blog
            </h3>

            <div className="flex gap-4 text-white">

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
                target="_blank"
                className="bg-[#1877F2] p-3 rounded-full hover:scale-110 transition"
              >
                <FaFacebookF />
              </a>

              <a
                href={`https://twitter.com/intent/tweet?url=${currentUrl}`}
                target="_blank"
                className="bg-[#1DA1F2] p-3 rounded-full hover:scale-110 transition"
              >
                <FaTwitter />
              </a>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`}
                target="_blank"
                className="bg-[#0A66C2] p-3 rounded-full hover:scale-110 transition"
              >
                <FaLinkedinIn />
              </a>

            </div>
          </div>
        </div>

        {/* ================= SIDEBAR ================= */}
        <div className="bg-white p-6 rounded-xl shadow-sm h-fit sticky top-24">

          <h2 className="text-2xl font-bold mb-6">
            Latest Posts
          </h2>

          <div className="space-y-5">

            {latestBlogs.map((item) => (
              <Link
                key={item._id}
                href={`/blog/${item.blogSlug}`}
                className="flex gap-4 group"
              >
                <img
                  src={`http://localhost:5000${item.blogImg}`}
                  alt={item.blogName}
                  className="rounded-lg object-cover w-20 h-20"
                />

                <div>
                  <h3 className="text-sm font-semibold group-hover:text-blue-600 transition">
                    {item.blogName}
                  </h3>

                  <p className="text-xs text-gray-400">
                    {new Date(item.createdAt).toDateString()}
                  </p>
                </div>
              </Link>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
