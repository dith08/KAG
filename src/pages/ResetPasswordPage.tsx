import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import Button from "../components/Button";
import { useToast } from "../components/toast/useToast";
import InputField from "../components/InputField";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { email, code } = location.state as { email: string; code: string };
  const { showToast } = useToast();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Password tidak cocok!");
      return;
    }

    if (password.length < 6) {
      setError("Password harus lebih dari 6 karakter!");
      return;
    }

    setIsLoading(true);
    try {
      // Panggil API untuk reset password
      // await axios.post("/reset-password", { email, code, password });

      showToast("Password berhasil diperbarui!", "success");
      navigate("/login");
    } catch (error) {
      console.error(error);
      showToast("Terjadi kesalahan, coba lagi!", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout imageSrc="/images/auth_image.png">
      <div className="flex flex-col justify-center min-h-[80vh] w-full">
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-[24px] md:text-[32px] font-medium mb-2 text-left">
            Reset Password
          </h2>
          <p className="mb-6 text-[18px] text-left">
            Masukkan password baru untuk akun Anda
          </p>

          {error && (
            <div className="mb-4 text-red-500 text-sm font-medium text-left">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <InputField
              type={"password"}
              placeholder={"Masukkan password baru"}
              icon={"mdi:lock"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputField
              type={"password"}
              placeholder={"Konfirmasi password baru"}
              icon={"mdi:lock-check"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              type="submit"
              text="Simpan Password"
              className="w-full bg-green-700 text-white hover:bg-green-600"
              loading={isLoading}
            />
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ResetPasswordPage;