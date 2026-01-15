import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../config/api";
import { getToken } from "../../utils/auth";

function AddCourse() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Skills");
  const [duration, setDuration] = useState("");
  const [teacher, setTeacher] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);

  // const API = import.meta.env.REACT_APP_API_URL;

  /* 🔹 Fetch teachers */
  useEffect(() => {
    axios
      .get(`${API}/api/users/teachers`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then(res => setTeachers(res.data))
      .catch(() => {});
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!teacher) {
      alert("Please select a teacher");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        `${API}/api/courses`,
        {
          title,
          image,
          description,
          price: Number(price),
          category,
          duration: duration ? Number(duration) : undefined,
          teacher,
          isActive,
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      alert("Course added successfully");

      // Reset (keep defaults sane)
      setTitle("");
      setImage("");
      setDescription("");
      setPrice("");
      setCategory("Skills");
      setDuration("");
      setTeacher("");
      setIsActive(true);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-medium text-slate-800 mb-8">
        Add New Course
      </h1>

      <form
        onSubmit={submit}
        className="space-y-6 bg-white p-8 rounded-xl border"
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Course Title</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            placeholder="/images/courses/course.jpg"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
          {image && (
            <img
              src={image}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        {/* Duration (optional) */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Duration (hours) — optional
          </label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>

        {/* Teacher */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Teacher
          </label>
          <select
            className="w-full border rounded px-3 py-2"
            value={teacher}
            onChange={(e) => setTeacher(e.target.value)}
            required
          >
            <option value="">Select teacher</option>
            {teachers.map((t) => (
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
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Academic">Academic</option>
            <option value="Skills">Skills</option>
            <option value="Islamic">Islamic</option>
          </select>
        </div>

        {/* Active Toggle */}
        <div className="flex items-center justify-between border rounded px-4 py-3">
          <span className="text-sm font-medium">Course Active</span>
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="w-5 h-5"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-800 text-white py-2 rounded hover:bg-slate-900 disabled:opacity-60"
        >
          {loading ? "Adding Course..." : "Add Course"}
        </button>
      </form>
    </div>
  );
}

export default AddCourse;