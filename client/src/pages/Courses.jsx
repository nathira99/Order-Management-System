import { getToken } from "../utils/auth";
import { useEffect, useState } from "react";
import axios from "axios";

const pay = async (course) => {
  const token = getToken();

  console.log("SENDING TO BACKEND:", {
    amount: course.price,
    courseId: course._id
  })

  try {
    const { data } = await axios.post(
      "http://localhost:5000/api/orders/create",
      {
        amount: course.price,   // already in paise
        courseId: course._id    // THIS is what was missing
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const options = {
      key: data.key,
      amount: data.amount,
      currency: data.currency,
      order_id: data.razorpayOrderId,
      handler: function () {
        window.location.href = "/dashboard";
      }
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
    axios.get("http://localhost:5000/api/courses")
      .then(res => setCourses(res.data));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>Courses</h2>

      {courses.map(course => (
        <div key={course._id}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <strong>₹{course.price / 100}</strong>
          <br />
          <button onClick={() => pay(course)}>Enroll</button>
        </div>
      ))}
    </div>
  );
}

export default Courses;