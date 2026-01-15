import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../config/api";
import { getToken } from "../utils/auth";

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = getToken();
    // const API = import.meta.env.REACT_APP_API_URL;

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    axios
      .get(`${API}/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((res) => setCourse(res.data))
      .catch(() => setCourse(null))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    axios
      .get(`${API}/api/enrollments/my`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const enrolledIds = res.data.map((e) => e.course?._id);
        setIsEnrolled(enrolledIds.includes(id));
      })
      .catch(() => {});
  }, [id]);

  const handleEnroll = () => {
    const token = getToken();
    if (!token) {
      navigate("/login", { state: { from: `/courses/${id}` } });
      return;
    }
    navigate("/courses"); // payment handled there
  };

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

    if (!token) {
    return <div className="p-10 text-center">please Login..!</div>;
  }


  if (!course) {
    return <div className="p-10 text-center">Course detail not found</div>;
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-14">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Image */}
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-[320px] object-cover rounded-2xl border"
          />

          {/* Info */}
          <div>
            <span className="inline-block text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600 mb-4">
              {course.category}
            </span>

            <h1 className="text-3xl font-medium text-slate-900 mb-4">
              {course.title}
            </h1>

            <p className="text-slate-600 leading-relaxed mb-6">
              {course.description}
            </p>

            <p className="text-2xl font-semibold text-slate-900 mb-6">
              ₹{course.price / 100}
            </p>

            <button
              disabled={isEnrolled}
              onClick={handleEnroll}
              className={`px-6 py-3 rounded text-white ${
                isEnrolled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-slate-800 hover:bg-slate-900"
              }`}
            >
              {isEnrolled ? "Already Enrolled" : "Enroll Now"}
            </button>
          </div>
        </div>

        {/* What You’ll Learn */}
        <div className="mt-20">
          <h2 className="text-2xl font-medium text-slate-900 mb-6">
            What You’ll Learn
          </h2>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-600">
            <li>✔ Clear concepts and fundamentals</li>
            <li>✔ Practical understanding</li>
            <li>✔ Structured learning path</li>
            <li>✔ Suitable for beginners</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default CourseDetail;