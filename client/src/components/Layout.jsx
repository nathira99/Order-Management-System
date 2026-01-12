function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-4">
        {children}
      </div>
    </div>
  );
}

export default Layout;