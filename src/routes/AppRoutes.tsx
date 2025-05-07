import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/customer/HomePage";
import NotFound from "../pages/NotFound";
import ProdukPage from "../pages/customer/ProdukPage";
import PesananSayaPage from "../pages/customer/PesananSayaPage";
import KeranjangPage from "../pages/customer/KeranjangPage";
import NotificationPage from "../pages/customer/NotificationPage";
import ProfilePage from "../pages/customer/ProfilePage";
import CheckoutPage from "../pages/customer/CheckoutPage";
import ProdukDetailPage from "../pages/customer/ProductDetailPage";
import PrivateRoute from "../components/PrivateRoute";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import VerifyCodePage from "../pages/VerifyCodePage";
import AuthCallback from "../components/AuthCallback";
import StatisticAdminPage from "../pages/admin/StatisticAdmin";
import SettingsAdminPage from "../pages/admin/SettingsAdmin";
import PesananAdminPage from "../pages/admin/PesananAdmin";
import DashboardAdminPage from "../pages/admin/DashboardAdmin";
import ProductAdminPage from "../pages/admin/ProductAdmin";
import EditProductAdminPage from "../pages/admin/EditProductAdmin";
import DetailPesananAdminPage from "../pages/admin/DetailPesananAdmin";
import AddProduct from "../pages/admin/AddProductAdmin";
import AddBahanBaku from "../pages/admin/AddBahanBakuAdmin";
import EditBahanBakuPage from "../pages/admin/EditBahanBakuAdmin";

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-code" element={<VerifyCodePage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/customer/produk" element={<ProdukPage />} />
        <Route path="/customer/produk/:slug" element={<ProdukDetailPage />} />

        {/* Customer Protected Routes */}
        <Route
          path="/customer"
          element={<PrivateRoute role="customer" element={<Outlet />} />}
        >
          <Route path="pesanan" element={<PesananSayaPage />} />
          <Route path="keranjang" element={<KeranjangPage />} />
          <Route path="notification" element={<NotificationPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="checkout" element={<CheckoutPage />} />
        </Route>

        {/* Admin Protected Routes */}
        <Route
          path="/admin"
          element={<PrivateRoute role="admin" element={<Outlet />} />}
        >
          <Route index element={<DashboardAdminPage />} />
          <Route path="produk" element={<ProductAdminPage />} />
          <Route path="/admin/products/:id/edit" element={<EditProductAdminPage />} />
          <Route path="/admin/products/add" element={<AddProduct />} />
          <Route path="/admin/bahan-baku/add" element={<AddBahanBaku />} />
          <Route path="/admin/bahan-baku/:id/edit" element={<EditBahanBakuPage />} />
          <Route path="pesanan">
            <Route index element={<PesananAdminPage />} />
            <Route path=":id" element={<DetailPesananAdminPage />} />
          </Route>
          <Route path="pengaturan" element={<SettingsAdminPage />} />
          <Route path="statistik" element={<StatisticAdminPage />} />
        </Route>

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
