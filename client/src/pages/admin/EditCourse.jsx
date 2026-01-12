import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../utils/auth";
import { useParams, useNavigate } from "react-router-dom";

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);

  /* 🔹 Fetch course */
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then(res => setCourse(res.data))
      .catch(() => alert("Failed to load course"));
  }, [id]);

  /* 🔹 Fetch teachers */
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/teachers", {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then(res => setTeachers(res.data))
      .catch(() => {});
  }, []);

  const update = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      await axios.put(
        `http://localhost:5000/api/courses/${id}`,
        {
          ...course,
          price: Number(course.price),
          duration: course.duration
            ? Number(course.duration)
            : undefined,
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      alert("Course updated successfully");
      navigate("/admin/courses");
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!course) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-medium text-slate-800 mb-8">
        Edit Course
      </h1>

      <form
        onSubmit={update}
        className="space-y-6 bg-white p-8 rounded-xl border"
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Course Title
          </label>
          <input
            className="w-full border rounded px-3 py-2"
            value={course.title}
            onChange={(e) =>
              setCourse({ ...course, title: e.target.value })
            }
            required
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Image Path
          </label>
          <input
            className="w-full border rounded px-3 py-2"
            value={course.image}
            onChange={(e) =>
              setCourse({ ...course, image: e.target.value })
            }
          />
          {course.image && (
            <img
              src={course.image}
              alt="Preview"
              className="mt-3 w-full h-40 object-cover rounded border"
            />
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            className="w-full border rounded px-3 py-2 min-h-[120px]"
            value={course.description}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Price (paise)
          </label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={course.price}
            onChange={(e) =>
              setCourse({ ...course, price: e.target.value })
            }
            required
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Duration (hours) — optional
          </label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={course.duration || ""}
            onChange={(e) =>
              setCourse({ ...course, duration: e.target.value })
            }
          />
        </div>

        {/* Teacher */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Teacher
          </label>
          <select
            className="w-full border rounded px-3 py-2"
            value={course.teacher}
            onChange={(e) =>
              setCourse({ ...course, teacher: e.target.value })
            }
          >
            <option value="">Select teacher</option>
            {teachers.map(t => (
              <option key={t._id} value={t._id}>
                {t.name || t.email}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Category
          </label>
          <select
            className="w-full border rounded px-3 py-2"
            value={course.category}
            onChange={(e) =>
              setCourse({ ...course, category: e.target.value })
            }
          >
            <option value="Academic">Academic</option>
            <option value="Skills">Skills</option>
            <option value="Islamic">Islamic</option>
          </select>
        </div>

        {/* Active Toggle */}
        <div className="flex items-center justify-between border rounded px-4 py-3">
          <span className="text-sm font-medium">
            Course Active
          </span>
          <input
            type="checkbox"
            checked={course.isActive}
            onChange={(e) =>
              setCourse({ ...course, isActive: e.target.checked })
            }
            className="w-5 h-5"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-800 text-white py-2 rounded hover:bg-slate-900 disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

export default EditCourse;