// lib/api.js
const API_BASE = 'https://chemicalsallied.in/api/blog';

export async function fetchBlog(id) {
  const res = await fetch(`${API_BASE}/blog/${id}`);
  if (!res.ok) throw new Error('Failed to fetch blog');
  return res.json();
}

export async function createBlog(formData) {
  const res = await fetch(`${API_BASE}/blog`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to create blog');
  }
  return res.json();
}

export async function updateBlog(id, formData) {
  const res = await fetch(`${API_BASE}/blog/${id}`, {
    method: 'PUT',
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to update blog');
  }
  return res.json();
}