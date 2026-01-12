import { getToken } from "../utils/auth";
import { useEffect, useState } from "react";
import axios from "axios";

const pay = async (course) => {
  const token = getToken();

  console.log("SENDING TO BACKEND:", {
    amount: course.price,
    courseId: course._id,
  });

  try {
    const { data } = await axios.post(
      "http://localhost:5000/api/orders/create",
      {
        amount: course.price, // already in paise
        courseId: course._id, // THIS is what was missing
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
          "http://localhost:5000/api/payments/verify",
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

        window.location.href = "/dashboard";
      },
    };

    new window.Razorpay(options).open();
  } catch (err) {
    console.error(err.response?.data || err);
    alert(err.response?.data?.message || "Payment failed");
  }
};

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/courses")
      .then((res) => setCourses(res.data));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {courses.map(course => (
    <div
      key={course._id}
      className="bg-white rounded-lg shadow p-5"
    >
      <img 
        src="images/courses/tajweed.jpg"
        alt= "tajweed course"
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
        {course.category}
      </span>

      <h3 className="text-lg font-semibold mt-2">
        {course.title}
      </h3>

      <p className="text-gray-600 text-sm mt-1">
        {course.description}
      </p>

      <p className="font-bold mt-3">
        ₹{course.price / 100}
      </p>

      <button
        onClick={() => pay(course)}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Enroll Now
      </button>
    </div>
  ))}
  
      </div>
  );
}

export default Courses;
