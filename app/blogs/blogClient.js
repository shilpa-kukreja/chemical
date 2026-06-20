"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Calendar, Clock, Tag, ChevronRight } from "lucide-react";

// ─── API BASE ──────────────────────────────────────────────
const API_BASE_URL = "https://chemicalsallied.in";

// ─── HELPER: format date ──────────────────────────────────
const formatDate = (dateStr) => {
  if (!dateStr) return "Coming soon";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// ─── MAIN COMPONENT ──────────────────────────────────────
export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visibleBlogs, setVisibleBlogs] = useState(6);
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef(null);

  // ─── Fetch blogs ──────────────────────────────────────
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/blog/blogs`);
        let fetchedBlogs = [];
        if (Array.isArray(res.data)) fetchedBlogs = res.data;
        else if (res.data.blogs && Array.isArray(res.data.blogs))
          fetchedBlogs = res.data.blogs;
        else if (res.data.data && Array.isArray(res.data.data))
          fetchedBlogs = res.data.data;
        else if (res.data.result && Array.isArray(res.data.result))
          fetchedBlogs = res.data.result;
        else console.warn("Unexpected response:", res.data);

        setBlogs(fetchedBlogs);
      } catch (err) {
        console.error(err);
        setError("Failed to load blogs. Please refresh.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // ─── Load more handler ──────────────────────────────
  const loadMore = () => {
    setVisibleBlogs((prev) => prev + 6);
    setIsExpanded(true);
  };

  // ─── Show limited blogs initially ──────────────────
  const displayedBlogs = blogs.slice(0, visibleBlogs);
  const hasMore = visibleBlogs < blogs.length;

  // ─── Loading skeletons ──────────────────────────────
  if (loading) {
    return (
      <section className="bg-slate-50 min-h-screen py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="h-56 bg-slate-200"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-slate-200 w-1/3 rounded"></div>
                  <div className="h-6 bg-slate-200 w-3/4 rounded"></div>
                  <div className="h-4 bg-slate-200 w-full rounded"></div>
                  <div className="h-4 bg-slate-200 w-2/3 rounded"></div>
                  <div className="h-10 bg-slate-200 w-1/2 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ─── Error state ──────────────────────────────────────
  if (error) {
    return (
      <section className="bg-slate-50 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl">
          <div className="text-5xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-slate-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-[#1e8a25] text-white rounded-full hover:bg-[#b8865b] transition"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  // ─── No blogs ──────────────────────────────────────────
  if (!loading && blogs.length === 0) {
    return (
      <section className="bg-slate-50 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl">
          <div className="text-5xl mb-4">📝</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            No blogs yet
          </h2>
          <p className="text-slate-600">
            Check back soon for new insights and stories.
          </p>
        </div>
      </section>
    );
  }

  // ─── Main render ──────────────────────────────────────
  return (
    <section className="min-h-screen py-12 px-4">
      {/* ─── HERO SECTION ────────────────────────────────────── */}
      <div className="relative max-w-7xl mx-auto mb-16 rounded-3xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1b3163] to-[#2a4a7f] opacity-90"></div>
        
        <div className="relative z-10 py-20 px-6 md:px-12 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight drop-shadow-lg">
            Our <span className="text-[#1e8a25]">Blog</span>
          </h1>
          <p className="max-w-2xl mx-auto mt-4 text-lg md:text-xl text-white/80">
            Expert insights, industry news, and practical guides to help you
            stay ahead.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
              <Tag size={16} /> {blogs.length} Articles
            </span>
          </div>
        </div>
        {/* decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60V40C240 20 480 0 720 20C960 40 1200 20 1440 0V60H0Z" fill="#f8fafc" />
          </svg>
        </div>
      </div>

      {/* ─── BLOG GRID ───────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedBlogs.map((blog, index) => (
            <BlogCard key={blog._id || blog.id} blog={blog} index={index} />
          ))}
        </div>

        {/* ─── LOAD MORE ────────────────────────────────────── */}
        {hasMore && (
          <div className="text-center mt-12">
            <button
              onClick={loadMore}
              className="group inline-flex items-center gap-2 px-8 py-3 bg-[#1b3163] hover:bg-[#2a4a7f] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span>Load More</span>
              <ChevronRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        )}

        {/* ─── SHOW ALL / BACK TO TOP (optional) ───────────── */}
        {isExpanded && (
          <div className="text-center mt-4">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setVisibleBlogs(6);
                setIsExpanded(false);
              }}
              className="text-sm text-slate-500 hover:text-[#1b3163] transition"
            >
              ↑ Collapse
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── BLOG CARD COMPONENT ──────────────────────────────────
function BlogCard({ blog, index }) {
  const imageUrl = blog.blogImg
    ? `${API_BASE_URL}${blog.blogImg}`
    : "/placeholder.jpg";

  // Use metatag as category if available, else default
  const category = blog.metatag || "General";
  const displayDate = formatDate(blog.blogDate);
  const readingTime = Math.ceil((blog.blogDetail?.length || 0) / 1000); // rough estimate

  return (
    <div
      className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 hover:border-[#1e8a25]/20 flex flex-col transform hover:-translate-y-1"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* ─── IMAGE CONTAINER ──────────────────────────────── */}
      <Link href={`/blog/${blog.blogSlug}`} className="block relative overflow-hidden">
        <div className="w-full h-64 bg-slate-200 relative">
          <img
            src={imageUrl}
            alt={blog.blogName || "Blog post"}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            onError={(e) => (e.target.src = "/placeholder.jpg")}
          />
          {/* gradient overlay at bottom for text readability (optional) */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          {/* Category badge */}
          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#1b3163] text-xs font-bold px-3 py-1 rounded-full shadow-md">
            {category}
          </span>
        </div>
      </Link>

      {/* ─── CONTENT ────────────────────────────────────────── */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Meta info */}
        <div className="flex items-center gap-3 text-sm text-slate-500 mb-2">
          <span className="inline-flex items-center gap-1">
            <Calendar size={14} /> {displayDate}
          </span>
          <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
          <span className="inline-flex items-center gap-1">
            <Clock size={14} /> {readingTime} min read
          </span>
        </div>

        {/* Title */}
        <Link href={`/blog/${blog.blogSlug}`} className="block">
          <h3 className="text-xl font-bold text-slate-800 group-hover:text-[#1e8a25] transition line-clamp-2">
            {blog.blogName}
          </h3>
        </Link>

        {/* Excerpt */}
        <div
          className="text-slate-600 text-sm mt-3 line-clamp-3 flex-grow"
          dangerouslySetInnerHTML={{
            __html: blog.blogDetail?.substring(0, 180) || "No description",
          }}
        />

        {/* Read More button */}
        <Link
          href={`/blog/${blog.blogSlug}`}
          className="mt-5 self-start inline-flex items-center gap-2 px-5 py-2.5 bg-[#1e8a25] text-white font-semibold rounded-full hover:bg-[#1e8a25] transition-all duration-300 group-hover:shadow-md"
        >
          <span>Read More</span>
          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}