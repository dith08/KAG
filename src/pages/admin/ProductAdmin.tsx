import NavbarAdmin from "../../components/admin/NavbarAdmin";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import { Icon } from "@iconify/react";
import UkuranTabel from "../../components/admin/UkuranTabel";
import StokBahanTabel from "../../components/admin/StokBahanTabel";
import ProdukTabel from "../../components/admin/ProdukTabel";
import FinishingTabel from "../../components/admin/FinishingTabel";
import { Tabs } from "../../components/admin/Tabs";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ProductAdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("produk");
  const location = useLocation();

  useEffect(() => {
    // Periksa state navigasi untuk mengatur tab aktif
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  const tabs = [
    { id: "produk", label: "Produk" },
    { id: "bahan", label: "Bahan Baku" },
    { id: "ukuran", label: "Ukuran" },
    { id: "finishing", label: "Finishing" },
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <SidebarAdmin />
      <div className="flex-1 w-full lg:ml-64">
        <NavbarAdmin />
        <div className="p-4 lg:p-6 space-y-6 mt-20 lg:mt-24">
          <h1 className="text-xl md:text-2xl font-bold text-center lg:text-left text-green-700 flex items-center gap-2 mb-4">
            <Icon icon="mdi:archive" className="w-8 h-8" />
            KELOLA PRODUK & BAHAN
          </h1>

          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />

          <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6">
            {activeTab === "produk" && <ProdukTabel />}
            {activeTab === "bahan" && <StokBahanTabel />}
            {activeTab === "ukuran" && <UkuranTabel />}
            {activeTab === "finishing" && <FinishingTabel />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAdminPage;