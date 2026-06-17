'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createBlog, updateBlog } from '../lib/api';

export default function BlogForm({ initialData = null, blogId = null }) {
  const router = useRouter();
  const [form, setForm] = useState({
    blogName: '',
    blogSlug: '',
    blogDate: '',
    blogDetail: '',
    metaTitle: '',
    metaDescription: '',
    metatag: '',
    blogImg: '',        // existing image URL (if editing)
    _file: null,        // new file object (if uploaded)
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState('');

  // Populate form when editing
  useEffect(() => {
    if (initialData) {
      setForm({
        blogName: initialData.blogName || '',
        blogSlug: initialData.blogSlug || '',
        blogDate: initialData.blogDate || '',
        blogDetail: initialData.blogDetail || '',
        metaTitle: initialData.metaTitle || '',
        metaDescription: initialData.metaDescription || '',
        metatag: initialData.metatag || '',


        blogImg: initialData.blogImg
          ? `https://chemicalsallied.in${initialData.blogImg}`
          : '',
        _file: null,
      });
      setPreview(initialData.blogImg ? `https://chemicalsallied.in${initialData.blogImg}` : '');
    } else {
      // Set default date to today for new blog
      const today = new Date().toISOString().split('T')[0];
      setForm((prev) => ({ ...prev, blogDate: today }));
    }
  }, [initialData]);

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Auto‑generate slug from title (only if slug is empty or untouched)
    if (name === 'blogName' && !form.blogSlug) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setForm((prev) => ({ ...prev, blogSlug: slug }));
    }
  };

  // Handle image file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be under 5MB');
      e.target.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target.result);
    reader.readAsDataURL(file);
    setForm((prev) => ({ ...prev, _file: file }));
  };

  // Manual slug generation button
  const generateSlug = () => {
    if (!form.blogName) {
      setError('Enter a title first');
      return;
    }
    const slug = form.blogName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setForm((prev) => ({ ...prev, blogSlug: slug }));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate required fields
    if (!form.blogName || !form.blogSlug || !form.blogDate || !form.blogDetail) {
      setError('Please fill in all required fields (*)');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('blogName', form.blogName);
      formData.append('blogSlug', form.blogSlug);
      formData.append('blogDate', form.blogDate);
      formData.append('blogDetail', form.blogDetail);
      formData.append('metaTitle', form.metaTitle || '');
      formData.append('metaDescription', form.metaDescription || '');
      formData.append('metatag', form.metatag || '');

      // Handle image: if a new file is selected, send it; otherwise keep existing URL
      if (form._file) {
        formData.append('blogImg', form._file);
      } else if (form.blogImg && typeof form.blogImg === 'string' && !form.blogImg.startsWith('data:')) {
        // existing image URL (from server)
        formData.append('blogImg', form.blogImg);
      }

      if (blogId) {
        await updateBlog(blogId, formData);
      } else {
        await createBlog(formData);
      }

      // Success – redirect to blog list
      router.push('/admin/list-blog');
      router.refresh();
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Image Upload with Preview */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Blog Image
        </label>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-32 h-32 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center overflow-hidden flex-shrink-0">
            {preview ? (
              <img src={preview} className="w-full h-full object-cover" alt="preview" />
            ) : (
              <span className="text-slate-400 text-xs text-center px-2">
                <span className="text-2xl block mb-1">🖼️</span>
                No image
              </span>
            )}
          </div>
          <div className="flex-1">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
            <p className="text-xs text-slate-400 mt-1">PNG, JPG, WEBP up to 5MB</p>
          </div>
        </div>
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Blog Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="blogName"
          value={form.blogName}
          onChange={handleChange}
          required
          className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          placeholder="Enter blog title"
        />
      </div>

      {/* Slug with Generate button */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Slug <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            name="blogSlug"
            value={form.blogSlug}
            onChange={handleChange}
            required
            className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="e.g. my-awesome-blog"
          />
          <button
            type="button"
            onClick={generateSlug}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition whitespace-nowrap"
          >
            ✨ Generate
          </button>
        </div>
        <p className="text-xs text-slate-400 mt-1">URL-friendly version of the title</p>
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Blog Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          name="blogDate"
          value={form.blogDate}
          onChange={handleChange}
          required
          className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Blog Content <span className="text-red-500">*</span>
        </label>
        <textarea
          name="blogDetail"
          value={form.blogDetail}
          onChange={handleChange}
          rows="8"
          required
          className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-y"
          placeholder="Write your blog content here…"
        />
      </div>

      {/* SEO Meta Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Meta Title</label>
          <input
            type="text"
            name="metaTitle"
            value={form.metaTitle}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="SEO meta title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Meta Tag</label>
          <input
            type="text"
            name="metatag"
            value={form.metatag}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="SEO meta tag"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Meta Description</label>
        <textarea
          name="metaDescription"
          value={form.metaDescription}
          onChange={handleChange}
          rows="2"
          className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-y"
          placeholder="SEO meta description (recommended 150‑160 chars)"
        />
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition flex items-center gap-2 disabled:opacity-70"
        >
          {loading ? (
            <>
              <span className="animate-spin">⏳</span> Saving…
            </>
          ) : blogId ? (
            <>💾 Update Blog</>
          ) : (
            <>➕ Publish Blog</>
          )}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/list-blog')}
          className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}