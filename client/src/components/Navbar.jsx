import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: 20, borderBottom: "1px solid #ddd" }}>
      <Link to="/" style={{ marginRight: 15 }}>Home</Link>
      <Link to="/courses">Courses</Link>
      <span style={{ float: "right" }}>
        <Link to="/login">Login</Link>
      </span>
    </nav>
  );
}

export default Navbar;