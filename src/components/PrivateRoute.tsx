// src/components/PrivateRoute.tsx
import React, { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { isLoggedIn } = useAuth(); // Mengambil status login dari context

  // Jika tidak login, alihkan ke halaman login
  return isLoggedIn ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
