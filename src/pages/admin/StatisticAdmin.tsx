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
  { name: "Produk D", terjual: 120 },
];

const dataTren = [
  { bulan: "Jan", total: 4000 },
  { bulan: "Feb", total: 3000 },
  { bulan: "Mar", total: 5000 },
  { bulan: "Apr", total: 2500 },
  { bulan: "Mei", total: 4200 },
];

const dummyCustomer = [
  { nama: "Ahmad", totalTransaksi: 12, terakhir: "14 April 2025" },
  { nama: "Budi", totalTransaksi: 8, terakhir: "10 April 2025" },
  { nama: "Citra", totalTransaksi: 15, terakhir: "12 April 2025" },
];

const dummyStok = [
  { nama: "Kertas HVS", stok: "1500 lembar", keterangan: "Aman" },
  { nama: "Kertas Art Carton", stok: "800 lembar", keterangan: "Menipis" },
  { nama: "Tinta Hitam", stok: "20 botol", keterangan: "Aman" },
];

const dummyTransaksi = [
  {
    id: "#TRX001",
    nama: "Isham",
    total: "Rp 250.000",
    tanggal: "15 April 2025",
  },
  {
    id: "#TRX002",
    nama: "Aulia",
    total: "Rp 300.000",
    tanggal: "16 April 2025",
  },
  {
    id: "#TRX003",
    nama: "Rizki",
    total: "Rp 150.000",
    tanggal: "17 April 2025",
  },
];

interface TableProps {
  headers: string[];
  data: Record<string, string | number>[];
}

const Table: React.FC<TableProps> = ({ headers, data }) => (
  <div className="overflow-x-auto rounded-2xl shadow">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-green-700 text-white">
        <tr>
          {headers.map((head: string) => (
            <th
              key={head}
              className="px-5 py-3 text-left text-sm font-semibold uppercase tracking-wider"
            >
              {head}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((row, i: number) => (
          <tr
            key={i}
            className="hover:bg-green-50 transition-colors duration-200"
          >
            {Object.values(row).map((cell: string | number, idx: number) => (
              <td key={idx} className="px-5 py-4 text-sm text-gray-700">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const StatisticAdminPage: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <SidebarAdmin />
      <div className="flex-1 w-full lg:ml-64">
        <NavbarAdmin />

        <div className="p-4 lg:p-6 space-y-10 mt-18 lg:mt-24">
          <h1 className="text-2xl font-bold text-center lg:text-left text-green-700 flex items-center gap-3 mb-8">
            <Icon icon="mdi:chart-box" className="text-green-700 w-9 h-9" />{" "}
            LAPORAN & STATISTIK
          </h1>

          {/* Laporan Penjualan */}
          <section className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-green-700">
              LAPORAN PENJUALAN
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
                <h3 className="text-center font-semibold mb-3 text-green-700">
                  Grafik Produk Terlaris
                </h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={dataProduk}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="terjual" fill="#facc15" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
                <h3 className="text-center font-semibold mb-3 text-green-700">
                  Grafik Tren Penjualan
                </h3>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={dataTren}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="bulan" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke="#15803d"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <p className="mt-8 font-semibold text-center sm:text-left text-lg text-green-700">
              TOTAL PENDAPATAN:{" "}
              <span className="text-yellow-500">RP 25.000.000</span>
            </p>
          </section>

          {/* Laporan Customer */}
          <section className="bg-white rounded-2xl shadow-md p-6 space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-green-700">
              LAPORAN CUSTOMER
            </h2>
            <Table
              headers={[
                "Nama Customer",
                "Total Transaksi",
                "Terakhir Transaksi",
              ]}
              data={dummyCustomer.map((c) => ({
                "Nama Customer": c.nama,
                "Total Transaksi": c.totalTransaksi,
                "Terakhir Transaksi": c.terakhir,
              }))}
            />
          </section>

          {/* Laporan Stok Bahan */}
          <section className="bg-white rounded-2xl shadow-md p-6 space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-green-700">
              LAPORAN STOK BAHAN
            </h2>
            <Table
              headers={["Nama Bahan", "Stok Tersedia", "Keterangan"]}
              data={dummyStok.map((s) => ({
                "Nama Bahan": s.nama,
                "Stok Tersedia": s.stok,
                Keterangan: s.keterangan,
              }))}
            />
          </section>

          {/* Laporan Transaksi */}
          <section className="bg-white rounded-2xl shadow-md p-6 space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-green-700">
              LAPORAN TRANSAKSI
            </h2>
            <Table
              headers={["ID", "Nama", "Total", "Tanggal"]}
              data={dummyTransaksi.map((t) => ({
                ID: t.id,
                Nama: t.nama,
                Total: t.total,
                Tanggal: t.tanggal,
              }))}
            />
          </section>

          {/* Tombol Unduh */}
          <div className="flex flex-wrap justify-center sm:justify-end gap-4 pt-8">
            <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow cursor-pointer">
              <Icon icon="mdi:file-pdf-box" className="text-xl" /> Unduh PDF
            </button>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow cursor-pointer">
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
