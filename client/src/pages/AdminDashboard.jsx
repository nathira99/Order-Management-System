import { useEffect, useState } from "react";
import { getStats, getPayments } from "../services/adminApi";
import AdminLayout from "../pages/admin/AdminLayout";
import axios from "axios";
import API from "../config/api";
import { getToken } from "../utils/auth";

function AdminDashboard() {
  const token = getToken();

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [courseStats, setCourseStats] = useState(null);
  const [stats, setStats] = useState(null);
  const [payments, setPayments] = useState([]);

  // const API = import.meta.env.REACT_APP_API_URL;

  // Course stats
  useEffect(() => {
    axios
      .get(`${API}/api/courses/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCourseStats(res.data))
      .catch((err) => console.error("COURSE STATS ERROR:", err));
  }, [token]);

  useEffect(() => {
    const load = async () => {
      try {
        const statsRes = await getStats(token);
        const payRes = await getPayments(token, page);

        setStats(statsRes.data);
        setPayments(
          Array.isArray(payRes.data.payments) ? payRes.data.payments : []
        );
        setPages(payRes.data.pagination.pages);
      } catch (err) {
        console.error("ADMIN DASHBOARD ERROR:", err);
        setPayments([]); //  safety
      }
    };

    load();
  }, [token, page]);

  return (
    <AdminLayout>
      {/* Page Title */}
      <h1 className="text-3xl font-medium text-gray-800 mb-8">
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
      {stats && courseStats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard
            label="Total Revenue"
            value={`₹${stats.totalRevenue / 100}`}
          />
          <StatCard label="Total Payments" value={stats.totalPayments} />
          <StatCard label="Active Courses" value={courseStats.activeCourses} />
        </div>
      )}

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-medium">Recent Payments</h2>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Course</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p._id} className="border-t hover:bg-slate-50">
                <td className="px-4 py-3">{p.user?.email || "—"}</td>
                <td className="px-4 py-3">{p.course?.title || "—"}</td>
                <td className="px-4 py-3">₹{p.amount / 100}</td>
                <td className="px-4 py-3">
                  {new Date(p.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <span className="px-3 py-1 text-xs rounded-full bg-emerald-100 text-emerald-700">
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-6 py-4 border-t bg-slate-50">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className={`px-4 py-2 text-sm rounded ${
              page === 1
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-white border hover:bg-slate-100"
            }`}
          >
            Previous
          </button>

          <span className="text-sm text-slate-600">
            Page {page} of {pages}
          </span>

          <button
            disabled={page === pages}
            onClick={() => setPage((p) => p + 1)}
            className={`px-4 py-2 text-sm rounded ${
              page === pages
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-white border hover:bg-slate-100"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
  );
}

export default AdminDashboard;
