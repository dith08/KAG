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
import { Icon } from "@iconify/react";

const DashboardAdminPage: React.FC = () => {
  const notifications = [
    {
      icon: <Icon icon="mdi:package-down" className="text-yellow-500" />,
      label: "Order Baru",
      count: 3,
    },
    {
      icon: <Icon icon="mdi:cash-usd" className="text-green-700" />,
      label: "Pembayaran Masuk",
      count: 1,
    },
    {
      icon: <Icon icon="mdi:alert" className="text-red-500" />,
      label: "Stok Habis",
      count: 2,
    },
  ];

  const recentOrders = [
    {
      id: 1,
      name: "Isham",
      product: "Paper Bag",
      quantity: "500pcs",
      status: "Proses",
    },
    {
      id: 2,
      name: "Amir",
      product: "Kertas Kado",
      quantity: "300pcs",
      status: "Terkirim",
    },
    {
      id: 3,
      name: "Siti",
      product: "Box Packaging",
      quantity: "100pcs",
      status: "Belum Dikirim",
    },
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
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <SidebarAdmin />
      <div className="flex-1 w-full lg:ml-64">
        <NavbarAdmin />
        <div className="p-4 lg:p-6 space-y-8 mt-18 lg:mt-24">
          <h1 className="text-xl md:text-2xl font-bold text-center lg:text-left text-green-700 flex items-center gap-2 mb-6">
            <Icon icon="mdi:home" className="text-green-700 w-8 h-8" />
            DASHBOARD ADMIN
          </h1>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Kiri (Main) */}
            <div className="w-full lg:w-7/10 space-y-8">
              {/* Grafik Penjualan */}
              <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-4">Grafik Penjualan</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis
                        tickFormatter={(value) => `Rp ${value / 1000000}jt`}
                      />
                      <Tooltip
                        formatter={(value) => `Rp ${value.toLocaleString()}`}
                      />
                      <Line
                        type="monotone"
                        dataKey="total"
                        stroke="#F9A825"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Total Pendapatan (Mobile) */}
              <div className="lg:hidden bg-white p-6 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-1">
                  Total Pendapatan Bulan Ini
                </h2>
                <p className="text-2xl font-bold text-gray-800">
                  Rp 12.000.000{" "}
                  <span className="text-green-500 text-sm ml-2">🔺 +10%</span>
                </p>
              </div>

              {/* Notifikasi (Mobile) */}
              <div className="lg:hidden bg-white p-6 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-4">Notifikasi</h2>
                <ul className="space-y-3">
                  {notifications.map((notif, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2 text-gray-700">
                        <span className="text-xl">{notif.icon}</span>
                        <span>{notif.label}</span>
                      </div>
                      <span className="font-bold bg-gray-200 px-2 py-0.5 rounded-md text-sm">
                        {notif.count}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tabel Pesanan Terbaru */}
              <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-4">Pesanan Terbaru</h2>
                <div className="overflow-x-auto rounded-2xl shadow">
                  <table className="w-full divide-y divide-gray-200">
                    <thead className="bg-green-700 text-white">
                      <tr>
                        <th className="py-2 px-5 text-left text-sm font-semibold uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-5 text-left text-sm font-semibold uppercase tracking-wider">
                          Produk
                        </th>
                        <th className="px-5 text-left text-sm font-semibold uppercase tracking-wider">
                          Jumlah
                        </th>
                        <th className="px-5 text-left text-sm font-semibold uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentOrders.map((order) => (
                        <tr
                          key={order.id}
                          className="hover:bg-green-50 transition-colors duration-200 text-sm"
                        >
                          <td className="py-2 px-5 text-gray-700">
                            {order.name}
                          </td>
                          <td className="px-5 text-gray-700">
                            {order.product}
                          </td>
                          <td className="px-5 text-gray-700">
                            {order.quantity}
                          </td>
                          <td className="px-5 text-gray-700">{order.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Kanan (Sidebar) - Desktop Only */}
            <div className="hidden lg:block w-full lg:w-3/10 space-y-8">
              {/* Notifikasi */}
              <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-4">Notifikasi</h2>
                <ul className="space-y-3">
                  {notifications.map((notif, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2 text-gray-700">
                        <span className="text-xl">{notif.icon}</span>
                        <span>{notif.label}</span>
                      </div>
                      <span className="font-bold bg-gray-200 px-2 py-0.5 rounded-md text-sm">
                        {notif.count}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Total Pendapatan */}
              <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-1">
                  Total Pendapatan Bulan Ini
                </h2>
                <p className="text-2xl font-bold text-gray-800">
                  Rp 12.000.000{" "}
                  <span className="text-green-500 text-sm ml-2">🔺 +10%</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdminPage;
