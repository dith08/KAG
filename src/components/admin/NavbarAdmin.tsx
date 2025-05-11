import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const NavbarAdmin: React.FC = () => {
  const [username, setUsername] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    api
      .get("/api/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const data = res.data;
        setUsername(data.name);
      })
      .catch((err) => {
        console.error("Gagal mengambil data profil admin:", err);
      });
  }, []);

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

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      {/* Navbar Desktop */}
      <div className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-green-700 text-white items-center h-20 shadow-lg px-6">
        <div className="flex items-center">
          <h2 className="text-xl font-bold tracking-wide">KARYA ADI GRAFIKA</h2>
        </div>
        <div className="relative w-1/3 ml-10">
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 w-full rounded-full bg-green-600 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <Icon
            icon="mdi:magnify"
            className="absolute left-4 top-2.5 text-white text-lg"
          />
        </div>

        <div className="relative ml-auto flex items-center space-x-4">
          <span className="text-sm font-medium">{username || "Memuat..."}</span>
          <div className="relative cursor-pointer" onClick={toggleDropdown}>
            <Icon icon="mdi:account-circle" className="text-3xl" />
            {isDropdownOpen && (
              <div className="fixed inset-0" onClick={toggleDropdown}>
                <div
                  className="absolute top-15 right-5 mt-2 w-44 bg-white text-gray-700 rounded-lg shadow-lg py-2 z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    <Icon icon="mdi:logout" className="mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navbar Mobile */}
      <div className="flex md:hidden fixed top-0 left-0 right-0 z-50 bg-green-700 text-black items-center h-16 shadow-md px-4">
        <button onClick={toggleSidebar}>
          <Icon icon="mdi:menu" className="text-2xl text-white" />
        </button>
        <div className="relative flex-1 mx-4">
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 w-full rounded-full bg-gray-100 text-black"
          />
          <Icon
            icon="mdi:magnify"
            className="absolute left-3 top-2.5 text-gray-400 text-lg"
          />
        </div>

        {/* Profile Mobile */}
        <div className="relative ml-auto cursor-pointer">
          <div onClick={toggleDropdown}>
            <Icon icon="mdi:account-circle" className="text-3xl text-white" />
          </div>

          {isDropdownOpen && (
            <div className="fixed inset-0" onClick={toggleDropdown}>
              <div
                className="absolute top-12 right-5 mt-2 w-44 bg-white text-gray-700 rounded-lg shadow-lg py-2 z-50"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
                >
                  <Icon icon="mdi:logout" className="mr-2" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar Mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-green-700 text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40 mt-16 shadow-lg`}
      >
        <h1 className="text-xl font-bold leading-tight break-words px-6 pt-6">
          KARYA ADI GRAFIKA
        </h1>

        <ul className="space-y-2 p-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center p-3 rounded-lg transition-all duration-200 font-medium ${
                    isActive
                      ? "bg-white/20 text-white translate-x-1"
                      : "hover:bg-white/10 hover:translate-x-1"
                  }`}
                  onClick={toggleSidebar}
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

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-30 z-30"
        ></div>
      )}
    </div>
  );
};

export default NavbarAdmin;
