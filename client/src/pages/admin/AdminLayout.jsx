import { Link } from "react-router-dom";

function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-slate-200 p-6">
        <h1 className="text-xl font-bold mb-10">ACADEMY ADMIN</h1>

        <nav className="space-y-3 text-sm">
          <Link to="/admin" className="block px-3 py-2 font-semibold rounded hover:bg-slate-800">
            Dashboard
          </Link>
          <Link to="/admin/courses" className="block px-3 py-2 font-semibold rounded hover:bg-slate-800">
            Courses
          </Link>
          <Link to="/admin/add-course" className="block px-3 py-2 font-semibold rounded hover:bg-slate-800">
            Add Course
          </Link>
          <Link to="/admin/teachers" className="block px-3 py-2 font-semibold rounded hover:bg-slate-800">
            Teachers
          </Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;