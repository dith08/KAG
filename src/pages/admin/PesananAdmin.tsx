import React from "react";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import { Eye } from "lucide-react";

const PesananPage: React.FC = () => {
  const orders = [
    {
      id: 1,
      image: "https://i.pinimg.com/474x/93/93/e1/9393e1708a98f94b38c31216b6ebcf1c.jpg",
      title: "Buku Tulis",
      variant: "16cm x 21cm",
      quantity: "300pcs",
      price: "Rp. 671.000",
      buyer: "isham",
      address: "kaliwungu, kudus, jawa...",
      status: "...",
      note: "...",
      payment: "Tunai",
      design: "Gambar",
    },
    {
      id: 2,
      image: "https://i.pinimg.com/474x/93/93/e1/9393e1708a98f94b38c31216b6ebcf1c.jpg",
      title: "Buku Tulis",
      variant: "16cm x 21cm",
      quantity: "300pcs",
      price: "Rp. 671.000",
      buyer: "isham",
      address: "kaliwungu, kudus, jawa...",
      status: "...",
      note: "...",
      payment: "Tunai",
      design: "Gambar",
    },
    {
      id: 3,
      image: "https://i.pinimg.com/474x/93/93/e1/9393e1708a98f94b38c31216b6ebcf1c.jpg",
      title: "Buku Tulis",
      variant: "16cm x 21cm",
      quantity: "300pcs",
      price: "Rp. 671.000",
      buyer: "isham",
      address: "kaliwungu, kudus, jawa...",
      status: "...",
      note: "...",
      payment: "Tunai",
      design: "Gambar",
    },
  ];

  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="flex-1">
        <NavbarAdmin />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Kelola Pesanan</h1>

          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-[#FFE082] rounded-lg p-4 shadow">
                <div className="flex justify-between">
                  <div className="flex gap-4">
                    <img
                      src={order.image}
                      alt={order.title}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div>
                      <h2 className="font-bold text-lg">{order.title}</h2>
                      <p className="text-sm">Variasi<br />{order.variant}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{order.quantity}</p>
                    <p className="text-sm font-bold">{order.price}</p>
                    <p className="text-sm text-blue-800 underline cursor-pointer">{order.design}</p>
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-4 mt-4 text-sm">
                  <div>
                    <p className="text-gray-700 font-medium">Pembeli</p>
                    <p>{order.buyer}</p>
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium">Alamat</p>
                    <p>{order.address}</p>
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium">Status</p>
                    <p>{order.status}</p>
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium">Catatan</p>
                    <p>{order.note}</p>
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium">Pembayaran</p>
                    <p>{order.payment}</p>
                  </div>
                </div>

                <div className="flex justify-end mt-2">
                  <button className="text-gray-700 hover:text-black">
                    <Eye size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default PesananPage;
