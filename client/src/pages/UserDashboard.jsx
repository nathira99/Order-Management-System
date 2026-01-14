import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
      .then((res) => setEnrollments(res.data))
      .catch(() => setEnrollments([]));
  }, [token]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-medium text-slate-900">
            My Courses
          </h1>
          <p className="text-slate-600 mt-2">
            Access your enrolled courses and continue learning.
          </p>
        </div>

        {/* Empty State */}
        {enrollments.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">
            <p className="text-slate-600">
              You haven’t enrolled in any courses yet.
            </p>
            <a
              href="/courses"
              className="inline-block mt-6 px-6 py-3 bg-slate-800 text-white rounded hover:bg-slate-900 transition"
            >
              Browse Courses
            </a>
          </div>
        )}

        {/* Courses Grid */}
        {enrollments.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {enrollments.map((e) => (
              <div
                key={e._id}
                className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition"
              >
                {/* Course Info */}
                <h3 className="text-xl font-medium text-slate-900 mb-2">
                  {e.course?.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {e.course?.description}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between mt-6">
                  <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600">
                    Enrolled
                  </span>

                  <Link to ={`/courses/${e.course?._id}`}
                    className="text-sm font-medium text-slate-800 hover:underline"
                  >
                    Go to Course →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default UserDashboard;