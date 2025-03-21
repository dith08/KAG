import React from "react";
import { OrderStatus } from "./Types";
import { motion } from "framer-motion"; // Import motion dari Framer Motion

interface TabBarProps {
  activeTab: OrderStatus;
  onChangeTab: (tab: OrderStatus) => void;
}

const TabBar: React.FC<TabBarProps> = ({ activeTab, onChangeTab }) => {
  const tabs = [
    { id: OrderStatus.WAITING_CONFIRMATION, label: "Menunggu Konfirmasi" },
    { id: OrderStatus.PROCESSING, label: "Sedang Diproses" },
    { id: OrderStatus.SHIPPED, label: "Dikirim" },
    { id: OrderStatus.COMPLETED, label: "Selesai" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md mb-4 p-4 flex justify-around w-full">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`text-center cursor-pointer relative ${
            activeTab === tab.id
              ? "text-green-700 font-medium"
              : "text-black font-medium"
          }`}
          onClick={() => onChangeTab(tab.id)}
        >
          {tab.label}
          {activeTab === tab.id && (
            <motion.div // Menggunakan motion.div
              className="absolute bottom-0 left-0 right-0 h-1 bg-green-700 mt-2 -mb-4 rounded-t"
              layoutId="underline" // Menambahkan layoutId agar Framer Motion tahu elemen mana yang dianimasikan
              initial={{ opacity: 0 }} // Menambahkan initial state
              animate={{ opacity: 1 }} // Menambahkan animate state
              transition={{ duration: 0.3 }} // Menambahkan transition untuk animasi
            ></motion.div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TabBar;
