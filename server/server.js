const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { protect, adminOnly } = require("./middlewares/authMiddleware")

dotenv.config();

const app = express();
app.use("/api/webhook", require("./routes/webhookRoutes"));

// Middleware
app.use(cors(
  {
    origin: "*",
  }
));
app.use(express.static(path.join(__dirname,"client/build")));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/enrollments", require("./routes/enrollmentRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/teachers", require("./routes/teacherRoutes"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname,"client/build/index.html"));
});

app.get("/api/protected", protect, (req, res) => {
  res.json({ message: "Protected route", user: req.user });
});

// Database
connectDB();

// Test route
app.get("/", (req, res) => {
  res.status(200).send("API running");
});


// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});