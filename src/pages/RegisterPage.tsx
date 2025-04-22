import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import Button from "../components/Button";
import SocialButton from "../components/SocialButton";
import api from "../services/api"; // axios instance
import axios from "axios";
import { useToast } from "../components/toast/useToast";

const RegisterPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!name || !email || !password || !phone) {
      setError("Nama, email, password, dan nomor telepon wajib diisi.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post("/register", {
        name,
        email,
        password,
        phone,
      });

      showToast("Registrasi berhasil. Silahkan login.", "success");
      navigate("/");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.message || "Registrasi gagal. Coba lagi.";
        setError(message);
      } else {
        setError("Terjadi kesalahan. Coba lagi.");
        console.error(err);
      }
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <AuthLayout imageSrc="/images/auth_image.png">
      <h2 className="text-[24px] md:text-[32px] font-medium mb-2">
        Get Started Now
      </h2>
      <p className="mb-6 text-[18px]">
        Masukkan informasi anda untuk membuat akun <br /> dan mulai memesan
      </p>

      {error && (
        <div className="mb-4 text-red-500 text-sm font-medium">{error}</div>
      )}

      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <InputField
            type="text"
            placeholder="Masukkan username"
            icon="mdi:account"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

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

        <div className="mb-4">
          <InputField
            type="tel"
            placeholder="Masukkan nomor telepon"
            icon="mdi:phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <Button
          type="submit"
          text="Register"
          className="bg-green-700 text-white hover:bg-green-600"
          loading={isLoading}
        />

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-sm text-gray-500">Or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <SocialButton
          icon="logos:google-icon"
          text="Register dengan Google"
          onClick={() => console.log("Register dengan Google")}
        />
      </form>

      <div className="mt-6 text-center">
        Sudah punya akun?{" "}
        <a href="/" className="text-green-700 font-medium hover:text-green-600">
          Login
        </a>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
