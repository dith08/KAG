import React from "react";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import NavbarAdmin from "../../components/admin/NavbarAdmin";

const AdminDashboard: React.FC = () => {
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
      name: "Isham",
      quantity: "500pcs",
      productType: "Paper Bag",
      date: "17-07-1945",
    },
    {
      id: 3,
      image: "https://i.pinimg.com/474x/ad/6f/e9/ad6fe9b9c301067ddcc039a56294bd78.jpg",
      name: "Isham",
      quantity: "500pcs",
      productType: "Paper Bag",
      date: "17-07-1945",
    },
    {
      id: 4,
      image: "https://i.pinimg.com/474x/ad/6f/e9/ad6fe9b9c301067ddcc039a56294bd78.jpg",
      name: "Isham",
      quantity: "500pcs",
      productType: "Paper Bag",
      date: "17-07-1945",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <SidebarAdmin />

      <div className="flex-1 p-6 md:ml-64">
        {/* Navbar */}
        <NavbarAdmin />

        {/* Pesanan Title */}
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Pesanan</h1>

          {/* Grid Pesanan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-[#F9A825]/75 rounded-lg shadow p-4">
                <div className="bg-white p-3 rounded-xl flex justify-center mx-auto w-28 h-28">
                  <img
                    src={order.image}
                    alt={order.name}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <div className="mt-4 text-center">
                  <h2 className="text-sm font-semibold text-gray-800">{order.name}</h2>
                  <p className="text-sm font-bold">{order.quantity}</p>
                  <p className="text-sm text-gray-800">{order.productType}</p>
                  <p className="text-xs text-gray-700 mt-2">{order.date}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Statistik */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="flex justify-around bg-white shadow rounded-lg p-4">
              <div className="flex flex-col items-center">
                <div className="bg-yellow-300 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">12</div>
                <p className="mt-2 text-sm font-medium">dalam proses</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-yellow-300 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">12</div>
                <p className="mt-2 text-sm font-medium">belum terkirim</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-yellow-300 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">12</div>
                <p className="mt-2 text-sm font-medium">terkirim</p>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">Penjualan Teratas</h2>
              <img
                src="https://via.placeholder.com/400x200"
                alt="Chart"
                className="w-full h-auto max-h-40 object-contain"
              />
            </div>

            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-2">Notifikasi</h2>
              <div className="flex justify-around mt-4">
                <div className="p-4 bg-green-600 text-white rounded-full text-xl">📦</div>
                <div className="p-4 bg-green-600 text-white rounded-full text-xl">📜</div>
                <div className="p-4 bg-green-600 text-white rounded-full text-xl">💰</div>
              </div>
            </div>
          </div>

          {/* Total Pendapatan */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Total Pendapatan</h2>
            <p className="text-2xl font-bold text-gray-800">Rp. 1.000.000.000.000,00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
