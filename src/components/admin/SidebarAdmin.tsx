import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaBox, FaMoneyBill, FaShippingFast, FaCog } from "react-icons/fa";

const SidebarAdmin: React.FC = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-[#2E7D32]/90 text-white min-h-screen flex flex-col">
      {/* Background untuk logo dengan ukuran navbar */}
      <div className="bg-green-700 h-24 flex flex-col items-center justify-center">
  <h2 className="text-2xl font-bold leading-tight">KARYA ADI</h2>
  <h2 className="text-2xl font-bold">GRAFIKA</h2>
</div>


      {/* Menu Sidebar */}
      <ul className="space-y-2 p-4">
        <li>
          <Link
            to="/admin"
            className={`flex items-center p-3 rounded hover:bg-green-600 ${location.pathname === "/admin" ? "bg-white/20" : ""}`}
          >
            <FaHome className="mr-2" /> Home
          </Link>
        </li>
        <li>
          <Link
            to="/admin/produk"
            className={`flex items-center p-3 rounded hover:bg-green-600 ${location.pathname === "/admin/produk" ? "bg-white/20" : ""}`}
          >
            <FaBox className="mr-2" /> Kelola Produk
          </Link>
        </li>
        <li>
          <Link
            to="/admin/pesanan"
            className={`flex items-center p-3 rounded hover:bg-green-600 ${location.pathname === "/admin/pesanan" ? "bg-white/20" : ""}`}
          >
            <FaMoneyBill className="mr-2" /> Kelola Pesanan
          </Link>
        </li>
        <li>
          <Link
            to="/admin/pengiriman"
            className={`flex items-center p-3 rounded hover:bg-green-600 ${location.pathname === "/admin/pengiriman" ? "bg-white/20" : ""}`}
          >
            <FaShippingFast className="mr-2" /> Kelola Pengiriman
          </Link>
        </li>
        <li>
          <Link
            to="/admin/pengaturan"
            className={`flex items-center p-3 rounded hover:bg-green-600 ${location.pathname === "/admin/pengaturan" ? "bg-white/20" : ""}`}
          >
            <FaCog className="mr-2" /> Kelola Pengaturan
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarAdmin;
