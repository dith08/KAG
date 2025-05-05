import React, { useState } from "react";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import OrderCardAdmin from "../../components/admin/OrderCardAdmin";
import { Icon } from "@iconify/react";

const PesananAdminPage: React.FC = () => {
  const [orders] = useState([
    {
      id: 1,
      user_id: 101,
      total_harga: 500000,
      status: "Menunggu",
      metode_pembayaran: "Transfer Bank",
      metode_pengiriman: "JNE",
      alamat_pengiriman: "Jl. Mawar No. 10",
      nomor_resi: "",
      catatan: "Tolong kirim cepat",
      lat: -6.2,
      lng: 106.816666,
    },
    {
      id: 2,
      user_id: 102,
      total_harga: 750000,
      status: "Diproses",
      metode_pembayaran: "COD",
      metode_pengiriman: "J&T",
      alamat_pengiriman: "Jl. Melati No. 15",
      nomor_resi: "JT123456789",
      catatan: "",
      lat: -6.914744,
      lng: 107.60981,
    },
  ]);

  return (
      <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
        <SidebarAdmin />
        <div className="flex-1 w-full lg:ml-64">
          <NavbarAdmin />
          <div className="p-4 lg:p-6 space-y-8 mt-18 lg:mt-24">
            <h1 className="text-xl md:text-2xl font-bold text-center lg:text-left text-green-700 flex items-center gap-2 mb-6">
              <Icon icon="mdi:cash-multiple" className="text-green-700 w-8 h-8" /> KELOLA PESANAN
            </h1>
            {orders.map((order) => (
              <OrderCardAdmin
                key={order.id}
                order={{
                  ...order,
                  id: order.id.toString(),
                  user_id: order.user_id.toString(),
                }}
              />
            ))}
          </div>
        </div>
      </div>
  );
};

export default PesananAdminPage;
