# 🎓 Online Learning Academy (MERN Stack)

A full-stack online learning platform built using the MERN stack with role-based access, course management, secure payments, and student enrollment features.
Designed to simulate a real-world online academy system.

## 🚀 Features

### 👤 Authentication & Roles
- User registration & login (JWT based)
- Role-based access:
  - Admin
  - Student
- Protected routes for admin & users

### 📚 Course Management
- Admin can:
    - Add, edit, activate/deactivate courses
    - Assign teachers to courses
    - View enrolled student count per course
- Courses categorized as:
    - Academic
    - Islamic
    - Skills
- Course images served from public assets
  
### 👨‍🏫 Teacher / Faculty Management
- Admin can:
    - Add teachers
    - Assign teachers to courses
    - Faculty displayed on homepage
    - Teacher-course relationship maintained in database
    - 
### 💳 Payments & Enrollment
- Razorpay integration (Test mode)
- Secure payment verification
- Prevents duplicate enrollment
- Automatic enrollment after successful payment
- Payment records stored with status & timestamps
  
### 📊 Admin Dashboard
- Revenue statistics
- Total payments
- Active courses count
- Paginated payment history
- Course management table with:
- Status toggle
- Teacher assignment
- Enrollment count
  
### 🎓 Student Dashboard
- View enrolled courses
- Access course details
- Prevent re-enrollment of the same course
  
### 🏠 Homepage
- Hero section
- Featured courses (from backend)
- Faculty showcase
- Platform highlights
- Student feedback section
  
### 🛠️ Tech Stack
* Frontend
* React
* React Router
* Axios
* Tailwind CSS
* Backend
* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* Payments
* Razorpay API (Test Mode)
  
### 📁 Project Structure
```
Order Management System/
├── client/                # React frontend
│   ├── public/
│   │   └── images/
│   └── src/
│       ├── pages/
│       ├── components/
│       ├── services/
│       └── utils/
│
├── server/                # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   └── config/
│
└── README.md
```

### 🔐 Environment Variables
Create a .env file inside server/:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret

RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
```

### 🧪 Payment Testing
- Use Razorpay test credentials:
- UPI / Card test modes
- No real money involved
- Orders & payments stored in database

### 🎯 Purpose of This Project
- This project was built to:
    - Demonstrate full-stack MERN development
    - Showcase real payment integration
    - Implement admin-level dashboards
    - Simulate a production-ready online academy

### 📌 Future Enhancements (Optional)
- Course content modules
- Video lessons
- Certificates
- Instructor dashboard
- Email notifications
- Forgot password flow

### 👤 Author
**Nathira Farveen**
Full Stack Developer (MERN)
