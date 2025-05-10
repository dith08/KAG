import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import Button from "../components/Button";
import api from "../services/api"; // axios instance
import axios from "axios";
import { useToast } from "../components/toast/useToast";

const RegisterPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!name || !email || !password || !phone || !confirmPassword) {
      setError("Harap isi semua kolom!");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak sama!");
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post("/api/register", {
        name,
        email,
        password,
        phone,
      });

      showToast("Registrasi berhasil. Silahkan login.", "success");
      navigate("/login");
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
      <div className="flex flex-col justify-center min-h-[80vh] w-full">
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
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Konfirmasi password"
              icon="mdi:lock-check"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              showPassword={showConfirmPassword}
              togglePasswordVisibility={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
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
        </form>

        <div className="mt-6 text-center">
          Sudah punya akun?{" "}
          <a
            href="/login"
            className="text-green-700 font-medium hover:text-green-600"
          >
            Login
          </a>
        </div>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
