import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    // Cek jika token sudah diproses sebelumnya
    if (localStorage.getItem("processing_token") === "true") {
      return;
    }

    localStorage.setItem("processing_token", "true");

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    console.log("Token found:", token);

    if (token) {
      localStorage.setItem("token", token);
      login();
      setTimeout(() => {
        localStorage.removeItem("processing_token");
        navigate("/", { replace: true });
      }, 100);
    } else {
      setTimeout(() => {
        localStorage.removeItem("processing_token");
        navigate("/login", { replace: true });
      }, 100);
    }
  }, [login, navigate]);

  return <div>Sedang memproses login...</div>;
};

export default AuthCallback;
