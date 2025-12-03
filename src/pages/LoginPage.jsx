import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import authApi from "../services/authApi";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
const LoginPage = () => {
  const navigate = useNavigate();
  const loginMutation = useMutation({
    mutationFn: (data) => authApi.login(data.email, data.password),
    onSuccess: (data) => {
      if (data.code == 200) {
        Swal.fire("Success!", "Login successful!", "success");
      } else {
        Swal.fire("Failed!", "Login failed. Please try again!", "error");
      }

      if (data.code == 200) {
        navigate("/");
      }
    },
    onError: (error) => {
      console.log("Login error:", error);
      Swal.fire("Failed!", "Login failed. Please try again!", "error");
    },
  });
  const handleLogin = (data) => {
    loginMutation.mutate(data);
  };
  const loginGoogleMutation = useMutation({
    mutationFn: () => authApi.loginGoogle(),
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      console.log("Login error:", error);
    },
  });
  const handleGoogleSignIn = async () => {
    loginGoogleMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"
          style={{
            animation: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          }}
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-2xl mb-4">
            <Mail className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-1.5 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-slate-600 text-base">
            Sign in to access your email
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/20">
          <AuthForm
            mode="login"
            onSubmit={handleLogin}
            onGoogleSignIn={handleGoogleSignIn}
          />
        </div>

        <p className="text-center mt-5 text-slate-600 text-sm">
          Don't have an account?{" "}
          <button
            className="text-blue-600 hover:text-blue-700 font-semibold"
            onClick={() => navigate("/signup")}
          >
            Sign up for free
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
