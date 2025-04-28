import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useToast } from "../components/toast/useToast";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email wajib diisi!");
      return;
    }

    setIsLoading(true);
    try {
      // Kirim OTP ke email
      // await axios.post("/forgot-password-request", { email });

      showToast("Kode verifikasi berhasil dikirim ke email!", "success");
      navigate("/verify-code", { state: { email } });
    } catch (error) {
      console.error(error);
      showToast("Gagal mengirim kode. Coba lagi!", "error");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  return (
    <AuthLayout imageSrc="/images/auth_image.png">
      <div className="flex flex-col justify-center min-h-[80vh] w-full">
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-[24px] md:text-[32px] font-medium mb-2 text-left">
            Lupa Password
          </h2>
          <p className="mb-6 text-[18px] text-left">
            Masukkan email anda untuk menerima <br /> kode verifikasi
          </p>

          {error && (
            <div className="mb-4 text-red-500 text-sm font-medium text-left">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <InputField
                type="email"
                placeholder="Masukkan email"
                icon="mdi:email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              text="Kirim Kode Verifikasi"
              className="bg-green-700 text-white hover:bg-green-600"
              loading={isLoading}
            />
          </form>

          <div className="mt-6 text-center">
            Sudah ingat password?{" "}
            <a
              href="/login"
              className="text-green-700 font-medium hover:text-green-600"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
