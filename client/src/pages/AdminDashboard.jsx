import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStats, getPayments } from "../services/adminApi";

function AdminDashboard() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NjI4ZjUzOTZkYzc2ODRhYTJmYWYyMyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2ODA2OTMwOCwiZXhwIjoxNzY4Njc0MTA4fQ.tKtFrS7osGJbBWlwK3UYoq0kbqgZWHvbqcFw3lX2XCo";

  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const statsRes = await getStats(token);
      const paymentsRes = await getPayments(token);

      setStats(statsRes.data);
      setOrders(paymentsRes.data);
    };

    fetchData();
  }, []);

  return (
    <div className="p-10">
      <button className="bg-blue-600 text-white mr-4 px-4 py-2 rounded hover:bg-blue-700">
        <Link to="/admin/add-course">Add Course</Link>
      </button>
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
      <Link to="/admin/courses">Manage Courses</Link>
      </button>
      <h1 className="font-bold py-6">Admin Dashboard</h1>

      {stats && (
        <>
          <p className="py-2 ">
            <strong>Total Revenue:</strong> ₹{stats.totalRevenue / 100}
          </p>
          <p className="py-2 ">
            <strong>Total Payments:</strong> {stats.totalPayments}
          </p>
        </>
      )}

      <hr />
 
      <h3 className="font-bold py-2">Payments</h3>
      <table className="w-full bg-white rounded shadow">
  <thead className="bg-gray-200">
    <tr>
      <th className="p-2 text-left">Order ID</th>
      <th className="p-2 text-left">User</th>
      <th className="p-2 text-left">Course</th>
      <th className="p-2 text-left">Amount</th>
      <th className="p-2 text-left">Status</th>
    </tr>
  </thead>
  <tbody>
    {orders.map(o => (
      <tr key={o._id} className="border-t">
        <td className="p-2 text-xs">{o._id}</td>
        <td className="p-2">{o.user?.email}</td>
        <td className="p-2">{o.course?.title}</td>
        <td className="p-2">₹{o.amount / 100}</td>
        <td className="p-2 text-green-600 font-semibold">
          {o.status}
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
}

export default AdminDashboard;
