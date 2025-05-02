import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let token = params.get("token");
    console.log("Token found:", token);
  
    // SIMPAN token segera biar nggak hilang di rerender berikut
    if (token) {
      localStorage.setItem("token", token);
    } else {
      // fallback ambil dari localStorage kalau token hilang
      token = localStorage.getItem("token");
      console.log("Fallback token from localStorage:", token);
    }
  
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }
  
    if (localStorage.getItem("processing_token") === "true") {
      console.log("Already processing token, skipping...");
      return;
    }
  
    localStorage.setItem("processing_token", "true");
  
    const fetchUser = async () => {
      try {
        const response = await api.get("/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        const userData = {
          id: response.data.id,
          name: response.data.name,
          role: response.data.user_role,
        };
  
        login(userData, token);
        localStorage.removeItem("processing_token");
        navigate("/", { replace: true });
      } catch (err) {
        console.error("Gagal mengambil data user:", err);
        localStorage.removeItem("processing_token");
        navigate("/login", { replace: true });
      }
    };
  
    fetchUser();
  }, [login, navigate]);
  

  return <div>Sedang memproses login...</div>;
};

export default AuthCallback;
