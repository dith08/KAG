/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from "@iconify/react";
import React, { useRef } from "react";

interface ModernTableProps {
  headers: string[];
  data: Record<string, string | number | React.ReactNode>[];
  expandableHistori?: Record<string, any>[];
}

interface TableRowProps {
  row: Record<string, string | number | React.ReactNode>;
  headers: string[];
  expandableHistori?: Record<string, any>[];
  index: number;
}

const TableRow: React.FC<TableRowProps> = ({ row, headers, expandableHistori, index }) => {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const handleHistoryClick = () => {
    if (detailsRef.current) {
      detailsRef.current.open = !detailsRef.current.open;
    }
  };

  return (
    <details
      key={index}
      ref={detailsRef}
      className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200"
    >
      <summary className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 cursor-pointer">
        {Object.entries(row).map(([key, value], idx) => (
          <div key={idx}>
            <span className="text-xs font-semibold text-gray-500 uppercase">
              {headers[idx]}
            </span>
            <p className="text-sm text-gray-800">
              {key === "Aksi" && (value === null || typeof value === "object") ? (
                <button
                  onClick={handleHistoryClick}
                  className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm"
                >
                  <Icon icon="mdi:history" /> Lihat Histori
                </button>
              ) : (
                value
              )}
            </p>
          </div>
        ))}
      </summary>
      {expandableHistori && (
        <div className="mt-4">
          <ModernTable
            headers={["Tanggal", "Aktivitas", "Jumlah"]}
            data={expandableHistori
              .filter((h) => h.nama === row["Nama Bahan"])
              .map((h) => ({
                Tanggal: h.tanggal,
                Aktivitas: h.aktivitas,
                Jumlah: h.jumlah,
              }))}
          />
        </div>
      )}
    </details>
  );
};

export const ModernTable: React.FC<ModernTableProps> = ({
  headers,
  data,
  expandableHistori,
}) => (
  <div className="space-y-4">
    {data.map((row, i) => (
      <TableRow
        key={i}
        row={row}
        headers={headers}
        expandableHistori={expandableHistori}
        index={i}
      />
    ))}
  </div>
);