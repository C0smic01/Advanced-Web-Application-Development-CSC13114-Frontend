import { Navigate, useLocation } from "react-router-dom";

const isAuthenticated = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const accessToken = urlParams.get("access_token");
  const refreshToken = urlParams.get("refresh_token");
  if (refreshToken) {
    localStorage.setItem("refresh_token", refreshToken);
  }
  return !!localStorage.getItem("refresh_token");
};

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
