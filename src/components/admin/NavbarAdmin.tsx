import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

const NavbarAdmin: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
    navigate("/login");
  };

  return (
    <div>
      {/* Navbar Desktop */}
      <div className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-green-700 text-white items-center h-24 shadow-md">
        <div className="h-24 flex flex-col items-center justify-center ml-15 mr-[28px]">
          <h2 className="text-2xl font-bold leading-tight">KARYA ADI</h2>
          <h2 className="text-2xl font-bold">GRAFIKA</h2>
        </div>
        <div className="relative w-1/3 ml-10">
          <input
            type="text"
            placeholder="Search"
            className="px-5 py-2 w-full rounded-md text-black pl-12 bg-white/50 shadow-md"
          />
          <Icon
            icon="mdi:magnify"
            className="absolute left-4 top-2.5 text-gray-500 text-xl"
          />
        </div>

        {/* Profile Desktop */}
        <div className="relative ml-auto mr-10">
          <div
            className="flex items-center bg-yellow-500 p-2 px-5 rounded-lg cursor-pointer"
            onClick={toggleDropdown}
          >
            <span className="mr-3 font-semibold">Radith</span>
            <Icon icon="mdi:account-circle" className="text-xl" />
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg overflow-hidden z-50">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Navbar Mobile */}
      <div className="flex md:hidden fixed top-0 left-0 right-0 z-50 bg-white text-black items-center h-16 shadow-md px-4">
        <button onClick={toggleSidebar}>
          <Icon icon="mdi:menu" className="text-2xl" />
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
        <div className="relative ml-auto">
          <div
            className="flex items-center bg-yellow-500 p-2 px-5 rounded-lg cursor-pointer"
            onClick={toggleDropdown}
          >
            <Icon icon="mdi:account-circle" className="text-xl" />
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg overflow-hidden z-50">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
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
