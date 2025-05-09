import { Icon } from "@iconify/react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const SidebarAdmin: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    {
      path: "/admin",
      label: "Dashboard",
      iconOutline: "mdi:home-outline",
      iconFilled: "mdi:home",
    },
    {
      path: "/admin/produk",
      label: "Kelola Produk",
      iconOutline: "mdi:archive-outline",
      iconFilled: "mdi:archive",
    },
    {
      path: "/admin/pesanan",
      label: "Kelola Pesanan",
      iconOutline: "mdi:cash",
      iconFilled: "mdi:cash-multiple",
    },
    {
      path: "/admin/statistik",
      label: "Statistik",
      iconOutline: "mdi:chart-box-outline",
      iconFilled: "mdi:chart-box",
    },
    {
      path: "/admin/pengaturan",
      label: "Kelola Pengaturan",
      iconOutline: "mdi:cog-outline",
      iconFilled: "mdi:cog",
    },
  ];

  return (
    <div className="w-64 bg-green-700 text-white h-screen flex-col fixed top-0 left-0 z-40 overflow-y-auto md:block hidden shadow-lg pt-24">
      <ul className="space-y-3 p-4">
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
                <Icon
                  icon={isActive ? item.iconFilled : item.iconOutline}
                  className="mr-3 w-6 h-6"
                />
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
