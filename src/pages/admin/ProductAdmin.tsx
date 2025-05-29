import NavbarAdmin from "../../components/admin/NavbarAdmin";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import { Icon } from "@iconify/react";
import UkuranTabel from "../../components/admin/UkuranTabel";
import StokBahanTabel from "../../components/admin/StokBahanTabel";
import ProdukTabel from "../../components/admin/ProdukTabel";
import FinishingTabel from "../../components/admin/FinishingTabel";

const ProductAdminPage: React.FC = () => {
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

          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-8">
            {/* Bahan Baku */}
            <div className="order-1">
              <StokBahanTabel />
            </div>

            {/* Ukuran */}
            <div className="order-2">
              <UkuranTabel />
            </div>

            {/* Produk */}
            <div className="order-3">
              <ProdukTabel />
            </div>

            {/* Finishing */}
            <div className="order-4">
              <FinishingTabel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAdminPage;
