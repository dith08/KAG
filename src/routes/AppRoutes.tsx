import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/customer/HomePage";
import DashboardAdmin from "../pages/admin/DashboardAdmin";
import NotFound from "../pages/NotFound";
import ProdukPage from "../pages/customer/ProdukPage";
import PesananSayaPage from "../pages/customer/PesananSayaPage";
import KeranjangPage from "../pages/customer/KeranjangPage";
import NotificationPage from "../pages/customer/NotificationPage";
import ProfilePage from "../pages/customer/ProfilePage";
import ProductPage from "../pages/admin/ProductAdmin";
import CheckoutPage from "../pages/customer/CheckoutPage";
import PesananPage from "../pages/admin/PesananAdmin";
import ProdukDetailPage from "../pages/customer/ProductDetailPage";
import AdminSettings from "../pages/admin/SettingsAdmin";
import StatistikPage from "../pages/admin/StatisticAdmin";


const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Customer Routes */}
        <Route path="/customer">
          {/* Halaman Default Customer */}
          <Route index element={<HomePage />} />
          <Route path="produk" element={<ProdukPage />} />
          <Route path="produk/:slug" element={<ProdukDetailPage />} />
          <Route path="pesanan" element={<PesananSayaPage />} />
          <Route path="keranjang" element={<KeranjangPage />} />
          <Route path="notification" element={<NotificationPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="checkout" element={<CheckoutPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin">
          {/* Halaman Default Admin */}
          <Route index element={<DashboardAdmin />} />
          <Route path="produk" element={<ProductPage />} />
          <Route path="pesanan" element={<PesananPage />} />
          <Route path="pengaturan" element={<AdminSettings/>} />
          <Route path="statistik" element={<StatistikPage/>} />

        </Route>

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
