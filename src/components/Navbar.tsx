import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  brand: string;
  navItems: NavItem[];
  profileImage?: string;
  isLoggedIn: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  brand,
  navItems,
  profileImage,
  isLoggedIn,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currentPath = window.location.pathname;

  return (
    <nav className="bg-green-700 px-20 py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand */}
        <div className="text-white font-bold text-[24px]">{brand}</div>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`text-white px-4 py-2 rounded-lg transition duration-300 hover:underline hover:underline-offset-10 focus:outline-none focus:underline focus:underline-offset-10 ${
                  currentPath === item.href
                    ? "underline underline-offset-10"
                    : ""
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Icons & Profile */}
        <div className="flex items-center space-x-4">
          {/* Notifikasi */}
          <a
            href="/customer/notification"
            className="text-white px-3 py-2 rounded-lg transition duration-300 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <Icon icon="mdi:bell" className="text-2xl hover:bg-green-600" />
          </a>

          {/* Profile */}
          <div className="relative" ref={dropdownRef}>
            <div
              className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden cursor-pointer"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              {isLoggedIn ? (
                <img
                  src={profileImage || "/images/man.png"}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src="/images/user.png"
                  alt="Default Avatar"
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Dropdown */}
            {showDropdown && (
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
                      className="block px-4 py-2 text-green-700 hover:bg-green-50 focus:bg-green-100 rounded-b-lg"
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
