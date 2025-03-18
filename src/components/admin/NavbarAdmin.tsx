import React from "react";
import { FaUserCircle, FaSearch } from "react-icons/fa";

const NavbarAdmin: React.FC = () => {
  return (
    <div className="bg-green-700 text-white flex justify-between items-center px-6 h-24">
      {/* Search Bar */}
      <div className="relative w-1/3">
        <input
          type="text"
          placeholder="Search"
          className="px-5 py-2 w-full rounded-md text-black pl-12 bg-white/50 shadow-md"
        />
        <FaSearch className="absolute left-4 top-2.5 text-gray-500" />
      </div>

      {/* Profile */}
      <div className="flex items-center bg-[#F9A825]/75 p-2 px-5 rounded-lg">
        <span className="mr-3 font-semibold">Radith</span>
        <FaUserCircle className="text-xl" />
      </div>
    </div>
  );
};

export default NavbarAdmin;
