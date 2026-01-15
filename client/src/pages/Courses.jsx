import { useEffect, useState } from "react";
import axios from "axios";
import API from "../config/api";
import { getToken } from "../utils/auth";
import { useLocation, useNavigate, Link } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // const API = import.meta.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${API}/api/courses`)
      .then((res) => setCourses(res.data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setEnrolledCourseIds([]);
      return;
    }

    axios
      .get(`${API}/api/enrollments/my`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const ids = Array.isArray(res.data)
          ? res.data.map((e) => e.course?._id).filter(Boolean)
          : [];
        setEnrolledCourseIds(ids);
      })
      .catch(() => setEnrolledCourseIds([]));
  }, []);

  const pay = async (course) => {
    const token = getToken();

    if (!token) {
      navigate("/login", {
        state: { from: location.pathname },
      });
      return;
    }

    try {
      const { data } = await axios.post(
        `${API}/api/orders/create`,
        {
          amount: course.price,
          courseId: course._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        order_id: data.razorpayOrderId,
        handler: async function (response) {
          await axios.post(
            `${API}/api/payments/verify`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            {
              headers: {
                Authorization: `Bearer ${getToken()}`,
              },
            }
          );

          navigate("/dashboard");
        },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      alert(err.response?.data?.message || "Payment failed");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 m-10">
      {courses.map((course) => {
        const isEnrolled = enrolledCourseIds.includes(course._id);

        return (
          <div
            key={course._id}
            className="bg-white rounded-xl border p-5 hover:shadow-md transition cursor-pointer"
          >
            <Link to={`/courses/${course._id}`} className="block">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                {course.category}
              </span>

              <h3 className="text-lg font-medium mt-2 text-slate-800">
                {course.title}
              </h3>

              <p className="text-gray-600 text-sm mt-1 line-clamp-3">
                {course.description}
              </p>

              <p className="font-semibold mt-3 text-slate-800">
                ₹{course.price / 100}
              </p>
            </Link>

            <button
              disabled={isEnrolled}
              onClick={() => pay(course)}
              className={`mt-4 w-full py-2 rounded text-white ${
                isEnrolled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-slate-800 hover:bg-slate-900"
              }`}
            >
              {isEnrolled ? "Already Enrolled" : "Enroll Now"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Courses;
