import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { LoginPage } from "./components/auth/LoginPage";
import { PrivateRoute } from "./components/auth/PrivateRoute";
import EmailDashboard from "./components/dashboard/EmailDashboard";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/Signup";
import SvgLocation from "./pages/Test";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/test" element={<SvgLocation />} />

            <Route path="/" element={<EmailDashboard />} />
            {/* <Route path="/" element={<Navigate to="/inbox" replace />} />
            <Route path="*" element={<Navigate to="/inbox" replace />} /> */}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
