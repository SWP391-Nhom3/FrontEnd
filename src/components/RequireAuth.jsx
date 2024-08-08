// RequireAuth.jsx
import { Navigate } from "react-router-dom";

function RequireAuth({ children, isAuthenticated }) {
  return isAuthenticated ? children : <Navigate to="/login" />;
}
export default RequireAuth;
