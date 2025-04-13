import React from "react";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import OrderCard from "../../components/admin/OrderCardAdmin";

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
              <OrderCard
                key={order.id}
                image={order.image}
                title={order.title}
                variant={order.variant}
                quantity={order.quantity}
                price={order.price}
                design={order.design}
                buyer={order.buyer}
                address={order.address}
                status={order.status}
                note={order.note}
                payment={order.payment}
                onView={() => console.log("Lihat detail pesanan", order.id)}
              />
            ))}
          </div>


        </div>
      </div>
    </div>
  );
};

export default PesananPage;
