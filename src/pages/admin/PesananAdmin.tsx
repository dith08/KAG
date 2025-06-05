import React, { useState } from "react";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import { Icon } from "@iconify/react";
import { ModernTable } from "../../components/admin/ModernTable";

// Dummy Data Pesanan (Tanggal diperbarui ke Juni 2025)
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

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Menunggu Konfirmasi":
        return "bg-red-100 text-red-800";
      case "Sedang Diproses":
        return "bg-yellow-100 text-yellow-800";
      case "Dikirim":
        return "bg-blue-100 text-blue-800";
      case "Selesai":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyles(
        status
      )}`}
    >
      {status}
    </span>
  );
};

const PesananAdminPage: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState("Semua");

  // Hitung ringkasan pesanan
  const totalPesanan = dummyPesanan.length;
  const menungguKonfirmasi = dummyPesanan.filter(
    (p) => p.status === "Menunggu Konfirmasi"
  ).length;
  const sedangDiproses = dummyPesanan.filter(
    (p) => p.status === "Sedang Diproses"
  ).length;
  const dikirim = dummyPesanan.filter((p) => p.status === "Dikirim").length;
  const selesai = dummyPesanan.filter((p) => p.status === "Selesai").length;

  // Filter pesanan berdasarkan status
  const filteredPesanan =
    statusFilter === "Semua"
      ? dummyPesanan
      : dummyPesanan.filter((p) => p.status === statusFilter);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <SidebarAdmin />
      <div className="flex-1 w-full lg:ml-64">
        <NavbarAdmin />
        <div className="p-4 lg:p-6 space-y-6 mt-20 lg:mt-24">
          <h1 className="text-xl md:text-2xl font-bold text-center lg:text-left text-green-700 flex items-center gap-2 mb-6">
            <Icon icon="mdi:money" className="w-8 h-8" />
            KELOLA PESANAN
          </h1>

          {/* Ringkasan Card */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
            {[
              {
                icon: "mdi:cart",
                label: "Total Pesanan",
                count: totalPesanan,
                color: "text-black",
              },
              {
                icon: "mdi:clock-outline",
                label: "Menunggu Konfirmasi",
                count: menungguKonfirmasi,
                color: "text-red-600",
              },
              {
                icon: "mdi:cogs",
                label: "Sedang Diproses",
                count: sedangDiproses,
                color: "text-yellow-500",
              },
              {
                icon: "mdi:truck-delivery",
                label: "Dikirim",
                count: dikirim,
                color: "text-blue-500",
              },
              {
                icon: "mdi:check-circle",
                label: "Selesai",
                count: selesai,
                color: "text-green-600",
              },
            ].map(({ icon, label, count, color }) => (
              <div
                key={label}
                className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-start justify-between h-full"
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
          {/* Daftar Pesanan dengan Filter di Sebelah Kanan */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6">
            <h2 className="text-xl font-bold text-green-700 flex items-center gap-2">
              <Icon icon="mdi:view-list" className="w-6 h-6" />
              Daftar Pesanan
            </h2>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full lg:w-56 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-green-700"
            >
              <option value="Semua">Semua Pesanan</option>
              <option value="Menunggu Konfirmasi">Menunggu Konfirmasi</option>
              <option value="Sedang Diproses">Sedang Diproses</option>
              <option value="Dikirim">Dikirim</option>
              <option value="Selesai">Selesai</option>
            </select>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
            <ModernTable
              headers={[
                "ID Pesanan",
                "Nama Customer",
                "Tanggal",
                "Total",
                "Status",
                "Aksi",
              ]}
              data={filteredPesanan.map((p) => ({
                id: p.id,
                "Nama Customer": p.nama,
                Tanggal: p.tanggal,
                Total: p.total,
                Status: <StatusBadge status={p.status} />,
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

export default PesananAdminPage;
