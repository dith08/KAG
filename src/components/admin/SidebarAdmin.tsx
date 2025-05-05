import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaMoneyBill,
  FaCog,
  FaChartBar,
} from "react-icons/fa";

const SidebarAdmin: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/admin", label: "Home", icon: <FaHome className="mr-3" /> },
    { path: "/admin/produk", label: "Kelola Produk", icon: <FaBox className="mr-3" /> },
    { path: "/admin/pesanan", label: "Kelola Pesanan", icon: <FaMoneyBill className="mr-3" /> },
    { path: "/admin/statistik", label: "Statistik", icon: <FaChartBar className="mr-3" /> },
    { path: "/admin/pengaturan", label: "Kelola Pengaturan", icon: <FaCog className="mr-3" /> },
  ];

  return (
    <div className="w-64 bg-[#2E7D32]/90 text-white h-screen flex flex-col fixed top-0 left-0 z-40 mt-24 overflow-y-auto md:block hidden shadow-lg">
      <ul className="space-y-2 p-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center p-3 rounded-lg transition-all duration-200 font-medium
                  ${
                    isActive
                      ? "bg-white/20 text-white translate-x-1"
                      : "hover:bg-white/10 hover:translate-x-1"
                  }`}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SidebarAdmin;
