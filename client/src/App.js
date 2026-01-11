// import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";

// function App() {
//   // TEMP: paste JWT token from Postman login
//   const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NjI4ZjUzOTZkYzc2ODRhYTJmYWYyMyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2ODA2OTMwOCwiZXhwIjoxNzY4Njc0MTA4fQ.tKtFrS7osGJbBWlwK3UYoq0kbqgZWHvbqcFw3lX2XCo";

//   const payNow = async () => {
//     try {
//       // 1. Create order
//       const { data } = await axios.post(
//         "http://localhost:5000/api/orders/create",
//         { amount: 50000 }, // ₹500 (paise)
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       // 2. Razorpay options
//       const options = {
//         key: data.key,
//         amount: data.amount,
//         currency: data.currency,
//         order_id: data.razorpayOrderId,
//         name: "Test Payment",
//         description: "Razorpay Integration Test",

//         handler: function (response) {
//           // 3. Verify payment
//           axios.post(
//             "http://localhost:5000/api/payments/verify",
//             response,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
//         },
//       };

//       // 4. Open checkout
//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to start payment");
//     }
//   };

//   return (
//     <div style={{padding:40}}>
//       <h2>Razorpay Test</h2>
//       <button onClick={payNow}>Pay ₹500</button>
//     <AdminDashboard />
//     </div>
//   );
// }

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
