import React, { useState } from "react";
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
  Legend,
} from "recharts";
import { Icon } from "@iconify/react";
import { ModernTable } from "../../components/admin/ModernTable";

// Dummy Data Pesanan dari PesananAdminPage
const dummyPesanan = [
  {
    id: "#ORD001",
    nama: "Ahmad",
    tanggal: "01 Juni 2025",
    total: "Rp 250.000",
    status: "Menunggu Konfirmasi",
  },
  {
    id: "#ORD002",
    nama: "Budi",
    tanggal: "02 Juni 2025",
    total: "Rp 300.000",
    status: "Sedang Diproses",
  },
  {
    id: "#ORD003",
    nama: "Citra",
    tanggal: "03 Juni 2025",
    total: "Rp 150.000",
    status: "Dikirim",
  },
  {
    id: "#ORD004",
    nama: "Dewi",
    tanggal: "04 Juni 2025",
    total: "Rp 400.000",
    status: "Selesai",
  },
  {
    id: "#ORD005",
    nama: "Eko",
    tanggal: "05 Juni 2025",
    total: "Rp 200.000",
    status: "Menunggu Konfirmasi",
  },
];

const DashboardAdminPage: React.FC = () => {
  const notifications = [
    {
      icon: "mdi:package-down",
      label: "Order Baru",
      count: 3,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
    },
    {
      icon: "mdi:cash-usd",
      label: "Pembayaran Masuk",
      count: 1,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: "mdi:alert",
      label: "Stok Habis",
      count: 2,
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
  ];

  // Ambil 3 pesanan terbaru dari dummyPesanan
  const recentOrders = dummyPesanan.slice(0, 3).map((order) => ({
    id: order.id,
    name: order.nama,
    product: order.id === "#ORD001" ? "Paper Bag" : order.id === "#ORD002" ? "Kertas Kado" : "Box Packaging",
    quantity: order.id === "#ORD001" ? "500pcs" : order.id === "#ORD002" ? "300pcs" : "100pcs",
    status: order.status === "Menunggu Konfirmasi" ? "Belum Dikirim" : order.status === "Sedang Diproses" ? "Proses" : "Terkirim",
  }));

  const [filter, setFilter] = useState<"bulanan" | "tahunan">("bulanan");
  const [showSalesDetail, setShowSalesDetail] = useState(false);

  const salesDataBulanan = [
    { date: "Feb", total: 12000000 },
    { date: "Mar", total: 9500000 },
    { date: "Apr", total: 13500000 },
    { date: "Mei", total: 11000000 },
    { date: "Jun", total: 15000000 },
  ];

  const salesDataTahunan = [
    { date: "2021", total: 50000000 },
    { date: "2022", total: 75000000 },
    { date: "2023", total: 90000000 },
    { date: "2024", total: 110000000 },
    { date: "2025", total: 130000000 },
  ];

  const salesData = filter === "bulanan" ? salesDataBulanan : salesDataTahunan;

  // Total pesanan diambil dari dummyPesanan
  const totalPesanan = dummyPesanan.length;

  // Format angka ke Rp
  const formatRupiah = (value: number) => `Rp ${value.toLocaleString("id-ID")}`;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <SidebarAdmin />
      <div className="flex-1 w-full lg:ml-64">
        <NavbarAdmin />
        <div className="p-4 lg:p-6 space-y-6 mt-20 lg:mt-24">
          <h1 className="text-2xl lg:text-3xl font-bold text-green-700 flex items-center gap-3 mb-6">
            <Icon icon="mdi:home" className="w-8 h-8" />
            DASHBOARD ADMIN
          </h1>

          {/* Statistik Utama */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
            {[
              {
                icon: "mdi:cart",
                label: "Total Pesanan",
                count: totalPesanan,
                color: "text-gray-800",
              },
              {
                icon: "mdi:cash",
                label: "Total Pendapatan",
                count: "15.000.000",
                color: "text-green-600",
              },
              {
                icon: "mdi:account",
                label: "Total Pelanggan",
                count: "50",
                color: "text-blue-600",
              },
              {
                icon: "mdi:package-variant",
                label: "Produk Terlaris",
                count: "Paper Bag",
                color: "text-yellow-600",
              },
            ].map(({ icon, label, count, color }) => (
              <div
                key={label}
                className="bg-white bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-4 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-start justify-between h-full"
              >
                <div className="flex items-center justify-between w-full">
                  <Icon icon={icon} className={`text-2xl ${color}`} />
                </div>
                <div className="mt-4 space-y-1">
                  <p className="text-sm font-medium text-gray-500">{label}</p>
                  <h4 className={`text-2xl font-bold ${color}`}>{count}</h4>
                </div>
              </div>
            ))}
          </div>

          {/* Grafik Penjualan */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5">
              <h2 className="text-xl font-semibold text-gray-800">Grafik Penjualan</h2>
              <div className="flex space-x-2 mt-3 sm:mt-0">
                <button
                  onClick={() => setFilter("bulanan")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === "bulanan"
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Bulanan
                </button>
                <button
                  onClick={() => setFilter("tahunan")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === "tahunan"
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Tahunan
                </button>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={salesData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    interval="preserveStartEnd"
                    height={60}
                    angle={-30}
                    textAnchor="end"
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `Rp ${value / 1000000}jt`}
                    width={80}
                  />
                  <Tooltip
                    formatter={(value) => formatRupiah(value as number)}
                    labelStyle={{ fontSize: 12 }}
                    itemStyle={{ fontSize: 12 }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#F9A825"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-600 text-center mt-2">
              Data {filter === "bulanan" ? "Feb-Jun 2025" : "2021-2025"}
            </p>
            <button
              onClick={() => setShowSalesDetail(!showSalesDetail)}
              className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm"
            >
              {showSalesDetail ? "Sembunyikan" : "Lihat"} Detail
            </button>
            {showSalesDetail && (
              <div className="mt-4">
                <ModernTable
                  headers={["Periode", "Total"]}
                  data={salesData.map((d) => ({
                    Periode: d.date,
                    Total: formatRupiah(d.total),
                  }))}
                />
              </div>
            )}
          </div>

          {/* Notifikasi */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Notifikasi</h2>
            <div className="space-y-3">
              {notifications.map((notif, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-lg ${notif.bgColor} border border-gray-200 hover:shadow-md transition-all duration-200`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${notif.bgColor}`}>
                      <Icon icon={notif.icon} className={`w-6 h-6 ${notif.color}`} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{notif.label}</p>
                      <p className="text-xs text-gray-500">Terdapat {notif.count} notifikasi baru</p>
                    </div>
                  </div>
                  <button className="text-sm text-gray-600 hover:text-gray-800 font-medium flex items-center gap-1">
                    Lihat <Icon icon="mdi:chevron-right" className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Pesanan Terbaru */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Pesanan Terbaru</h2>
            <ModernTable
              headers={["ID", "Customer", "Produk", "Jumlah", "Status", "Aksi"]}
              data={recentOrders.map((order) => ({
                id: order.id,
                Customer: order.name,
                Produk: order.product,
                Jumlah: order.quantity,
                Status: order.status,
                Aksi: null,
              }))}
              detailRoute="/admin/pesanan"
              keyField="id"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdminPage;
