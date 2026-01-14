import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../utils/auth";
import { Link } from "react-router-dom";

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [savingId, setSavingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const toggleStatus = async (id) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/courses/admin/${id}/toggle`,
        {},
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      setCourses((prev) =>
        prev.map((c) =>
          c._id === id ? { ...c, isActive: res.data.isActive } : c
        )
      );
    } catch {
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/teachers", {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((res) => setTeachers(res.data));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/courses/admin", {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((res) => setCourses(res.data))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-slate-900">
            Manage Courses
          </h1>
          <p className="text-slate-600 mt-1">
            View, edit, and monitor course performance
          </p>
        </div>

        {/* Table */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-medium text-slate-900">Course List</h2>
            <span className="text-sm text-slate-500">
              {courses.length} courses
            </span>
          </div>

          {loading ? (
            <div className="p-6 text-slate-500">Loading courses…</div>
          ) : courses.length === 0 ? (
            <div className="p-6 text-slate-500">No courses found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Title</th>
                    <th className="px-4 py-3 text-left font-medium">
                      Category
                    </th>
                    <th className="px-4 py-3 text-center font-medium">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left font-medium">Teacher</th>
                    <th className="px-4 py-3 text-center font-medium">
                      Enrolled
                    </th>
                    <th className="px-4 py-3 text-center font-medium">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {courses.map((c) => (
                    <tr
                      key={c._id}
                      className="border-b last:border-0 hover:bg-slate-50 transition"
                    >
                      {/* Title */}
                      <td className="px-4 py-3 font-medium text-slate-800">
                        {c.title}
                      </td>

                      {/* Category */}
                      <td className="px-4 py-3 text-slate-600">{c.category}</td>

                      {/* Status */}
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => toggleStatus(c._id)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                            c.isActive ? "bg-emerald-500" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                              c.isActive ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </td>

                      {/* Teacher */}
                      <td className="px-4 py-3">
                        <select
                          value={c.teacher?._id || ""}
                          disabled={!c.isActive || savingId === c._id}
                          onChange={async (e) => {
                            const teacherId = e.target.value;
                            setSavingId(c._id); // ✅ BEFORE API

                            try {
                              const res = await axios.patch(
                                `http://localhost:5000/api/courses/admin/${c._id}/teacher`,
                                { teacherId },
                                {
                                  headers: {
                                    Authorization: `Bearer ${getToken()}`,
                                  },
                                }
                              );

                              // ✅ Update only the changed course
                              setCourses((prev) =>
                                prev.map((course) =>
                                  course._id === c._id ? res.data : course
                                )
                              );
                            } catch {
                              alert("Failed to assign teacher");
                            } finally {
                              setSavingId(null); // ✅ AFTER API
                            }
                          }}
                          className={`border rounded px-2 py-1 text-sm w-auto ${
                            !c.isActive ? "bg-gray-100 cursor-not-allowed" : ""
                          }`}
                        >
                          <option value="">Unassigned</option>
                          {teachers.map((t) => (
                            <option key={t._id} value={t._id}>
                              {t.name}
                            </option>
                          ))}
                        </select>

                        {savingId === c._id && (
                          <p className="text-xs text-slate-400 mt-1">Saving…</p>
                        )}
                      </td>

                      {/* Enrolled */}
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center justify-center px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700">
                          {c.enrolledCount}
                        </span>
                      </td>

                      {/* Action */}
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
      </div>
    </div>
  );
}

export default CourseList;
