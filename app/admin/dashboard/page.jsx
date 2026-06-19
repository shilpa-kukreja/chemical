// import React from 'react'
// import AdminLayout from '../components/layout'

// const page = () => {
//   return (
//     <AdminLayout>
//     <div>

//       dashboard
//     </div>
//     </AdminLayout>
//   )
// }

// export default page
"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AdminLayout from '../components/layout';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/analytics/dashboard-stats');
        setStats(res.data.data);
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  const { blogs, contactEnquiries, productEnquiries } = stats;

  // Prepare data for pie charts
  const contactPieData = Object.entries(contactEnquiries.statusBreakdown).map(([name, value]) => ({
    name,
    value,
  }));

  const enquiryPieData = Object.entries(productEnquiries.statusBreakdown).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28BFF'];

  return (
    <AdminLayout>
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <SummaryCard
          title="Total Blogs"
          count={blogs.total}
          newCount={blogs.newLast7Days}
          icon="📝"
        />
        <SummaryCard
          title="Contact Enquiries"
          count={contactEnquiries.total}
          newCount={contactEnquiries.newLast7Days}
          icon="✉️"
        />
        <SummaryCard
          title="Product Enquiries"
          count={productEnquiries.total}
          newCount={productEnquiries.newLast7Days}
          icon="🛒"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Contact Status" data={contactPieData} colors={COLORS} />
        <ChartCard title="Enquiry Status" data={enquiryPieData} colors={COLORS} />
      </div>

      {/* Recent Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentTable title="Recent Blogs" data={blogs.recent} fields={['blogName', 'createdAt']} />
        <RecentTable title="Recent Contacts" data={contactEnquiries.recent} fields={['name', 'email', 'status']} />
        <RecentTable title="Recent Enquiries" data={productEnquiries.recent} fields={['productName', 'name', 'status']} />
      </div>
    </div>
    </AdminLayout>
  );
};

// ---------- Subcomponents ----------

const SummaryCard = ({ title, count, newCount, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-bold">{count}</p>
      <p className="text-sm text-green-600">+{newCount} new in 7 days</p>
    </div>
    <div className="text-4xl">{icon}</div>
  </div>
);

const ChartCard = ({ title, data, colors }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          fill="#8884d8"
          paddingAngle={2}
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

const RecentTable = ({ title, data, fields }) => {
  // Helper to format date if field is createdAt
  const formatValue = (key, value) => {
    if (key === 'createdAt') {
      return new Date(value).toLocaleDateString();
    }
    return value;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      {data.length === 0 ? (
        <p className="text-gray-500 text-sm">No recent entries</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b">
                {fields.map((field) => (
                  <th key={field} className="text-left py-2 px-2 capitalize">
                    {field === 'createdAt' ? 'Date' : field}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  {fields.map((field) => (
                    <td key={field} className="py-2 px-2">
                      {formatValue(field, item[field])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
