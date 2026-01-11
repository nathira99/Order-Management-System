import { Navigate } from "react-router-dom";
import { getToken, getRole } from "../utils/auth";

const ProtectedRoute = ({ children, role }) => {
  if (!getToken()) return <Navigate to="/login" />;

  if (role && getRole() !== role) {
    return <Navigate to="/courses" />;
  }

  return children;
};

export default ProtectedRoute;