import React from "react";
import { Icon } from "@iconify/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useNavbar } from "./useNavbar";
import { useAuth } from "../../context/AuthContext";

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  brand: string;
  navItems: NavItem[];
}

const Navbar: React.FC<NavbarProps> = ({ brand, navItems }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    isDropdownOpen,
    setIsDropdownOpen,
    drawerRef,
    dropdownRef,
  } = useNavbar();

  const profileImage = isLoggedIn ? "/images/user.png" : "/images/user.png";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <nav className="bg-green-700 px-4 sm:px-6 lg:px-20 py-3 sm:py-4 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand */}
        <div className="text-white font-bold text-lg sm:text-xl lg:text-2xl">
          {brand}
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-white text-xl sm:text-2xl"
          onClick={() => setIsDrawerOpen(true)}
        >
          <Icon icon="mdi:menu" />
        </button>

        {/* Drawer */}
        <div
          ref={drawerRef}
          className={`fixed top-0 left-0 h-full w-64 sm:w-72 bg-white z-50 shadow-lg transform ${
            isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300`}
        >
          <div className="p-4 sm:p-6">
            <button
              className="text-gray-600 text-xl sm:text-2xl mb-4"
              onClick={closeDrawer}
            >
              <Icon icon="mdi:close" />
            </button>

            {/* Profile Section */}
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
                  <p className="text-green-700 font-medium text-base sm:text-lg">
                    {isLoggedIn ? "Akun Saya" : "Selamat Datang"}
                  </p>
                </div>

                {isLoggedIn && (
                  <Link
                    to="/customer/notification"
                    className="text-green-700 ml-2 sm:ml-4"
                    onClick={closeDrawer}
                  >
                    <Icon
                      icon="mdi:bell-outline"
                      className="text-xl sm:text-2xl"
                    />
                  </Link>
                )}
              </div>

              {/* Drawer Actions */}
              <div className="mt-4 sm:mt-6">
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/customer/profile"
                      className="block px-4 py-2 text-green-700 hover:bg-green-100 rounded-md text-sm sm:text-base"
                      onClick={closeDrawer}
                    >
                      Profile Saya
                    </Link>
                    <Link
                      to="/customer/pesanan"
                      className="block px-4 py-2 text-green-700 hover:bg-green-100 rounded-md text-sm sm:text-base"
                      onClick={closeDrawer}
                    >
                      Pesanan Saya
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-md text-sm sm:text-base"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-green-700 hover:bg-green-100 rounded-md text-sm sm:text-base"
                      onClick={closeDrawer}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-2 text-green-700 hover:bg-green-100 rounded-md text-sm sm:text-base"
                      onClick={closeDrawer}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Drawer Navigation Links */}
            <ul className="space-y-3 sm:space-y-4 mt-4 sm:mt-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={`block px-4 py-2 rounded-md text-sm sm:text-base text-green-700 hover:bg-green-100 ${
                      pathname === item.href ? "bg-green-100 font-medium" : ""
                    }`}
                    onClick={closeDrawer}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex space-x-6 items-center">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={`text-white px-4 py-2 rounded-lg hover:underline underline-offset-8 ${
                  pathname === item.href ? "underline font-medium" : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}

          {isLoggedIn && (
            <li>
              <Link
                to="/customer/notification"
                className="text-white hover:text-green-200"
              >
                <Icon icon="mdi:bell" className="text-2xl" />
              </Link>
            </li>
          )}

          {/* Profile Button */}
          <li className="relative">
            {isLoggedIn ? (
              <Link
                to="/customer/profile"
                className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden block"
              >
                <img
                  src={profileImage}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </Link>
            ) : (
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
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-green-700 hover:bg-green-50 rounded-t-lg"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-2 text-green-700 hover:bg-green-50 rounded-b-lg"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
