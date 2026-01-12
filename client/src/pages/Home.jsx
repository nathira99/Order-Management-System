import {
  BookOpenText,
  Info,
  LucideUsersRound,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const features = [
  {
    title: "Structured Learning Programs",
    color: "bg-emerald-500",
    items: [
      "Well-designed course curriculum",
      "Step-by-step learning paths",
      "Beginner to advanced levels",
      "Clear learning objectives",
    ],
  },
  {
    title: "Expert Faculty & Guidance",
    color: "bg-rose-500",
    items: [
      "Experienced instructors",
      "Clear concept explanations",
      "Practical teaching approach",
      "Student-focused mentoring",
    ],
  },
  {
    title: "Flexible & Accessible Learning",
    color: "bg-indigo-500",
    items: [
      "Learn at your own pace",
      "Access courses anytime",
      "Certification opportunities",
      "Secure online payments",
    ],
  },
];

const faculty = [
  {
    name: "John Doe",
    role: "Senior Instructor",
    image: "/images/faculty/male user.png",
  },
  {
    name: "Sarah Ahmed",
    role: "Quran Instructor",
    image: "/images/faculty/hijabi user.png",
  },
  {
    name: "Michael Lee",
    role: "Skill Trainer",
    image: "/images/faculty/male user.png",
  },
  {
    name: "Aisha Khan",
    role: "Academic Mentor",
    image: "/images/faculty/hijabi user.png",
  },
  {
    name: "Khadidja Ali",
    role: "Full Stack Mentor",
    image: "/images/faculty/hijabi user.png",
  },
];

function Home() {
  const [courses, setCourses] = useState([]);
  const scrollRef = useRef(null);
  const intervalRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const cardWidth = 260;
  const total = faculty.length;

  const scrollToIndex = (index) => {
    scrollRef.current.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
    setActiveIndex(index);
  };

  useEffect(() => {
  const timer = setTimeout(() => {
    const next = activeIndex === faculty.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(next);
  }, 4000);

  return () => clearTimeout(timer);
}, [activeIndex]);

  const startAutoScroll = () => {
    stopAutoScroll();
    intervalRef.current = setInterval(() => {
      const next = activeIndex === total - 1 ? 0 : activeIndex + 1;
      scrollToIndex(next);
    }, 3500);
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/courses/home")
      .then((res) => setCourses(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bg-gray-50">
      {/* Hero */}
      <section
        className="relative bg-cover bg-center text-white"
        style={{
          backgroundImage: "url('images/hero/hero-bg.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative max-w-6xl mx-auto px-4 py-28 text-center">
          <h1 className="text-4xl md:text-5xl font-medium leading-tight">
            Learn Smarter. Grow Faster. Succeed Confidently.
          </h1>

          <p className="mt-6 text-lg max-w-2xl mx-auto text-gray-200">
            A modern online learning platform offering academic, skill-based,
            and professional courses designed by experienced educators and
            industry experts.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-medium text-slate-800 mb-4">
            Explore Our Courses
          </h2>

          <p className="text-slate-600 max-w-2xl mx-auto mb-12">
            Structured learning paths designed to build strong fundamentals and
            practical skills.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-left"
              >
                <img
                  src="images/courses/tajweed.jpg"
                  alt="tajweed course"
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <span className="text-xs text-slate-500">
                  {course.category}
                </span>

                <h3 className="text-lg font-medium text-slate-800 mt-2 mb-2">
                  {course.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {course.description.slice(0, 90)}...
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate("/courses")}
            className="mt-12 px-6 py-3 bg-slate-800 text-white rounded hover:bg-slate-900 transition"
          >
            View All Courses
          </button>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <BookOpenText className="text-blue-600 mx-auto mb-2" size={32} />
            <h3 className="font-semibold text-lg mb-2">Structured Learning</h3>
            <p className="text-gray-600 text-sm">
              Well-organized courses designed for clarity and progress.
            </p>
          </div>
          <div>
            <ShieldCheck className="text-blue-600 mx-auto mb-2" size={32} />
            <h3 className="font-semibold text-lg mb-2">Secure Payments</h3>
            <p className="text-gray-600 text-sm">
              Trusted and verified payment process with clear enrollment flow.
            </p>
          </div>
          <div>
            <LucideUsersRound
              className="text-blue-600 mx-auto mb-2"
              size={32}
            />
            <h3 className="font-semibold text-lg mb-2">Student-Centered</h3>
            <p className="text-gray-600 text-sm">
              Learn at your own pace with access to enrolled courses anytime.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((card, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-sm p-8 text-center"
              >
                {/* Icon Circle */}
                <div
                  className={`${card.color} w-14 h-14 rounded-full mx-auto flex items-center justify-center text-white mb-6`}
                >
                  {/* Keep this simple – no SVG */}
                  <span className="text-xl font-semibold">✓</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                  {card.title}
                </h3>

                {/* Checklist */}
                <ul className="space-y-4 text-left max-w-xs mx-auto">
                  {card.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-emerald-500 mt-1">✔</span>
                      <span className="text-gray-600 text-sm leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-medium text-slate-800 mb-10">
          Our Faculty
        </h2>

        <div
          className="relative"
          onMouseEnter={stopAutoScroll}
          onMouseLeave={startAutoScroll}
        >
          {/* Left Arrow */}
          <button
            onClick={() =>
              scrollToIndex(activeIndex === 0 ? total - 1 : activeIndex - 1)
            }
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border rounded-full w-10 h-10 shadow flex items-center justify-center z-10"
          >
            ←
          </button>

          {/* Right Arrow */}
          <button
            onClick={() =>
              scrollToIndex(activeIndex === total - 1 ? 0 : activeIndex + 1)
            }
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border rounded-full w-10 h-10 shadow flex items-center justify-center z-10"
          >
            →
          </button>

          {/* Cards */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-hidden px-12"
          >
            {faculty.map((f, i) => (
              <div
                key={i}
                className="min-w-[240px] bg-gray-50 border rounded-xl p-6 text-center"
              >
                <img
                  src={f.image}
                  alt={f.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover mb-4"
                />
                <h3 className="text-lg font-medium text-slate-800">
                  {f.name}
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  {f.role}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {faculty.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`w-2.5 h-2.5 rounded-full ${
                i === activeIndex
                  ? "bg-slate-800"
                  : "bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>

      {/* Feedback */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-12 text-gray-800">
            What Students Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              "The courses are well structured and easy to follow.",
              "Excellent instructors and practical content.",
              "This platform helped me improve my skills confidently.",
            ].map((feedback, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow transition"
              >
                <p className="text-gray-600 leading-relaxed">“{feedback}”</p>
                <p className="mt-4 font-semibold text-sm text-gray-800">
                  — Student
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
