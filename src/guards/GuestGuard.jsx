import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
// hooks
import useAuth from "../hooks/useAuth";

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default function GuestGuard({ children }) {
  const { isAuthenticated, user } = useAuth();
  console.log("is", user);
  if (isAuthenticated && user.roles?.length > 0) {
    const roleNames = user.roles.map((role) => role.name);

    if (roleNames.includes("MEMBER")) {
      return <Navigate to="/" />;
    }

    if (roleNames.includes("ADMIN") || roleNames.includes("STAFF")) {
      return <Navigate to={"/dashboard"} />;
    }
  }

  return <>{children}</>;
}
