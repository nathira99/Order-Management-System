function About() {
  return (
    <div className="bg-gray-50">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            About Our Academy
          </h1>
          <p className="mt-6 text-lg text-slate-300 max-w-3xl mx-auto">
            A professional learning platform built to deliver structured,
            practical, and meaningful education — guided by experienced mentors
            and real-world learning outcomes.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              Our Mission
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Our mission is to make quality education accessible, structured,
              and impactful. We focus on clarity, consistency, and learner
              confidence — not shortcuts or superficial content.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
              Our Vision
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We envision a learning ecosystem where students gain strong
              fundamentals, real skills, and lifelong learning habits through
              guided mentorship and well-designed programs.
            </p>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center text-slate-800 mb-12">
            What Makes Us Different
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Structured Curriculum",
                text: "Courses designed with clear progression, learning goals, and outcomes.",
              },
              {
                title: "Expert Mentorship",
                text: "Learn from instructors with academic and real-world experience.",
              },
              {
                title: "Practical Learning",
                text: "Focus on understanding, application, and long-term retention.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white border rounded-xl p-6 text-center"
              >
                <h3 className="font-semibold text-lg text-slate-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Approach */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-slate-800 mb-10">
            Our Learning Approach
          </h2>

          <ul className="space-y-4 text-slate-600 max-w-3xl">
            <li>• Beginner-friendly explanations with depth</li>
            <li>• Step-by-step progression</li>
            <li>• Continuous assessment and feedback</li>
            <li>• Self-paced with guided support</li>
          </ul>
        </div>
      </section>

      {/* Faculty */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-slate-800 mb-10">
            Our Faculty
          </h2>
          <p className="text-slate-600 max-w-3xl">
            Our faculty members are carefully selected for their subject
            expertise, teaching clarity, and commitment to student success. Each
            instructor brings real-world experience and a structured teaching
            approach.
          </p>
        </div>
      </section>

      {/* Trust */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-slate-800 mb-6">
            Built on Trust & Transparency
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto">
            We believe education is a responsibility. Clear pricing, honest
            outcomes, secure payments, and learner-first decisions are central
            to everything we do.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-100 text-center">
        <h2 className="text-3xl font-semibold mb-4">
          Start Learning With Confidence
        </h2>
        <p className="text-slate-900 mb-8">
          Explore our courses and begin your learning journey today.
        </p>
        <a
          href="/courses"
          className="inline-block px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-gray-700 transition"
        >
          Browse Courses
        </a>
      </section>
    </div>
  );
}

export default About;
