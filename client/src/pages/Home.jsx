import {
  BookOpenText,
  LucideUsersRound,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { API } from "../config/api";
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

function Home() {
  const [courses, setCourses] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);

  const scrollRef = useRef(null);
  const sliderRef = useRef(null);
  const autoRef = useRef(null);
  const navigate = useNavigate();

  // const API = import.meta.env.REACT_APP_API_URL;

  const cardWidth = 260;

  /* ---------------- FETCH COURSES ---------------- */
  useEffect(() => {
    axios
      .get(`${API}/api/courses`)
      .then((res) => setCourses(res.data))
      .catch(() => {});
  }, [API]);

  /* ---------------- FETCH FACULTY (BACKEND) ---------------- */
  useEffect(() => {
    axios
      .get(`${API}/api/teachers`)
      .then((res) => setFaculty(res.data))
      .catch(() => {});
  }, [API]);

  /* ---------------- EXTENDED LIST (INFINITE) ---------------- */
  const extendedFaculty =
    faculty.length > 1
      ? [faculty[faculty.length - 1], ...faculty, faculty[0]]
      : faculty;

  /* ---------------- AUTO SCROLL ---------------- */
  useEffect(() => {
    if (!faculty.length) return;

    autoRef.current = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 4000);

    return () => clearInterval(autoRef.current);
  }, [faculty]);

  /* ---------------- SLIDE EFFECT ---------------- */
  useEffect(() => {
    if (!sliderRef.current) return;

    sliderRef.current.style.transition =
      "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
    sliderRef.current.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }, [currentIndex]);

  /* ---------------- LOOP CORRECTION ---------------- */
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const onTransitionEnd = () => {
      if (currentIndex === extendedFaculty.length - 1) {
        slider.style.transition = "none";
        setCurrentIndex(1);
      }

      if (currentIndex === 0) {
        slider.style.transition = "none";
        setCurrentIndex(extendedFaculty.length - 2);
      }
    };

    slider.addEventListener("transitionend", onTransitionEnd);
    return () => slider.removeEventListener("transitionend", onTransitionEnd);
  }, [currentIndex, extendedFaculty.length]);

  /* ---------------- CONTROLS ---------------- */
  const stopAuto = () => clearInterval(autoRef.current);

  const startAuto = () => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setCurrentIndex((p) => p + 1);
    }, 4000);
  };

  const prevSlide = () => {
    stopAuto();
    setCurrentIndex((p) => p - 1);
  };

  const nextSlide = () => {
    stopAuto();
    setCurrentIndex((p) => p + 1);
  };

  return (
    <div className="bg-gray-50">
      {/* HERO */}
      <section
        className="relative bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/images/hero/hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative max-w-6xl mx-auto px-4 py-28 text-center">
          <h1 className="text-4xl md:text-5xl font-medium">
            Learn Smarter. Grow Faster. Succeed Confidently.
          </h1>
          <p className="mt-6 text-lg max-w-2xl mx-auto text-gray-200">
            A modern learning platform built for clarity and growth.
          </p>
        </div>
      </section>

      {/* COURSES */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-medium mb-10">Explore Our Courses</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.slice(0, 3).map((course) => (
              <div
                key={course._id}
                className="bg-gray-50 border rounded-xl p-6 text-left"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-medium">{course.title}</h3>
                <p className="text-sm text-gray-600 mt-2">
                  {course.description.slice(0, 90)}...
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate("/courses")}
            className="mt-12 px-6 py-3 bg-slate-800 text-white rounded"
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

      <section className="py-10 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl text-center">
              <div
                className={`${f.color} w-14 h-14 rounded-full mx-auto flex items-center justify-center text-white mb-6`}
              >
                ✓
              </div>
              <h3 className="text-xl font-semibold my-6">{f.title}</h3>
              <ul className="space-y-3 text-sm text-slate-600">
                {f.items.map((it, idx) => (
                  <li key={idx}>• {it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* FACULTY SLIDER */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 relative">
          <h2 className="text-3xl font-medium mb-10">Our Faculty</h2>

          {/* Arrows */}
          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border rounded-full w-10 h-10 shadow flex items-center justify-center z-10"
          >
            ←
          </button>

          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border rounded-full w-10 h-10 shadow flex items-center justify-center z-10"
          >
            →
          </button>

          <div
            className="overflow-hidden px-12"
            style={{ touchAction: "pan-x" }}
            onWheel={(e) => scrollRef.current.scrollLeft += e.deltaY}
            onMouseEnter={stopAuto}
            onMouseLeave={startAuto}
          >
            <div ref={sliderRef} className="flex gap-6">
              {extendedFaculty.map((f, i) => (
                <div
                  key={i}
                  className="min-w-[240px] bg-gray-50 border rounded-xl p-6 text-center"
                >
                  <img
                    src={f.image}
                    alt={f.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-lg font-medium">{f.name}</h3>
                  <p className="text-sm text-gray-600">{f.bio}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {faculty.map((_, i) => (
              <button
                key={i}
                type="button"
                tabIndex={-1}
                onClick={() => setCurrentIndex(i + 1)}
                className={`w-2.5 h-2.5 rounded-full ${
                  currentIndex === i + 1
                    ? "bg-slate-800"
                    : "bg-slate-300"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Feedback */}
      <section className="py-24 bg-white">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-3xl font-medium text-slate-900 text-center mb-14">
      What Our Students Say
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {[
        "The courses are clearly structured and easy to follow. I always knew what to learn next.",
        "The instructors explain concepts patiently and practically. Very helpful experience.",
        "This platform helped me gain confidence and consistency in my learning journey.",
      ].map((text, i) => (
        <div
          key={i}
          className="bg-slate-50 rounded-2xl p-8 border border-slate-200"
        >
          <p className="text-slate-600 text-sm leading-relaxed">
            “{text}”
          </p>

          <div className="mt-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-300" />
            <div>
              <p className="text-sm font-medium text-slate-800">
                Verified Student
              </p>
              <p className="text-xs text-slate-500">
                Enrolled Learner
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
    </div>
  );
}

export default Home;