import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import Button from "../components/Button";
import { useToast } from "../components/toast/useToast";
import clsx from "clsx"; // gunakan clsx untuk dynamic class, simple banget!

const VerifyCodePage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [timer, setTimer] = useState(60);
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  const email = (location.state as { email: string })?.email;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsShaking(false);

    const finalCode = code.join("");

    if (finalCode.length !== 6) {
      setError("Kode verifikasi harus 6 digit!");
      setIsShaking(true);
      return;
    }

    setIsLoading(true);
    try {
      // await axios.post("/verify-code", { email, code: finalCode });

      showToast("Kode berhasil diverifikasi!", "success");
      navigate("/reset-password", { state: { email, code: finalCode } });
    } catch (error) {
      console.error(error);
      showToast("Kode verifikasi salah atau expired!", "error");
      setIsShaking(true);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const handleResendCode = () => {
    setTimer(60);
    showToast("Kode verifikasi dikirim ulang ke email!", "success");
    // await axios.post("/resend-code", { email });
  };

  return (
    <AuthLayout imageSrc="/images/auth_image.png">
      <div className="flex flex-col justify-center min-h-[80vh] w-full">
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-[24px] md:text-[32px] font-medium mb-2 text-left">
            Verifikasi Kode
          </h2>
          <p className="mb-6 text-[18px] text-left">
            Masukkan kode yang dikirim ke email anda
          </p>

          {error && (
            <div className="mb-4 text-red-500 text-sm font-medium text-left">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="w-full">
            <div
              className={clsx(
                "flex justify-between gap-2 mb-6",
                isShaking && "animate-shake"
              )}
            >
              {code.map((value, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={value}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-center text-xl border rounded-md 
                             focus:ring-1 focus:ring-green-700 focus:border-green-700 
                             focus:outline-none 
                             border-gray-500"
                />
              ))}{" "}
            </div>

            <Button
              type="submit"
              text="Verifikasi"
              className="bg-green-700 text-white hover:bg-green-600"
              loading={isLoading}
            />
          </form>

          <div className="mt-6 text-center">
            {timer > 0 ? (
              <p className="text-gray-500">
                Kirim ulang kode dalam{" "}
                <span className="font-semibold">{timer}s</span>
              </p>
            ) : (
              <button
                onClick={handleResendCode}
                className="text-green-700 font-medium hover:text-green-600"
              >
                Kirim Ulang
              </button>
            )}
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyCodePage;
