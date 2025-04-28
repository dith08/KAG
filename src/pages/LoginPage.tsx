import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import Button from "../components/Button";
import SocialButton from "../components/SocialButton";
import api from "../services/api"; // axios instance
import axios from "axios";
import { useToast } from "../components/toast/useToast";
import { getBaseUrl } from "../utils/getBaseUrl";
import { useAuth } from "../context/AuthContext";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email || !password) {
      setError("Harap isi semua kolom!");
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post("/api/login", {
        email,
        password,
      });

      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
        login(); // ← panggil dari context agar Navbar re-render

        const userRole = response.data.users?.user_role;
        showToast("Login berhasil!", "success");

        if (userRole === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        setError("Login gagal. Token tidak ditemukan.");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.message || "Email atau password salah.";
        setError(message);
      } else {
        setError("Gagal login. Silakan coba lagi.");
        console.error(err);
      }
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const handleGoogleLogin = () => {
    // Redirect user to the Laravel backend for Google authentication
    window.location.href = `${getBaseUrl()}/auth/google`;
  };

  return (
    <AuthLayout imageSrc="/images/auth_image.png">
      <h2 className="text-[24px] md:text-[32px] font-medium mb-2">
        Welcome Back!
      </h2>
      <p className="mb-6 text-[18px]">
        Masukkan email dan password untuk akses <br /> akun anda
      </p>

      {error && (
        <div className="mb-4 text-red-500 text-sm font-medium">{error}</div>
      )}

      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <InputField
            type="email"
            placeholder="Masukkan email"
            icon="mdi:email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <InputField
            type={showPassword ? "text" : "password"}
            placeholder="Masukkan password"
            icon="mdi:lock"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showPassword={showPassword}
            togglePasswordVisibility={() => setShowPassword(!showPassword)}
          />
        </div>

        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="mr-2 scale-120 accent-green-700 cursor-pointer"
            />
            <label htmlFor="remember">Ingat saya</label>
          </div>
          <a
            href="/forgot-password"
            className="text-green-700 text-base font-medium hover:text-green-600"
          >
            Lupa password?
          </a>
        </div>

        <Button
          type="submit"
          text="Login"
          className="bg-green-700 text-white hover:bg-green-600"
          loading={isLoading}
        />

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-sm text-gray-500">Or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
      </form>

      <SocialButton
        icon="logos:google-icon"
        text="Login dengan Google"
        onClick={handleGoogleLogin}
      />

      <div className="mt-6 text-center">
        Tidak punya akun?{" "}
        <a
          href="/register"
          className="text-green-700 font-medium hover:text-green-600"
        >
          Register
        </a>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
