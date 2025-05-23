import React from "react";
import { OrderStatus } from "./Types";
import { motion } from "framer-motion";

interface TabBarProps {
  activeTab: OrderStatus;
  onChangeTab: (tab: OrderStatus) => void;
}

const TabBar: React.FC<TabBarProps> = ({ activeTab, onChangeTab }) => {
  const tabs = [
    {
      id: OrderStatus.WAITING_CONFIRMATION,
      label: "Menunggu Konfirmasi",
      shortLabel: "Menunggu",
    },
    {
      id: OrderStatus.PROCESSING,
      label: "Sedang Diproses",
      shortLabel: "Diproses",
    },
    { id: OrderStatus.SHIPPED, label: "Dikirim", shortLabel: "Dikirim" },
    { id: OrderStatus.COMPLETED, label: "Selesai", shortLabel: "Selesai" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md mb-4 p-2 md:p-4 w-full">
      {/* Desktop & Tablet View */}
      <div className="hidden md:flex justify-around w-full">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`text-center cursor-pointer relative py-2 px-4 transition-colors duration-200 ${
              activeTab === tab.id
                ? "text-green-700 font-medium"
                : "text-gray-600 font-medium hover:text-green-600"
            }`}
            onClick={() => onChangeTab(tab.id)}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-green-700 rounded-t"
                layoutId="desktop-underline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Mobile View - Fixed Tabs */}
      <div className="md:hidden grid grid-cols-4 gap-1 w-full py-2">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`flex justify-center items-center cursor-pointer relative py-2 px-2 rounded-md text-sm transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-green-100 text-green-700 font-medium"
                : "text-gray-600 font-medium hover:bg-gray-100"
            }`}
            onClick={() => onChangeTab(tab.id)}
          >
            {tab.shortLabel}
            {activeTab === tab.id && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-green-700 rounded-t"
                layoutId="mobile-underline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabBar;
