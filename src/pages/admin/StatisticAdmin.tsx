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

const dummyHistoriStok = [
  {
    nama: "Kertas HVS",
    tanggal: "15 April 2025",
    aktivitas: "Penambahan",
    jumlah: "+500 lembar",
  },
  {
    nama: "Kertas Art Carton",
    tanggal: "14 April 2025",
    aktivitas: "Penggunaan",
    jumlah: "-200 lembar",
  },
  {
    nama: "Tinta Hitam",
    tanggal: "13 April 2025",
    aktivitas: "Penambahan",
    jumlah: "+10 botol",
  },
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
  showHistoryButton?: boolean;
  onHistoryClick?: (nama: string) => void;
}

const Table: React.FC<TableProps> = ({
  headers,
  data,
  showHistoryButton,
  onHistoryClick,
}) => (
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
          {showHistoryButton && (
            <th className="px-5 py-3 text-left text-sm font-semibold uppercase tracking-wider">
              Aksi
            </th>
          )}
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
            {showHistoryButton && (
              <td className="px-5 py-4 text-sm">
                <button
                  onClick={() =>
                    onHistoryClick &&
                    onHistoryClick(row["Nama Bahan"] as string)
                  }
                  className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                  <Icon icon="mdi:history" /> Lihat Histori
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const StatisticAdminPage: React.FC = () => {
  const [selectedBahan, setSelectedBahan] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const handleHistoryClick = (nama: string) => {
    setSelectedBahan(selectedBahan === nama ? null : nama);
  };

  const filteredHistory = selectedBahan
    ? dummyHistoriStok.filter((h) => h.nama === selectedBahan)
    : [];

  const filteredTransaksi = dummyTransaksi.filter((t) => {
    const matchesSearch =
      t.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = dateFilter ? t.tanggal.includes(dateFilter) : true;
    return matchesSearch && matchesDate;
  });

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    let y = 20; // posisi Y awal

    // === Produk ===
    doc.text("Laporan Produk", 14, y);
    autoTable(doc, {
      startY: y + 10,
      head: [["Nama Produk", "Terjual"]],
      body: dataProduk.map((p) => [p.name, p.terjual.toString()]),
      headStyles: { fillColor: [21, 128, 61] },
    });
    y = doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 10 : y + 30;

    // === Tren ===
    doc.text("Laporan Tren", 14, y);
    autoTable(doc, {
      startY: y + 10,
      head: [["Bulan", "Total"]],
      body: dataTren.map((t) => [t.bulan, t.total.toString()]),
      headStyles: { fillColor: [21, 128, 61] },
    });
    y = doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 10 : y + 30;

    // === Customer ===
    doc.text("Laporan Customer", 14, y);
    autoTable(doc, {
      startY: y + 10,
      head: [["Nama", "Total Transaksi", "Terakhir Transaksi"]],
      body: dummyCustomer.map((c) => [
        c.nama,
        c.totalTransaksi.toString(),
        c.terakhir,
      ]),
      headStyles: { fillColor: [21, 128, 61] },
    });
    y = doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 10 : y + 30;

    // === Stok ===
    doc.text("Laporan Stok", 14, y);
    autoTable(doc, {
      startY: y + 10,
      head: [["Nama Bahan", "Stok", "Keterangan"]],
      body: dummyStok.map((s) => [s.nama, s.stok, s.keterangan]),
      headStyles: { fillColor: [21, 128, 61] },
    });
    y = doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 10 : y + 30;

    // === Histori Stok ===
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

    // === Transaksi ===
    doc.text("Laporan Transaksi", 14, y);
    autoTable(doc, {
      startY: y + 10,
      head: [["ID", "Nama", "Total", "Tanggal"]],
      body: dummyTransaksi.map((trx) => [
        trx.id,
        trx.nama,
        trx.total,
        trx.tanggal,
      ]),
      headStyles: { fillColor: [21, 128, 61] },
    });

    // Save file
    doc.save("Laporan_Statistik.pdf");
  };

  const handleDownloadExcel = async () => {
    const workbook = new ExcelJS.Workbook();

    const sheets = [
      { data: dataProduk, name: "Produk Terlaris" },
      { data: dataTren, name: "Tren Penjualan" },
      { data: dummyCustomer, name: "Data Customer" },
      { data: dummyStok, name: "Stok Bahan" },
      { data: dummyHistoriStok, name: "Histori Stok" },
      { data: dummyTransaksi, name: "Data Transaksi" },
    ];

    sheets.forEach(({ data, name }) => {
      const worksheet = workbook.addWorksheet(name);

      // Add header row
      const headers = Object.keys(data[0]);
      worksheet.addRow(headers);

      // Add data rows
      data.forEach((item) => {
        worksheet.addRow(Object.values(item));
      });

      // Style header row
      const headerRow = worksheet.getRow(1);
      headerRow.eachCell((cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "15803D" }, // green-700 HEX tanpa '#'
        };
        cell.font = {
          color: { argb: "FFFFFFFF" }, // white
          bold: true,
        };
        cell.alignment = { horizontal: "center" };
      });

      // Auto width
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

    // Export file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "Laporan_Statistik.xlsx");
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <SidebarAdmin />
      <div className="flex-1 w-full lg:ml-64">
        <NavbarAdmin />

        <div className="p-4 lg:p-6 space-y-10 mt-18 lg:mt-24">
          <h1 className="text-2xl font-bold text-center lg:text-left text-green-700 flex items-center gap-3 mb-8">
            <Icon icon="mdi:chart-box" className="w-9 h-9" /> LAPORAN &
            STATISTIK
          </h1>
          {/* Laporan Penjualan */}
          <section className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl flex items-center gap-3 font-semibold mb-6 text-green-700">
              <Icon icon="mdi:chart-areaspline" className="w-6 h-6" /> LAPORAN
              PENJUALAN
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
                    <Bar dataKey="terjual" fill="#F9A825" />
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
                      stroke="#F9A825"
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
            <h2 className="text-xl flex items-center gap-3 font-semibold mb-6 text-green-700">
              <Icon icon="mdi:account" className="w-6 h-6" /> LAPORAN CUSTOMER
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
            <h2 className="text-xl flex items-center gap-3 font-semibold mb-6 text-green-700">
              <Icon icon="mdi:store-check" className="w-6 h-6" /> LAPORAN STOK
              BAHAN
            </h2>
            <Table
              headers={["Nama Bahan", "Stok Tersedia", "Keterangan"]}
              data={dummyStok.map((s) => ({
                "Nama Bahan": s.nama,
                "Stok Tersedia": s.stok,
                Keterangan: s.keterangan,
              }))}
              showHistoryButton={true}
              onHistoryClick={handleHistoryClick}
            />
            {selectedBahan && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-4 text-green-700">
                  Histori Penggunaan: {selectedBahan}
                </h3>
                <Table
                  headers={["Tanggal", "Aktivitas", "Jumlah"]}
                  data={filteredHistory.map((h) => ({
                    Tanggal: h.tanggal,
                    Aktivitas: h.aktivitas,
                    Jumlah: h.jumlah,
                  }))}
                />
              </div>
            )}
          </section>
          {/* Laporan Transaksi */}
          <section className="bg-white rounded-2xl shadow-md p-6 space-y-4">
            <h2 className="text-xl flex items-center gap-3 font-semibold mb-6 text-green-700">
              <Icon icon="mdi:wallet" className="w-6 h-6" /> LAPORAN TRANSAKSI
            </h2>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <input
                type="text"
                placeholder="Cari berdasarkan nama atau ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-auto px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full md:w-auto px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="overflow-x-auto">
              <Table
                headers={["ID", "Nama", "Total", "Tanggal"]}
                data={filteredTransaksi.map((t) => ({
                  ID: t.id,
                  Nama: t.nama,
                  Total: t.total,
                  Tanggal: t.tanggal,
                }))}
              />
            </div>
          </section>
          <div className="flex justify-end gap-2">
            <button
              onClick={handleDownloadPDF}
              className="bg-green-700 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow cursor-pointer"
            >
              <Icon icon="mdi:file-pdf" className="text-xl" /> Unduh PDF
            </button>
            <button
              onClick={handleDownloadExcel}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow cursor-pointer"
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
