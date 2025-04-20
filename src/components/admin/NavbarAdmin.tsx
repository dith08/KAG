import React from "react";
import { FaUserCircle, FaSearch } from "react-icons/fa";

const NavbarAdmin: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-green-700 text-white flex items-center h-24 shadow-md">
      {/* Logo */}
      <div className=" h-24 flex flex-col items-center justify-center ml-15 mr-[28px]">
        <h2 className="text-2xl font-bold leading-tight">KARYA ADI</h2>
        <h2 className="text-2xl font-bold">GRAFIKA</h2>
      </div>

      {/* Search Bar */}
      <div className="relative w-1/3 ml-10">
        <input
          type="text"
          placeholder="Search"
          className="px-5 py-2 w-full rounded-md text-black pl-12 bg-white/50 shadow-md"
        />
        <FaSearch className="absolute left-4 top-2.5 text-gray-500" />
      </div>

      {/* Profile */}
      <div className="flex items-center bg-[#F9A825]/75 p-2 px-5 rounded-lg ml-auto mr-10">
        <span className="mr-3 font-semibold">Radith</span>
        <FaUserCircle className="text-xl" />
      </div>
    </div>
  );
};

export default NavbarAdmin;
