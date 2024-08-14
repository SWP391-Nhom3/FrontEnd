import PropTypes from "prop-types";
import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
// hooks
import useAuth from "../hooks/useAuth.js";
// pages
import SignIn from "../pages/Auth/Login/index.jsx";
// components

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized } = useAuth();
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <SignIn />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
