import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStats, getPayments } from "../services/adminApi";
import { getToken } from "../utils/auth";

function AdminDashboard() {
  const token = getToken();

  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsRes = await getStats(token);
        const paymentsRes = await getPayments(token);

        setStats(statsRes.data);
        setOrders(paymentsRes.data);
      } catch (err) {
        console.error("Admin dashboard error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-medium text-slate-900">
            Admin Dashboard
          </h1>
          <p className="text-slate-600 mt-1">
            Manage courses, payments, and platform activity
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mb-10">
          <Link
            to="/admin/add-course"
            className="px-5 py-2.5 rounded bg-slate-800 text-white hover:bg-slate-900 transition"
          >
            + Add Course
          </Link>

          <Link
            to="/admin/courses"
            className="px-5 py-2.5 rounded border border-slate-300 text-slate-700 hover:bg-white transition"
          >
            Manage Courses
          </Link>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <p className="text-sm text-slate-500">Total Revenue</p>
              <p className="text-2xl font-semibold text-slate-900 mt-2">
                ₹{stats.totalRevenue / 100}
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <p className="text-sm text-slate-500">Total Payments</p>
              <p className="text-2xl font-semibold text-slate-900 mt-2">
                {stats.totalPayments}
              </p>
            </div>
          </div>
        )}

        {/* Payments Table */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
  <div className="px-6 py-4 border-b flex items-center justify-between">
    <h2 className="text-lg font-medium text-slate-900">
      Recent Payments
    </h2>
    <span className="text-sm text-slate-500">
      {orders.length} records
    </span>
  </div>

  {loading ? (
    <div className="p-6 text-slate-500">Loading payments…</div>
  ) : orders.length === 0 ? (
    <div className="p-6 text-slate-500">No payments found.</div>
  ) : (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-slate-600 border-b">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Date</th>
            <th className="px-4 py-3 text-left font-medium">Order ID</th>
            <th className="px-4 py-3 text-left font-medium">User</th>
            <th className="px-4 py-3 text-left font-medium">Course</th>
            <th className="px-4 py-3 text-right font-medium">Amount</th>
            <th className="px-4 py-3 text-center font-medium">Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr
              key={o._id}
              className="border-b last:border-0 hover:bg-slate-50 transition"
            >
              <td className="px-4 py-3 text-xs text-slate-500">
                {formatDate(o.createdAt)}
              </td>
              {/* Order ID */}
              <td className="px-4 py-3 text-xs text-slate-500">
                {o._id}
              </td>

              {/* User */}
              <td className="px-4 py-3 text-slate-700">
                {o.user?.email || "—"}
              </td>

              {/* Course */}
              <td className="px-4 py-3 text-slate-700">
                {o.course?.title || "—"}
              </td>

              {/* Amount */}
              <td className="px-4 py-3 text-right font-medium text-slate-900">
                ₹{o.amount / 100}
              </td>

              {/* Status */}
              <td className="px-4 py-3 text-center">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    o.status === "SUCCESS" || o.status === "PAID"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {o.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>
      </div>
    </div>
  );
}

export default AdminDashboard;