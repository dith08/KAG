import React, { useState } from "react";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import OrderCardAdmin from "../../components/admin/OrderCardAdmin";

const PesananAdmin: React.FC = () => {
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
    <div>
      <NavbarAdmin />
      <SidebarAdmin />
      <div className="md:ml-64 mt-24 p-4">
        <h1 className="text-2xl font-bold mb-4">Kelola Pesanan</h1>
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
  );
};

export default PesananAdmin;
