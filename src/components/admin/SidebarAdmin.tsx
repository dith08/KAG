import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaMoneyBill,
  FaShippingFast,
  FaCog,
  FaCreditCard,
  FaChartBar,
} from "react-icons/fa";

const SidebarAdmin: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/admin", label: "Home", icon: <FaHome className="mr-2" /> },
    { path: "/admin/produk", label: "Kelola Produk", icon: <FaBox className="mr-2" /> },
    { path: "/admin/pesanan", label: "Kelola Pesanan", icon: <FaMoneyBill className="mr-2" /> },
    { path: "/admin/pengiriman", label: "Kelola Pengiriman", icon: <FaShippingFast className="mr-2" /> },
    { path: "/admin/pembayaran", label: "Kelola Pembayaran", icon: <FaCreditCard className="mr-2" /> },
    { path: "/admin/statistik", label: "Statistik", icon: <FaChartBar className="mr-2" /> },
    { path: "/admin/pengaturan", label: "Kelola Pengaturan", icon: <FaCog className="mr-2" /> },
  ];

  return (
    <div className="w-64 bg-[#2E7D32]/90 text-white h-screen flex flex-col fixed top-0 left-0 z-40 mt-24 overflow-y-auto">
      {/* Menu */}
      <ul className="space-y-2 p-4">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`flex items-center p-3 rounded hover:bg-green-600 ${
                location.pathname === item.path ? "bg-white/20" : ""
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarAdmin;
