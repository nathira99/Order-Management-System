import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import API from "../../config/api";
import { getToken } from "../../utils/auth";
import { Link } from "react-router-dom";
import AdminLayout from "../../pages/admin/AdminLayout";

function CourseList() {
  const [courses, setCourses] = useState([]);
  // const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = getToken();
  // const API = import.meta.env.REACT_APP_API_URL;

  // ✅ Memoized functions
  const loadCourses = useCallback(async () => {
    const res = await axios.get(`${API}/api/courses/admin`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCourses(res.data);
  }, [token]);

  const loadTeachers = useCallback(async () => {
    const res = await axios.get(`${API}/api/teachers`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTeachers(res.data);
  }, [token]);

  // ✅ Correct dependency array
  useEffect(() => {
    Promise.all([loadCourses(), loadTeachers()])
      .finally(() => setLoading(false));
  }, [loadCourses, loadTeachers]);

  // Toggle active status
  const toggleStatus = async (courseId) => {
    const res = await axios.patch(
      `${API}/api/courses/admin/${courseId}/toggle`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setCourses((prev) =>
      prev.map((c) =>
        c._id === courseId ? { ...c, isActive: res.data.isActive } : c
      )
    );
  };

  // Assign teacher
  // const assignTeacher = async (courseId, teacherId) => {
  //   const res = await axios.patch(
  //     `${API}/api/courses/admin/${courseId}/teacher`,
  //     { teacherId },
  //     { headers: { Authorization: `Bearer ${token}` } }
  //   );

  //   setCourses((prev) =>
  //     prev.map((c) => (c._id === courseId ? res.data : c))
  //   );
  // };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-medium text-slate-900">
          Manage Courses
        </h1>
        <p className="text-slate-600 mt-1">
          Activate courses, assign teachers, and monitor enrollments
        </p>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b flex justify-between">
          <h2 className="text-lg font-medium">Course List</h2>
          <span className="text-sm text-slate-500">
            {courses.length} courses
          </span>
        </div>

        {loading ? (
          <div className="p-6 text-slate-500">Loading courses…</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-left">Teacher</th>
                  <th className="px-4 py-3 text-center">Enrolled</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {courses.map(c => (
                  <tr
                    key={c._id}
                    className="border-t hover:bg-slate-50 transition"
                  >
                    {/* Title */}
                    <td className="px-4 py-3 font-medium text-slate-800">
                      {c.title}
                    </td>

                    {/* Category */}
                    <td className="px-4 py-3 text-slate-600">
                      {c.category}
                    </td>

                    {/* Status Toggle */}
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => toggleStatus(c._id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                          c.isActive ? "bg-emerald-500" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 bg-white rounded-full transform transition ${
                            c.isActive ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </td>

                    {/* Teacher*/}
                    <td className="px-4 py-3">
                      {c.teacher?.name || (
                        <span className="text-sm text-slate-500">
                          Unassigned
                        </span>
                      )}
                    </td>

                    {/* Enrolled Count */}
                    <td className="px-4 py-3 text-center">
                      <span className="px-3 py-1 text-xs rounded-full bg-slate-100 text-slate-700">
                        {c.enrolledCount}
                      </span>
                    </td>

                    {/* Edit */}
                    <td className="px-4 py-3 text-center">
                      <Link
                        to={`/admin/edit-course/${c._id}`}
                        className="text-slate-700 font-medium hover:underline"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default CourseList;