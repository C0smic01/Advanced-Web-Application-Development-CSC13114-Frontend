import React from "react";
import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  return !!localStorage.getItem("refreshToken");
};

export default function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
