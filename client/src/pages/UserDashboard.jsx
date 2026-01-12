import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";

function UserDashboard() {
  const [enrollments, setEnrollments] = useState([]);
  const token = getToken();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/enrollments/my", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("ENROLLMENTS:", res.data); // 🔴 DEBUG LINE
        setEnrollments(res.data);
      });
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>My Courses</h2>

      {enrollments.length === 0 && <p>No courses purchased yet.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {enrollments.map((e) => (
          <div key={e._id} className="bg-white p-4 rounded shadow">
            <h4 className="font-semibold">{e.course.title}</h4>
            <p className="text-sm text-gray-600">{e.course.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserDashboard;
