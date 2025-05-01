import React from "react";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard: React.FC = () => {
  const notifications = [
    { icon: "📦", label: "Order Baru", count: 3 },
    { icon: "💰", label: "Pembayaran Masuk", count: 1 },
    { icon: "⚠", label: "Stok Habis", count: 2 },
  ];

  const recentOrders = [
    { id: 1, name: "Isham", product: "Paper Bag", quantity: "500pcs", status: "Proses" },
    { id: 2, name: "Amir", product: "Kertas Kado", quantity: "300pcs", status: "Terkirim" },
    { id: 3, name: "Siti", product: "Box Packaging", quantity: "100pcs", status: "Belum Dikirim" },
  ];

  const salesData = [
    { date: "01 Apr", total: 1200000 },
    { date: "02 Apr", total: 800000 },
    { date: "03 Apr", total: 1400000 },
    { date: "04 Apr", total: 1000000 },
    { date: "05 Apr", total: 1600000 },
    { date: "06 Apr", total: 900000 },
    { date: "07 Apr", total: 1300000 },
  ];

  return (
    <div className="flex min-h-screen">
      <SidebarAdmin />
      <div className="flex-1 flex flex-col p-4 md:ml-64">
        <NavbarAdmin />

        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          {/* Kiri (Main) */}
          <div className="w-full lg:w-7/10 space-y-6">
            {/* Total Pendapatan */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-1">Total Pendapatan Bulan Ini</h2>
              <p className="text-2xl font-bold text-gray-800">Rp 12.000.000 <span className="text-green-500 text-sm ml-2">🔺 +10%</span></p>
            </div>

            {/* Grafik Penjualan */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">Grafik Penjualan</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={(value) => `Rp ${value / 1000000}jt`} />
                    <Tooltip formatter={(value) => `Rp ${value.toLocaleString()}`} />
                    <Line type="monotone" dataKey="total" stroke="#F9A825" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Tabel Pesanan Terbaru */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">Pesanan Terbaru</h2>
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="py-2">Customer</th>
                    <th>Produk</th>
                    <th>Jumlah</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-t text-sm">
                      <td className="py-2">{order.name}</td>
                      <td>{order.product}</td>
                      <td>{order.quantity}</td>
                      <td>{order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Kanan (Sidebar) */}
          <div className="w-full lg:w-3/10 space-y-6">
            {/* Notifikasi */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">Notifikasi</h2>
              <ul className="space-y-3">
                {notifications.map((notif, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-700">
                      <span className="text-xl">{notif.icon}</span>
                      <span>{notif.label}</span>
                    </div>
                    <span className="font-bold bg-gray-200 px-2 py-0.5 rounded-md text-sm">{notif.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
 