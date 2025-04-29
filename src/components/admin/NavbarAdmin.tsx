import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaMoneyBill,
  FaCog,
  FaChartBar,
  FaBars,
  FaTimes,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";

const NavbarAdmin: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: "/admin", label: "Home", icon: <FaHome className="mr-2" /> },
    { path: "/admin/produk", label: "Kelola Produk", icon: <FaBox className="mr-2" /> },
    { path: "/admin/pesanan", label: "Kelola Pesanan", icon: <FaMoneyBill className="mr-2" /> },
    { path: "/admin/statistik", label: "Statistik", icon: <FaChartBar className="mr-2" /> },
    { path: "/admin/pengaturan", label: "Kelola Pengaturan", icon: <FaCog className="mr-2" /> },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    // Tambahkan logika untuk logout di sini
    console.log("Logout clicked");
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
          <FaSearch className="absolute left-4 top-2.5 text-gray-500" />
        </div>

        {/* Profile Desktop */}
        <div className="relative ml-auto mr-10">
          <div
            className="flex items-center bg-[#F9A825]/75 p-2 px-5 rounded-lg cursor-pointer"
            onClick={toggleDropdown}
          >
            <span className="mr-3 font-semibold">Radith</span>
            <FaUserCircle className="text-xl" />
          </div>

          {/* Dropdown Menu */}
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
          <FaBars className="text-2xl" />
        </button>
        <div className="relative flex-1 mx-4">
          <input
            type="text"
            placeholder="search"
            className="pl-10 pr-4 py-2 w-full rounded-full bg-gray-100 text-black"
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
        </div>

        {/* Profile Mobile */}
        <div className="relative ml-auto">
          <div
            className="flex items-center bg-[#F9A825]/75 p-2 px-5 rounded-lg cursor-pointer"
            onClick={toggleDropdown}
          >
            <FaUserCircle className="text-xl" />
          </div>

          {/* Dropdown Menu */}
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
        } transition-transform duration-300 ease-in-out z-40`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button onClick={toggleSidebar}>
            <FaTimes className="text-2xl" />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="flex flex-col p-4 space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center p-3 rounded hover:bg-green-600 ${
                location.pathname === item.path ? "bg-white/20" : ""
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Background overlay ketika sidebar open */}
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
