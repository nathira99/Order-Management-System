import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";

function UserDashboard() {
  const [enrollments, setEnrollments] = useState([]);
  const token = getToken();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/enrollments/my", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        console.log("ENROLLMENTS:", res.data); // 🔴 DEBUG LINE
        setEnrollments(res.data);
      });
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>My Courses</h2>

      {enrollments.length === 0 && <p>No courses purchased yet.</p>}

      {enrollments.map(e => (
        e.course && (   // 🔴 SAFETY CHECK
          <div
            key={e._id}
            style={{ border: "1px solid #ccc", padding: 15, marginTop: 10 }}
          >
            <h4>{e.course.title}</h4>
            <p>{e.course.description}</p>
          </div>
        )
      ))}
    </div>
  );
}

export default UserDashboard;