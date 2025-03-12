import React, { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import Button from "../components/Button";
import SocialButton from "../components/SocialButton";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthLayout imageSrc="/images/auth_image.png">
      <h2 className="text-[24px] md:text-[32px] font-medium mb-2">
        Buat Akun Baru
      </h2>
      <p className="mb-6 text-[18px]">
        Daftar untuk mendapatkan akses ke akun Anda
      </p>

      <form>
        <div className="mb-4">
          <InputField
            type="text"
            placeholder="Masukkan username"
            icon="mdi:account"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          text="Daftar"
          className="bg-green-700 text-white hover:bg-green-600"
        />

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-sm text-gray-500">Atau</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className="flex justify-between gap-4">
          <SocialButton
            icon="logos:google-icon"
            text="Daftar dengan Google"
            onClick={() => console.log("Daftar dengan Google")}
          />

          <SocialButton
            icon="fa6-brands:facebook"
            text="Daftar dengan Facebook"
            onClick={() => console.log("Daftar dengan Facebook")}
            iconClassName="text-[#1877F2]"
          />
        </div>
      </form>

      {/* Link ke Login */}
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
