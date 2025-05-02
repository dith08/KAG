import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface PrivateRouteProps {
  element: React.ReactElement;
  role?: string; // optional: kalau nggak ada role berarti hanya cek login
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, role }) => {
  const { isLoggedIn, user } = useAuth(); // Ambil user dari context

  if (!isLoggedIn) {
    // Belum login → redirect ke login
    return <Navigate to="/login" replace />;
  }

  if (role && user?.role !== role) {
    // Sudah login tapi role salah → redirect ke 404 atau unauthorized
    return <Navigate to="*" replace />;
  }

  // Jika lolos semua → render element
  return element;
};

export default PrivateRoute;
