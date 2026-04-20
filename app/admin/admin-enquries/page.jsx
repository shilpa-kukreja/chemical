"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  Download,
  Trash2,
  Edit3,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Phone,
  Mail,
  Calendar
} from "lucide-react";
import AdminLayout from "../components/layout";

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  });
  const [filters, setFilters] = useState({
    status: "all",
    search: "",
    page: 1
  });
  const [stats, setStats] = useState({
    total: 0,
    recent: 0,
    byStatus: {}
  });

  // Fetch enquiries on mount and when filters change
  useEffect(() => {
    fetchEnquiries();
    fetchStats();
  }, [filters.page, filters.status, filters.search]);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      
      const params = new URLSearchParams({
        page: filters.page,
        limit: 10,
        ...(filters.status !== "all" && { status: filters.status }),
        ...(filters.search && { search: filters.search })
      });

      const response = await axios.get(
        `https://chemicalsallied.in/api/enquiries?${params}`
      );

      setEnquiries(response.data.data);
      setPagination(response.data.pagination);
      setError("");
    } catch (error) {
      setError("Failed to fetch enquiries");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(
        `https://chemicalsallied.in/api/enquiries/stats`
      );
      setStats(response.data.data);
    } catch (error) {
      console.error("Failed to fetch stats");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(
        `https://chemicalsallied.in/api/enquiries/${id}`,
        { status: newStatus }
      );
      
      // Refresh data
      fetchEnquiries();
      fetchStats();
    } catch (error) {
      setError("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;

    try {
      await axios.delete(
        `https://chemicalsallied.in/api/enquiries/${id}`
      );
      
      // Refresh data
      fetchEnquiries();
      fetchStats();
    } catch (error) {
      setError("Failed to delete enquiry");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedIds.length} enquiries?`)) return;

    try {
      await axios.post(
        `http:localhost:5000/api/enquiries/bulk-delete`,
        { ids: selectedIds }
      );
      
      setSelectedIds([]);
      fetchEnquiries();
      fetchStats();
    } catch (error) {
      setError("Failed to delete enquiries");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, page: 1 }));
  };

  const handleExport = async () => {
    try {
      const response = await axios.get(
        `https://chemicalsallied.in/api/enquiries?limit=1000`
      );

      // Convert to CSV
      const csv = convertToCSV(response.data.data);
      downloadCSV(csv, `enquiries_${format(new Date(), 'yyyy-MM-dd_HH-mm')}.csv`);
    } catch (error) {
      setError("Failed to export data");
    }
  };

  const convertToCSV = (data) => {
    const headers = ["Date", "Product", "Name", "Email", "Phone", "Requirement", "Status", "Notes"];
    const rows = data.map(item => [
      format(new Date(item.createdAt), 'dd/MM/yyyy HH:mm'),
      item.productName,
      item.name,
      item.email,
      item.phone,
      item.requirement,
      item.status,
      item.notes || ''
    ]);
    
    return [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(","))
      .join("\n");
  };

  const downloadCSV = (csv, filename) => {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(enquiries.map(e => e._id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const viewDetails = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setShowDetailsModal(true);
  };

  const editEnquiry = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setShowEditModal(true);
  };

  const saveEdit = async () => {
    try {
      await axios.put(
        `https://chemicalsallied.in/api/enquiries/${selectedEnquiry._id}`,
        {
          status: selectedEnquiry.status,
          notes: selectedEnquiry.notes
        }
      );
      
      setShowEditModal(false);
      fetchEnquiries();
      fetchStats();
    } catch (error) {
      setError("Failed to update enquiry");
    }
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'contacted':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'spam':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending':
        return <Clock size={16} className="mr-1" />;
      case 'contacted':
        return <Phone size={16} className="mr-1" />;
      case 'resolved':
        return <CheckCircle size={16} className="mr-1" />;
      case 'spam':
        return <XCircle size={16} className="mr-1" />;
      default:
        return null;
    }
  };

  if (loading && enquiries.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading enquiries...</p>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout>
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Enquiry Management</h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage and track all customer enquiries
              </p>
            </div>
            <div className="flex gap-2">
              {selectedIds.length > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                >
                  <Trash2 size={18} />
                  Delete Selected ({selectedIds.length})
                </button>
              )}
              <button
                onClick={handleExport}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 bg-white"
              >
                <Download size={18} />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
            <p className="text-sm text-gray-600">Total Enquiries</p>
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
            <p className="text-sm text-gray-600">Last 7 Days</p>
            <p className="text-3xl font-bold text-green-600">{stats.recent}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-600">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-3xl font-bold text-yellow-600">{stats.byStatus?.pending || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
            <p className="text-sm text-gray-600">Contacted</p>
            <p className="text-3xl font-bold text-blue-600">{stats.byStatus?.contacted || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
            <p className="text-sm text-gray-600">Resolved</p>
            <p className="text-3xl font-bold text-green-600">{stats.byStatus?.resolved || 0}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <form onSubmit={handleSearch} className="flex-1 w-full sm:w-auto">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search by name, email, phone, product..."
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 whitespace-nowrap"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="flex gap-2 w-full sm:w-auto">
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value, page: 1 }))}
                className="flex-1 sm:flex-none px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="contacted">Contacted</option>
                <option value="resolved">Resolved</option>
                <option value="spam">Spam</option>
              </select>

              <button
                onClick={() => {
                  setFilters({ status: "all", search: "", page: 1 });
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 bg-white whitespace-nowrap"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200">
            {error}
          </div>
        </div>
      )}

      {/* Enquiries table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={selectedIds.length === enquiries.length && enquiries.length > 0}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Requirement
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {enquiries.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <Search size={48} className="text-gray-300 mb-3" />
                        <p className="text-lg font-medium">No enquiries found</p>
                        <p className="text-sm">Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  enquiries.map((enquiry) => (
                    <tr key={enquiry._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(enquiry._id)}
                          onChange={() => handleSelectOne(enquiry._id)}
                          className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1 text-gray-400" />
                          {format(new Date(enquiry.createdAt), 'dd/MM/yyyy')}
                        </div>
                        <div className="text-xs text-gray-400">
                          {format(new Date(enquiry.createdAt), 'HH:mm')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="font-medium">{enquiry.productName}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{enquiry.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <Mail size={14} className="mr-1 text-gray-400" />
                          <span className="truncate max-w-[150px]">{enquiry.email}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Phone size={14} className="mr-1 text-gray-400" />
                          {enquiry.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {enquiry.requirement}
                        </div>
                        {enquiry.notes && (
                          <div className="text-xs text-gray-500 mt-1 italic">
                            Note: {enquiry.notes}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={enquiry.status}
                          onChange={(e) => handleStatusChange(enquiry._id, e.target.value)}
                          className={`text-sm rounded-full px-3 py-1 font-semibold border ${getStatusBadgeClass(enquiry.status)}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="contacted">Contacted</option>
                          <option value="resolved">Resolved</option>
                          <option value="spam">Spam</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => viewDetails(enquiry)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => editEnquiry(enquiry)}
                          className="text-green-600 hover:text-green-900 mr-3"
                          title="Edit"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(enquiry._id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{(filters.page - 1) * 10 + 1}</span> to{' '}
                    <span className="font-medium">
                      {Math.min(filters.page * 10, pagination.totalItems)}
                    </span>{' '}
                    of <span className="font-medium">{pagination.totalItems}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
                      disabled={filters.page === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    {[...Array(pagination.totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setFilters(prev => ({ ...prev, page: i + 1 }))}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          filters.page === i + 1
                            ? 'z-10 bg-red-50 border-red-500 text-red-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
                      disabled={filters.page === pagination.totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowDetailsModal(false)} />
          <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 p-6">
            <h3 className="text-xl font-bold mb-4">Enquiry Details</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">Date</label>
                  <p className="font-medium">{format(new Date(selectedEnquiry.createdAt), 'dd MMM yyyy, HH:mm')}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Product</label>
                  <p className="font-medium">{selectedEnquiry.productName}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Name</label>
                  <p className="font-medium">{selectedEnquiry.name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  <p className="font-medium">{selectedEnquiry.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Phone</label>
                  <p className="font-medium">{selectedEnquiry.phone}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Status</label>
                  <p className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(selectedEnquiry.status)}`}>
                    {getStatusIcon(selectedEnquiry.status)}
                    {selectedEnquiry.status}
                  </p>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-500">Requirement</label>
                <p className="font-medium bg-gray-50 p-3 rounded-lg mt-1">{selectedEnquiry.requirement}</p>
              </div>
              {selectedEnquiry.notes && (
                <div>
                  <label className="text-sm text-gray-500">Notes</label>
                  <p className="font-medium bg-gray-50 p-3 rounded-lg mt-1">{selectedEnquiry.notes}</p>
                </div>
              )}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowEditModal(false)} />
          <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-6">
            <h3 className="text-xl font-bold mb-4">Edit Enquiry</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={selectedEnquiry.status}
                  onChange={(e) => setSelectedEnquiry({ ...selectedEnquiry, status: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                >
                  <option value="pending">Pending</option>
                  <option value="contacted">Contacted</option>
                  <option value="resolved">Resolved</option>
                  <option value="spam">Spam</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={selectedEnquiry.notes || ''}
                  onChange={(e) => setSelectedEnquiry({ ...selectedEnquiry, notes: e.target.value })}
                  rows="3"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                  placeholder="Add notes about this enquiry..."
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </AdminLayout>
  );
}