import { useEffect, useState } from "react";
import { getStats, getPayments } from "../services/adminApi";

function AdminDashboard() {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NjI4ZjUzOTZkYzc2ODRhYTJmYWYyMyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2ODA2OTMwOCwiZXhwIjoxNzY4Njc0MTA4fQ.tKtFrS7osGJbBWlwK3UYoq0kbqgZWHvbqcFw3lX2XCo";

  const [stats, setStats] = useState(null);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const statsRes = await getStats(token);
      const paymentsRes = await getPayments(token);

      setStats(statsRes.data);
      setPayments(paymentsRes.data);
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>Admin Dashboard</h2>

      {stats && (
        <>
          <p><strong>Total Revenue:</strong> ₹{stats.totalRevenue / 100}</p>
          <p><strong>Total Payments:</strong> {stats.totalPayments}</p>
        </>
      )}

      <hr />

      <h3>Payments</h3>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Amount (₹)</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p._id}>
              <td>{p.order?._id}</td>
              <td>{p.order?.amount / 100}</td>
              <td>{p.status}</td>
              <td>{new Date(p.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;