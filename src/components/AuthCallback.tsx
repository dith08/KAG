import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    console.log("✅ AuthCallback mounted");

    // Reset flag dulu supaya tidak stuck jika pernah gagal sebelumnya
    if (localStorage.getItem("processing_token") === "true") {
      console.log("⚠️ Resetting processing_token flag to false");
      localStorage.removeItem("processing_token");
    }

    const params = new URLSearchParams(window.location.search);
    let token = params.get("token");
    console.log("🔑 Token from URL:", token);

    if (token) {
      localStorage.setItem("token", token);
      console.log("💾 Token saved to localStorage");
    } else {
      token = localStorage.getItem("token");
      console.log("📦 Fallback token from localStorage:", token);
    }

    if (!token) {
      console.warn("⛔ Token missing. Redirecting to /login...");
      navigate("/login", { replace: true });
      return;
    }

    localStorage.setItem("processing_token", "true");
    console.log("🚀 Starting fetch user");

    const fetchUser = async () => {
      try {
        const response = await api.get("/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("👤 User profile response:", response.data);

        const userData = {
          id: response.data.id,
          name: response.data.name,
          role: response.data.user_role,
        };

        await login(userData, token);
        localStorage.removeItem("processing_token");
        console.log("✅ Login successful. Redirecting to /");
        navigate("/", { replace: true });
      } catch (err) {
        console.error("❌ Gagal mengambil data user:", err);
        localStorage.removeItem("processing_token");
        navigate("/login", { replace: true });
      }
    };

    fetchUser();
  }, [login, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h2>Sedang memproses login...</h2>
      <p>Silakan tunggu sebentar.</p>
      <p>
        Jika halaman ini tidak berubah,{" "}
        <a href="/login" style={{ color: "blue", textDecoration: "underline" }}>
          klik di sini untuk login ulang
        </a>
        .
      </p>
    </div>
  );
};

export default AuthCallback;
