import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastProvider } from "./components/toast/ToastProvider";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ToastProvider>
        <App/>
      </ToastProvider>
    </AuthProvider>
  </StrictMode>
);
