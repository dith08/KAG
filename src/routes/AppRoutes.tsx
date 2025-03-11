import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/customer/HomePage";
import DashboardAdmin from "../pages/admin/DashboardAdmin";
import NotFound from "../pages/NotFound";

const AppRoutes: React.FC = () => {
    return(
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Customer Routes */}
                <Route path="/customer">
                    {/* Halaman Default Customer */}
                    <Route index element={<HomePage/>}/> 
                </Route>

                {/* Admin Routes */}
                <Route path="/admin">
                    {/* Halaman Default Admin */}
                    <Route index element={<DashboardAdmin/>}/> 
                </Route>

                {/* Not Found */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;