import React from "react";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";

const StatistikPage: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:ml-64 mt-24 p-4">
      <SidebarAdmin />
      <div className="flex-1 w-full">
        <NavbarAdmin />

        <div className="p-4 space-y-10">
          <h1 className="text-2xl font-bold text-center lg:text-left">Laporan & Statistik</h1>

          {/* Laporan Penjualan */}
          <section className="bg-white rounded-lg shadow p-4 md:p-6">
            <h2 className="text-xl font-semibold mb-4 text-orange-600">Laporan Penjualan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-100 p-4 rounded text-center">📊 Grafik Produk Terlaris</div>
              <div className="bg-gray-100 p-4 rounded text-center">📈 Grafik Tren Penjualan</div>
            </div>
            <p className="mt-4 font-semibold text-center sm:text-left">
              Total Pendapatan: <span className="text-green-700">Rp 25.000.000</span>
            </p>
          </section>

          {/* Laporan Customer */}
          <section className="bg-white rounded-lg shadow p-4 md:p-6">
            <h2 className="text-xl font-semibold mb-4 text-orange-600">Laporan Customer</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border">
                <thead className="bg-orange-300 text-white">
                  <tr>
                    <th className="p-2">Nama Customer</th>
                    <th className="p-2">Total Transaksi</th>
                    <th className="p-2">Terakhir Transaksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-2">Ahmad</td>
                    <td className="p-2">12</td>
                    <td className="p-2">14 April 2025</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Laporan Stok Bahan */}
          <section className="bg-white rounded-lg shadow p-4 md:p-6">
            <h2 className="text-xl font-semibold mb-4 text-orange-600">Laporan Stok Bahan</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border">
                <thead className="bg-orange-300 text-white">
                  <tr>
                    <th className="p-2">Nama Bahan</th>
                    <th className="p-2">Stok Tersedia</th>
                    <th className="p-2">Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-2">Kertas HVS</td>
                    <td className="p-2">1500 lembar</td>
                    <td className="p-2">Aman</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Laporan Transaksi */}
          <section className="bg-white rounded-lg shadow p-4 md:p-6">
            <h2 className="text-xl font-semibold mb-4 text-orange-600">Laporan Transaksi</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border">
                <thead className="bg-orange-300 text-white">
                  <tr>
                    <th className="p-2">ID</th>
                    <th className="p-2">Nama</th>
                    <th className="p-2">Total</th>
                    <th className="p-2">Tanggal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-2">#TRX001</td>
                    <td className="p-2">Isham</td>
                    <td className="p-2">Rp 250.000</td>
                    <td className="p-2">15 April 2025</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Tombol Unduh */}
          <div className="flex flex-wrap justify-center sm:justify-end gap-4">
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center gap-2">
              <FaFilePdf /> Unduh PDF
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2">
              <FaFileExcel /> Unduh Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatistikPage;
