import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../utils/auth";

function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/courses", {
      headers: { Authorization: `Bearer ${getToken()}` }
    }).then(res => setCourses(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Manage Courses</h2>

      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 text-left">Title</th>
            <th className="p-2">Category</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(c => (
            <tr key={c._id} className="border-t">
              <td className="p-2">{c.title}</td>
              <td className="p-2 text-center">{c.category}</td>
              <td className="p-2 text-center">
                {c.isActive ? (
                  <span className="text-green-600">Active</span>
                ) : (
                  <span className="text-red-600">Inactive</span>
                )}
              </td>
              <td className="p-2 text-center">
                <a
                  href={`/admin/edit-course/${c._id}`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseList;