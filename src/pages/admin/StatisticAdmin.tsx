declare module "jspdf" {
  interface jsPDF {
    lastAutoTable?: { finalY: number };
  }
}

import React, { useState } from "react";
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
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { Card } from "../../components/admin/Card";
import { ModernTable } from "../../components/admin/ModernTable";
import { Tabs } from "../../components/admin/Tabs";

// Fungsi format angka ke format singkat (jt, rb)
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1).replace(".0", "")}jt`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1).replace(".0", "")}rb`;
  }
  return num.toString();
};

// Data
const dataProdukBulanan = [
  { name: "Produk A", terjual: 240 },
  { name: "Produk B", terjual: 456 },
  { name: "Produk C", terjual: 300 },
  { name: "Produk D", terjual: 120 },
];

const dataProdukTahunan = [
  { name: "Produk A", terjual: 2880 },
  { name: "Produk B", terjual: 5472 },
  { name: "Produk C", terjual: 3600 },
  { name: "Produk D", terjual: 1440 },
];

const dataBulanan = [
  { bulan: "Jan", total: 4000000 },
  { bulan: "Feb", total: 3000000 },
  { bulan: "Mar", total: 5000000 },
  { bulan: "Apr", total: 2000000 },
  { bulan: "Mei", total: 25000000 },
];

const dataTahunan = [
  { tahun: "2023", total: 18000000 },
  { tahun: "2024", total: 22000000 },
  { tahun: "2025", total: 25000000 },
];

const dummyTransaksi = [
  {
    id: "#TRX001",
    nama: "Isham",
    tanggal: "15 April 2025",
    total: "Rp 250.000",
    produk: "Produk A",
    status: "Selesai",
  },
  {
    id: "#TRX002",
    nama: "Aulia",
    tanggal: "16 April 2025",
    total: "Rp 300.000",
    produk: "Produk B",
    status: "Menunggu",
  },
  {
    id: "#TRX003",
    nama: "Rizki",
    tanggal: "17 April 2025",
    total: "Rp 150.000",
    produk: "Produk C",
    status: "Selesai",
  },
];

const dummyStok = [
  { nama: "Kertas HVS", stok: "1500 lembar", keterangan: "Aman" },
  { nama: "Kertas Art Carton", stok: "800 lembar", keterangan: "Menipis" },
  { nama: "Tinta Hitam", stok: "20 botol", keterangan: "Aman" },
];

const dummyHistoriStok = [
  {
    nama: "Kertas HVS",
    tanggal: "15 Mei 2025",
    aktivitas: "Penambahan",
    jumlah: "+500 lembar",
  },
  {
    nama: "Kertas Art Carton",
    tanggal: "14 Mei 2025",
    aktivitas: "Penggunaan",
    jumlah: "-200 lembar",
  },
  {
    nama: "Tinta Hitam",
    tanggal: "13 Mei 2025",
    aktivitas: "Penambahan",
    jumlah: "+10 botol",
  },
];

// Hitung total pendapatan dari entri terakhir dataBulanan
const pendapatanBulanIni = dataBulanan[dataBulanan.length - 1].total;
const pendapatanBulanLalu = dataBulanan[dataBulanan.length - 2].total;
const kenaikanPersen =
  ((pendapatanBulanIni - pendapatanBulanLalu) / pendapatanBulanLalu) * 100;

const StatisticAdminPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [produkFilter, setProdukFilter] = useState<"bulanan" | "tahunan">(
    "bulanan"
  );
  const [trenFilter, setTrenFilter] = useState<"bulanan" | "tahunan">(
    "bulanan"
  );
  const [activeTab, setActiveTab] = useState("stok");
  const [showProdukDetail, setShowProdukDetail] = useState(false);
  const [showTrenDetail, setShowTrenDetail] = useState(false);
  const [stokSearch, setStokSearch] = useState("");

  const dataProduk =
    produkFilter === "bulanan" ? dataProdukBulanan : dataProdukTahunan;
  const dataTren = trenFilter === "bulanan" ? dataBulanan : dataTahunan;

  const filteredTransaksi = dummyTransaksi.filter((t) => {
    const matchesSearch =
      t.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = dateFilter ? t.tanggal.includes(dateFilter) : true;
    return matchesSearch && matchesDate;
  });

  const filteredStok = dummyStok.filter((s) =>
    s.nama.toLowerCase().includes(stokSearch.toLowerCase())
  );

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    let y = 20;

    doc.text("Laporan Produk", 14, y);
    autoTable(doc, {
      startY: y + 10,
      head: [["Nama Produk", "Terjual"]],
      body: dataProduk.map((p) => [p.name, p.terjual.toString()]),
      headStyles: { fillColor: [21, 128, 61] },
    });
    y = doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 10 : y + 30;

    doc.text("Laporan Tren", 14, y);
    autoTable(doc, {
      startY: y + 10,
      head: [["Periode", "Total"]],
      body: dataTren.map((t) => [
        "bulan" in t ? t.bulan : t.tahun,
        `Rp ${formatNumber(t.total)}`,
      ]),
      headStyles: { fillColor: [21, 128, 61] },
    });
    y = doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 10 : y + 30;

    doc.text("Laporan Stok", 14, y);
    autoTable(doc, {
      startY: y + 10,
      head: [["Nama Bahan", "Stok", "Keterangan"]],
      body: dummyStok.map((s) => [s.nama, s.stok, s.keterangan]),
      headStyles: { fillColor: [21, 128, 61] },
    });
    y = doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 10 : y + 30;

    doc.text("Histori Stok", 14, y);
    autoTable(doc, {
      startY: y + 10,
      head: [["Nama Bahan", "Tanggal", "Aktivitas", "Jumlah"]],
      body: dummyHistoriStok.map((h) => [
        h.nama,
        h.tanggal,
        h.aktivitas,
        h.jumlah,
      ]),
      headStyles: { fillColor: [21, 128, 61] },
    });
    y = doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 10 : y + 30;

    doc.text("Laporan Transaksi", 14, y);
    autoTable(doc, {
      startY: y + 10,
      head: [["ID", "Nama", "Tanggal", "Total", "Produk", "Status"]],
      body: dummyTransaksi.map((t) => [
        t.id,
        t.nama,
        t.tanggal,
        t.total,
        t.produk,
        t.status,
      ]),
      headStyles: { fillColor: [21, 128, 61] },
    });

    doc.save("Laporan_Statistik.pdf");
  };

  const handleDownloadExcel = async () => {
    const workbook = new ExcelJS.Workbook();

    const sheets = [
      { data: dataProduk, name: "Produk Terlaris" },
      { data: dataTren, name: "Tren Penjualan" },
      { data: dummyStok, name: "Stok Bahan" },
      { data: dummyHistoriStok, name: "Histori Stok" },
      { data: dummyTransaksi, name: "Data Transaksi" },
    ];

    sheets.forEach(({ data, name }) => {
      const worksheet = workbook.addWorksheet(name);
      const headers = Object.keys(data[0]);
      worksheet.addRow(headers);

      data.forEach((item) => {
        const row = Object.values(item).map((val) =>
          typeof val === "number" ? formatNumber(val) : val
        );
        worksheet.addRow(row);
      });

      const headerRow = worksheet.getRow(1);
      headerRow.eachCell((cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "15803D" },
        };
        cell.font = { color: { argb: "FFFFFFFF" }, bold: true };
        cell.alignment = { horizontal: "center" };
      });

      worksheet.columns.forEach((column) => {
        let maxLength = 10;
        if (column.eachCell) {
          column.eachCell({ includeEmpty: true }, (cell) => {
            const cellLength = cell.value ? cell.value.toString().length : 0;
            if (cellLength > maxLength) {
              maxLength = cellLength;
            }
          });
        }
        column.width = maxLength + 2;
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "Laporan_Statistik.xlsx");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarAdmin />
      <div className="flex-1 lg:ml-64">
        <NavbarAdmin />
        <div className="p-6 space-y-8 lg:mt-24">
          <div className="flex items-center gap-3">
            <Icon icon="mdi:chart-box" className="w-8 h-8 text-green-700" />
            <h1 className="text-2xl font-bold text-green-700">
              LAPORAN & STATISTIK
            </h1>
          </div>

          {/* Laporan Penjualan */}
          <Card
            title="Laporan Penjualan"
            icon="mdi:chart-areaspline"
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm min-h-[220px]">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-center font-semibold text-green-700">
                    Grafik Produk Terlaris
                  </h3>
                  <select
                    value={produkFilter}
                    onChange={(e) =>
                      setProdukFilter(e.target.value as "bulanan" | "tahunan")
                    }
                    className="text-sm border rounded-md px-2 py-1 text-gray-600 focus:outline-none focus:ring-1 focus:ring-green-700"
                  >
                    <option value="bulanan">Bulanan</option>
                    <option value="tahunan">Tahunan</option>
                  </select>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={dataProduk}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="terjual"
                      fill="#F9A825"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
                <p className="text-sm text-gray-600 text-center mt-2">
                  Data{" "}
                  {produkFilter === "bulanan" ? "Bulan Mei 2025" : "Tahun 2025"}
                </p>
                <button
                  onClick={() => setShowProdukDetail(!showProdukDetail)}
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 mx-auto text-sm"
                >
                  <Icon icon="mdi:eye" />{" "}
                  {showProdukDetail ? "Sembunyikan" : "Lihat"} Detail
                </button>
                {showProdukDetail && (
                  <div className="mt-4">
                    <ModernTable
                      headers={["Nama Produk", "Terjual"]}
                      data={dataProduk.map((p) => ({
                        "Nama Produk": p.name,
                        Terjual: p.terjual,
                      }))}
                    />
                  </div>
                )}
              </div>
              <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm min-h-[220px]">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-green-700">
                    Grafik Tren Penjualan
                  </h3>
                  <select
                    value={trenFilter}
                    onChange={(e) =>
                      setTrenFilter(e.target.value as "bulanan" | "tahunan")
                    }
                    className="text-sm border rounded-md px-2 py-1 text-gray-600 focus:outline-none focus:ring-1 focus:ring-green-700"
                  >
                    <option value="bulanan">Bulanan</option>
                    <option value="tahunan">Tahunan</option>
                  </select>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={dataTren}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey={trenFilter === "bulanan" ? "bulan" : "tahun"}
                    />
                    <YAxis tickFormatter={formatNumber} />
                    <Tooltip
                      formatter={(value: number) => formatNumber(value)}
                    />
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke="#F9A825"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <p className="text-sm text-gray-600 text-center mt-2">
                  Data {trenFilter === "bulanan" ? "Jan-Mei 2025" : "2023-2025"}
                </p>
                <button
                  onClick={() => setShowTrenDetail(!showTrenDetail)}
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 mx-auto text-sm"
                >
                  <Icon icon="mdi:eye" />{" "}
                  {showTrenDetail ? "Sembunyikan" : "Lihat"} Detail
                </button>
                {showTrenDetail && (
                  <div className="mt-4">
                    <ModernTable
                      headers={["Periode", "Total"]}
                      data={dataTren.map((t) => ({
                        Periode: "bulan" in t ? t.bulan : t.tahun,
                        Total: `Rp ${formatNumber(t.total)}`,
                      }))}
                    />
                  </div>
                )}
              </div>
            </div>
            <div
              className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm flex items-center justify-between gap-4"
              title={`Bulan lalu: Rp ${formatNumber(pendapatanBulanLalu)}`}
            >
              <div className="flex items-center gap-3">
                <Icon icon="mdi:cash" className="w-6 h-6 text-green-700" />
                <p className="text-lg font-semibold text-green-700">
                  Total Pendapatan Bulan Ini:{" "}
                  <span className="text-yellow-500">
                    Rp {formatNumber(pendapatanBulanIni)}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Icon
                  icon={kenaikanPersen >= 0 ? "mdi:arrow-up" : "mdi:arrow-down"}
                  className={`w-5 h-5 ${
                    kenaikanPersen >= 0 ? "text-green-700" : "text-red-600"
                  }`}
                />
                <p
                  className={`text-sm font-medium ${
                    kenaikanPersen >= 0 ? "text-green-700" : "text-red-600"
                  }`}
                >
                  {Math.abs(kenaikanPersen).toFixed(1)}%
                </p>
              </div>
            </div>
            <Tabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabs={[
                { id: "stok", label: "Laporan Stok Bahan" },
                { id: "transaksi", label: "Laporan Transaksi" },
              ]}
            />
            {activeTab === "stok" && (
              <div className="mt-4 space-y-4">
                <input
                  type="text"
                  placeholder="Cari nama bahan..."
                  value={stokSearch}
                  onChange={(e) => setStokSearch(e.target.value)}
                  className="w-full sm:w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-green-700"
                />
                <ModernTable
                  headers={[
                    "Nama Bahan",
                    "Stok Tersedia",
                    "Keterangan",
                    "Aksi",
                  ]}
                  data={filteredStok.map((s) => ({
                    "Nama Bahan": s.nama,
                    "Stok Tersedia": s.stok,
                    Keterangan: s.keterangan,
                    Aksi: null, // Tombol akan dirender di dalam ModernTable
                  }))}
                  expandableHistori={dummyHistoriStok}
                />
              </div>
            )}
            {activeTab === "transaksi" && (
              <div className="mt-4 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    placeholder="Cari berdasarkan nama atau ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-green-700"
                  />
                  <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="w-full sm:w-40 px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-green-700"
                  />
                </div>
                <ModernTable
                  headers={[
                    "ID Transaksi",
                    "Nama Customer",
                    "Tanggal",
                    "Total",
                    "Produk",
                    "Status",
                  ]}
                  data={filteredTransaksi.map((t) => ({
                    "ID Transaksi": t.id,
                    "Nama Customer": t.nama,
                    Tanggal: t.tanggal,
                    Total: t.total,
                    Produk: t.produk,
                    Status: t.status,
                  }))}
                />
              </div>
            )}
          </Card>

          {/* Download Buttons */}
          <div className="flex justify-end gap-3">
            <button
              onClick={handleDownloadPDF}
              className="bg-green-700 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow transition-colors duration-200"
            >
              <Icon icon="mdi:file-pdf" className="text-xl" /> Unduh PDF
            </button>
            <button
              onClick={handleDownloadExcel}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow transition-colors duration-200"
            >
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
