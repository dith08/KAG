import React from "react";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import NavbarAdmin from "../../components/admin/NavbarAdmin";

const AdminDashboard: React.FC = () => {
  // Data pesanan dengan format yang benar
  const orders = [
    {
      id: 1,
      image: "https://i.pinimg.com/474x/ad/6f/e9/ad6fe9b9c301067ddcc039a56294bd78.jpg",
      name: "Isham",
      quantity: "500pcs",
      productType: "Paper Bag",
      date: "17-07-1945",
    },
    {
      id: 2,
      image: "https://i.pinimg.com/474x/ad/6f/e9/ad6fe9b9c301067ddcc039a56294bd78.jpg",
      name: "Eco",
      quantity: "300pcs",
      productType: "Friendly Box",
      date: "01-01-2000",
    },
    {
      id: 3,
      image: "https://i.pinimg.com/474x/ad/6f/e9/ad6fe9b9c301067ddcc039a56294bd78.jpg",
      name: "Recycled",
      quantity: "1000pcs",
      productType: "Packaging",
      date: "12-12-2023",
    },
  ];

  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="flex-1">
        <NavbarAdmin />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Pesanan</h1>

          {/* Grid Layout untuk Pesanan, Chart, dan Notifikasi */}
          <div className="grid grid-cols-3 gap-4">
            {/* Bagian Pesanan */}
            <div className="col-span-3 grid grid-cols-3 gap-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-[#F9A825]/75 rounded-lg shadow p-4">
                  {/* Gambar dalam frame putih rounded */}
                  <div className="bg-white p-3 rounded-xl flex justify-center mx-auto w-28 h-28">
                    <img
                      src={order.image}
                      alt={order.name}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>

                  {/* Detail Produk */}
                  <div className="mt-4 text-center">
                    <h2 className="text-sm font-semibold text-gray-800">{order.name}</h2>
                    <p className="text-sm font-bold">{order.quantity}</p>
                    <p className="text-sm text-gray-800">{order.productType}</p>
                    <p className="text-xs text-gray-700 mt-2">{order.date}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bagian Grafik Penjualan */}
            <div className="col-span-2 bg-white p-4 shadow rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Penjualan Teratas</h2>
              <img
                src="https://via.placeholder.com/400x200"
                alt="Chart"
                className="w-full h-auto max-h-40 object-contain"
              />
            </div>

            {/* Bagian Notifikasi */}
            <div className="col-span-1 flex flex-col items-center bg-white p-4 shadow rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Notifikasi</h2>
              <div className="flex space-x-4">
                <div className="p-4 bg-green-600 text-white rounded-full">📦</div>
                <div className="p-4 bg-green-600 text-white rounded-full">📜</div>
                <div className="p-4 bg-green-600 text-white rounded-full">💰</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
