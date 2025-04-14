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
            className={`text-center cursor-pointer relative py-2 ${
              activeTab === tab.id
                ? "text-green-700 font-medium"
                : "text-black font-medium"
            }`}
            onClick={() => onChangeTab(tab.id)}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-green-700 mt-2 -mb-4 rounded-t"
                layoutId="desktop-underline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              ></motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile View - Horizontal Scrollable Tabs */}
      <div className="md:hidden flex justify-center w-full overflow-x-auto no-scrollbar py-1">
        <div className="flex space-x-4">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`shrink-0 whitespace-nowrap cursor-pointer relative px-3 py-2 ${
                activeTab === tab.id
                  ? "text-green-700 font-medium"
                  : "text-black font-medium"
              }`}
              onClick={() => onChangeTab(tab.id)}
            >
              {tab.shortLabel}
              {activeTab === tab.id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-green-700 mt-1 -mb-1 rounded-t"
                  layoutId="mobile-underline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabBar;
