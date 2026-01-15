import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../config/api";
import { getToken } from "../../utils/auth";

function TeachersList() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  // const API = import.meta.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${API}/api/teachers`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then(res => setTeachers(res.data))
      .catch(() => setTeachers([]))
      .finally(() => setLoading(false));
  }, [API]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-slate-900">
            Teachers
          </h1>
          <p className="text-slate-600 mt-1">
            Manage faculty members
          </p>
        </div>

        {/* Table */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b flex justify-between">
            <h2 className="font-medium">Teacher List</h2>
            <span className="text-sm text-slate-500">
              {teachers.length} teachers
            </span>
          </div>

          {loading ? (
            <div className="p-6 text-slate-500">Loading…</div>
          ) : teachers.length === 0 ? (
            <div className="p-6 text-slate-500">No teachers found.</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Expertise</th>
                  <th className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map(t => (
                  <tr
                    key={t._id}
                    className="border-t hover:bg-slate-50"
                  >
                    <td className="px-4 py-3 font-medium">
                      {t.name}
                    </td>
                    <td className="px-4 py-3">
                      {t.email}
                    </td>
                    <td className="px-4 py-3">
                      {t.expertise || "—"}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="px-3 py-1 text-xs rounded-full bg-emerald-100 text-emerald-700">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
}

export default TeachersList;