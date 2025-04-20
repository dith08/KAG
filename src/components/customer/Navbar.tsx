import React from "react";
import { Icon } from "@iconify/react";
import { useLocation } from "react-router-dom";
import { useNavbar } from "./useNavbar";

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  brand: string;
  navItems: NavItem[];
  isLoggedIn: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ brand, navItems, isLoggedIn }) => {
  const location = useLocation(); // Dapatkan halaman aktif
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    isDropdownOpen,
    setIsDropdownOpen,
    drawerRef,
    dropdownRef,
  } = useNavbar();

  const profileImage = isLoggedIn ? "/images/man.png" : "/images/user.png";

  return (
    <nav className="bg-green-700 px-4 sm:px-6 lg:px-20 py-3 sm:py-4 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand */}
        <div className="text-white font-bold text-lg sm:text-xl lg:text-2xl">
          {brand}
        </div>

        {/* Mobile & Tablet Menu Button (visible on sm and md screens) */}
        <button
          className="lg:hidden text-white text-xl sm:text-2xl cursor-pointer"
          onClick={() => setIsDrawerOpen(true)}
        >
          <Icon icon="mdi:menu" />
        </button>

        {/* Drawer (Mobile & Tablet Menu) */}
        <div
          ref={drawerRef}
          className={`fixed top-0 left-0 h-full w-64 sm:w-72 bg-white z-50 shadow-lg transform ${
            isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300`}
        >
          <div className="p-4 sm:p-6">
            {/* Close Button */}
            <button
              className="text-gray-600 text-xl sm:text-2xl mb-4 cursor-pointer"
              onClick={() => setIsDrawerOpen(false)}
            >
              <Icon icon="mdi:close" />
            </button>

            {/* Profile Drawer */}
            <div className="border-b pb-4 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-300 rounded-full overflow-hidden">
                    <img
                      src={profileImage}
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-green-700 font-medium text-base sm:text-lg">
                      {isLoggedIn ? "Akun Saya" : "Selamat Datang"}
                    </p>
                  </div>
                </div>

                {/* Notification Icon (Mobile/Tablet) */}
                {isLoggedIn && (
                  <a
                    href="/customer/notification"
                    className="text-green-700 ml-2 sm:ml-4"
                  >
                    <Icon
                      icon="mdi:bell-outline"
                      className="text-xl sm:text-2xl"
                    />
                  </a>
                )}
              </div>

              {/* Profile Menu */}
              <div className="mt-4 sm:mt-6">
                {isLoggedIn ? (
                  <>
                    <a
                      href="/customer/profile"
                      className="block px-4 py-2 text-green-700 hover:bg-green-100 rounded-md text-sm sm:text-base"
                    >
                      Profile Saya
                    </a>
                    <a
                      href="/customer/pesanan"
                      className="block px-4 py-2 text-green-700 hover:bg-green-100 rounded-md text-sm sm:text-base"
                    >
                      Pesanan Saya
                    </a>
                    <a
                      href="/"
                      className="block px-4 py-2 text-red-600 hover:bg-red-50 rounded-md text-sm sm:text-base"
                    >
                      Logout
                    </a>
                  </>
                ) : (
                  <>
                    <a
                      href="/"
                      className="block px-4 py-2 text-green-700 hover:bg-green-100 rounded-md text-sm sm:text-base"
                    >
                      Login
                    </a>
                    <a
                      href="/register"
                      className="block px-4 py-2 text-green-700 hover:bg-green-100 rounded-md text-sm sm:text-base"
                    >
                      Register
                    </a>
                  </>
                )}
              </div>
            </div>

            {/* Navigation Links */}
            <ul className="space-y-3 sm:space-y-4 mt-4 sm:mt-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`text-green-700 block px-4 py-2 hover:bg-green-100 rounded-md text-sm sm:text-base ${
                      location.pathname === item.href
                        ? "bg-green-100 font-medium"
                        : ""
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Desktop Navigation (visible only on large screens) */}
        <ul className="hidden lg:flex space-x-6 items-center">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`text-white px-4 py-2 rounded-lg hover:underline underline-offset-8 ${
                  location.pathname === item.href ? "underline font-medium" : ""
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}

          {/* Notification Icon (Desktop Only) */}
          <li>
            <a
              href="/customer/notification"
              className="relative text-white hover:text-green-200"
            >
              <Icon icon="mdi:bell" className="text-2xl" />
            </a>
          </li>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <div
              className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden cursor-pointer"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              <img
                src={profileImage}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 border border-gray-200">
                {isLoggedIn ? (
                  <>
                    <a
                      href="/customer/profile"
                      className="block px-4 py-2 text-green-700 hover:bg-green-50 focus:bg-green-100 rounded-t-lg"
                    >
                      Profile Saya
                    </a>
                    <a
                      href="/customer/pesanan"
                      className="block px-4 py-2 text-green-700 hover:bg-green-50 focus:bg-green-100"
                    >
                      Pesanan Saya
                    </a>
                    <a
                      href="/"
                      className="block px-4 py-2 text-red-600 hover:bg-red-50 focus:bg-red-100 rounded-b-lg"
                    >
                      Logout
                    </a>
                  </>
                ) : (
                  <>
                    <a
                      href="/"
                      className="block px-4 py-2 text-green-700 hover:bg-green-50 focus:bg-green-100 rounded-t-lg"
                    >
                      Login
                    </a>
                    <a
                      href="/register"
                      className="block px-4 py-2 text-green-700 hover:bg-green-50 focus:bg-green-100 rounded-b-lg"
                    >
                      Register
                    </a>
                  </>
                )}
              </div>
            )}
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
