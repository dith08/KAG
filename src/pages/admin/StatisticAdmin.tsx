import React from "react";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import { Icon } from "@iconify/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

const dataProduk = [
  { name: "Produk A", terjual: 240 },
  { name: "Produk B", terjual: 456 },
  { name: "Produk C", terjual: 300 },
];

const dataTren = [
  { bulan: "Jan", total: 4000 },
  { bulan: "Feb", total: 3000 },
  { bulan: "Mar", total: 5000 },
  { bulan: "Apr", total: 2500 },
];

const StatisticAdminPage: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <SidebarAdmin />
      <div className="flex-1 w-full lg:ml-64">
        <NavbarAdmin />

        <div className="p-4 lg:p-6 space-y-8 mt-18 lg:mt-24">
          <h1 className="text-xl md:text-2xl font-bold text-center lg:text-left text-green-700 flex items-center gap-2 mb-6">
            <Icon icon="mdi:chart-box" className="text-green-700 w-8 h-8" /> LAPORAN & STATISTIK
          </h1>

          {/* Laporan Penjualan */}
          <section className="bg-white rounded-2xl shadow p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-yellow-500">
              LAPORAN PENJUALAN
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-gray-100 p-4 rounded-xl">
                <h3 className="text-center font-semibold mb-2 text-green-700">
                  Grafik Produk Terlaris
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={dataProduk}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="terjual" fill="#facc15" /> {/* yellow-500 */}
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-gray-100 p-4 rounded-xl">
                <h3 className="text-center font-semibold mb-2 text-green-700">
                  Grafik Tren Penjualan
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={dataTren}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="bulan" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke="#15803d" // green-700
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <p className="mt-6 font-semibold text-center sm:text-left text-lg text-green-700">
              TOTAL PENDAPATAN:{" "}
              <span className="text-yellow-500">RP 25.000.000</span>
            </p>
          </section>

          {/* Laporan Customer */}
          <section className="bg-white rounded-2xl shadow p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-yellow-500">
              LAPORAN CUSTOMER
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border rounded-xl overflow-hidden">
                <thead className="bg-yellow-500 text-white">
                  <tr>
                    <th className="p-3">Nama Customer</th>
                    <th className="p-3">Total Transaksi</th>
                    <th className="p-3">Terakhir Transaksi</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-t">
                    <td className="p-3">Ahmad</td>
                    <td className="p-3">12</td>
                    <td className="p-3">14 April 2025</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Laporan Stok Bahan */}
          <section className="bg-white rounded-2xl shadow p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-yellow-500">
              LAPORAN STOK BAHAN
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border rounded-xl overflow-hidden">
                <thead className="bg-yellow-500 text-white">
                  <tr>
                    <th className="p-3">Nama Bahan</th>
                    <th className="p-3">Stok Tersedia</th>
                    <th className="p-3">Keterangan</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-t">
                    <td className="p-3">Kertas HVS</td>
                    <td className="p-3">1500 lembar</td>
                    <td className="p-3">Aman</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Laporan Transaksi */}
          <section className="bg-white rounded-2xl shadow p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-yellow-500">
              LAPORAN TRANSAKSI
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border rounded-xl overflow-hidden">
                <thead className="bg-yellow-500 text-white">
                  <tr>
                    <th className="p-3">ID</th>
                    <th className="p-3">Nama</th>
                    <th className="p-3">Total</th>
                    <th className="p-3">Tanggal</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-t">
                    <td className="p-3">#TRX001</td>
                    <td className="p-3">Isham</td>
                    <td className="p-3">Rp 250.000</td>
                    <td className="p-3">15 April 2025</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Tombol Unduh */}
          <div className="flex flex-wrap justify-center sm:justify-end gap-4 pt-6">
            <button className="bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow">
              <Icon icon="mdi:file-pdf-box" className="text-xl" /> Unduh PDF
            </button>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow">
              <Icon icon="mdi:microsoft-excel" className="text-xl" /> Unduh
              Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticAdminPage;
