import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, AlertCircle, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import { useMutation } from "@tanstack/react-query";
import authApi from "../services/authApi";

const SignupPage = () => {
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: (data) => authApi.register(data),
    onSuccess: (data) => {
      if (data.success) {
        Swal.fire("Thành công !", data.message, "success");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        Swal.fire("Thất bại !", data.message, "error");
      }
    },
    onError: (error) => {
      console.error("Registration error:", error);
      Swal.fire(
        "Thất bại !",
        error.message || "Đăng nhập thất bại. Vui lòng thử lại!",
        "error"
      );
    },
  });

  const handleSignup = (data) => {
    // console.log("data: ", data);
    registerMutation.mutate(data);
  };

  const handleGoogleSignIn = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("Đăng ký Google thành công!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-green-300/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 left-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl"
          style={{
            animation: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          }}
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl shadow-2xl mb-4">
            <User className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-1.5 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Tạo tài khoản
          </h1>
          <p className="text-gray-600 text-base">
            Bắt đầu hành trình của bạn với chúng tôi
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/20">
          <AuthForm
            mode="signup"
            onSubmit={handleSignup}
            onGoogleSignIn={handleGoogleSignIn}
          />
        </div>

        <p className="text-center mt-5 text-gray-600 text-sm">
          Đã có tài khoản?{" "}
          <button
            className="text-blue-600 hover:text-blue-700 font-semibold"
            onClick={() => navigate("/login")}
          >
            Đăng nhập ngay
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
