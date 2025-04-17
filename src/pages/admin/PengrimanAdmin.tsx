import React from "react";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import NavbarAdmin from "../../components/admin/NavbarAdmin";

const AdminShippingPage: React.FC = () => {
  const shipments = [
    { id: 1, product: "majalah", buyer: "Isham", buyerId: "B001", status: "Sedang di proses" },
    { id: 2, product: "majalah", buyer: "Isham", buyerId: "B001", status: "Sedang di proses" },
    { id: 3, product: "majalah", buyer: "Isham", buyerId: "B001", status: "Sedang di proses" },
    { id: 4, product: "majalah", buyer: "Isham", buyerId: "B001", status: "Sedang di proses" },
    { id: 5, product: "majalah", buyer: "Isham", buyerId: "B001", status: "Sedang di proses" },
    { id: 6, product: "majalah", buyer: "Isham", buyerId: "B001", status: "Sedang di proses" },
  ];

  return (
    <div className="flex ml-64 mt-24 p-6">
      <SidebarAdmin />
      <div className="flex-1">
        <NavbarAdmin />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Kelola Pengiriman</h1>

          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-2">
              <thead>
                <tr className="bg-[#FFE082] text-left">
                  <th className="px-4 py-2 rounded-l-lg">No.</th>
                  <th className="px-4 py-2">Produk</th>
                  <th className="px-4 py-2">ID Pembeli</th>
                  <th className="px-4 py-2">Nama Pembeli</th>
                  <th className="px-4 py-2 rounded-r-lg">Status Pengiriman</th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((item, index) => (
                  <tr key={item.id} className="bg-[#FFECB3]">
                    <td className="px-4 py-2 rounded-l-lg font-semibold">{index + 1}.</td>
                    <td className="px-4 py-2">{item.product}</td>
                    <td className="px-4 py-2">{item.buyerId}</td>
                    <td className="px-4 py-2">{item.buyer}</td>
                    <td className="px-4 py-2 rounded-r-lg">
                      <select
                        defaultValue={item.status}
                        className="bg-[#CFD8DC] text-sm rounded-md px-2 py-1"
                      >
                        <option value="Sedang di proses">Sedang di proses</option>
                        <option value="Dalam pengiriman">Dalam pengiriman</option>
                        <option value="Terkirim">Terkirim</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminShippingPage;
