import React, { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import Button from "../components/Button";
import SocialButton from "../components/SocialButton";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthLayout imageSrc="/images/auth_image.png">
      <h2 className="text-[24px] md:text-[32px] font-medium mb-2">
        Welcome Back!
      </h2>
      <p className="mb-6 text-[18px]">
        Masukkan email dan password untuk akses <br /> akun anda
      </p>

      <form>
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
            href="#"
            className="text-green-700 text-base font-medium hover:text-green-600"
          >
            Lupa password?
          </a>
        </div>

        <Button
          type="submit"
          text="Login"
          className="bg-green-700 text-white hover:bg-green-600"
        />

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-sm text-gray-500">Or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className="flex justify-between gap-4">
          <SocialButton
            icon="logos:google-icon"
            text="Login dengan Google"
            onClick={() => console.log("Login dengan Google")}
          />

          <SocialButton
            icon="fa6-brands:facebook"
            text="Login dengan Facebook"
            onClick={() => console.log("Login dengan Facebook")}
            iconClassName="text-[#1877F2]"
          />
        </div>
      </form>

      <div className="mt-6 text-center">
        Tidak punya akun?{" "}
        <a href="/register" className="text-green-700 font-medium hover:text-green-600">
          Register
        </a>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
