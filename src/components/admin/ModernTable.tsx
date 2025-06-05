/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from "@iconify/react";
import React, { useRef } from "react";
import { Link } from "react-router-dom";

interface ModernTableProps {
  headers: string[];
  data: Record<string, string | number | React.ReactNode>[];
  expandableHistori?: Record<string, any>[];
  detailRoute?: string;
  keyField?: string;
  historiKeyField?: string;
}

interface TableRowProps {
  row: Record<string, string | number | React.ReactNode>;
  headers: string[];
  expandableHistori?: Record<string, any>[];
  detailRoute?: string;
  keyField?: string;
  historiKeyField?: string;
  index: number;
}

const TableRow: React.FC<TableRowProps> = ({
  row,
  headers,
  expandableHistori,
  detailRoute,
  keyField = "id",
  historiKeyField = "nama",
  index,
}) => {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const handleHistoryClick = () => {
    if (detailsRef.current && expandableHistori) {
      detailsRef.current.open = !detailsRef.current.open;
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation(); // Mencegah event bubbling ke <summary>
  };

  return (
    <details
      key={index}
      ref={detailsRef}
      className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200"
    >
      <summary className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2 items-start cursor-pointer">
        {Object.entries(row).map(([key, value], idx) => (
          <div key={idx} className="space-y-1 flex flex-col min-w-0">
            <span className="text-xs font-semibold text-gray-500 uppercase block truncate">
              {headers[idx]}
            </span>
            <p className="text-sm text-gray-800 p-0 truncate">
              {key === "Aksi" && (value === null || typeof value === "object") ? (
                detailRoute ? (
                  <Link
                    to={`${detailRoute}/${String(row[keyField] || '').replace("#", "")}`}
                    className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm"
                    onClick={handleLinkClick}
                  >
                    <Icon icon="mdi:eye-outline" /> Lihat Detail
                  </Link>
                ) : expandableHistori ? (
                  <button
                    onClick={handleHistoryClick}
                    className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm"
                  >
                    <Icon icon="mdi:history" /> Lihat Histori
                  </button>
                ) : (
                  value
                )
              ) : (
                value
              )}
            </p>
          </div>
        ))}      </summary>
      {expandableHistori && (
        <div className="mt-4">
          <ModernTable
            headers={["Tanggal", "Aktivitas", "Jumlah"]}
            data={expandableHistori
              .filter((h) => h[historiKeyField] === row[headers[0]])
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
  detailRoute,
  keyField,
  historiKeyField,
}) => (
  <div className="space-y-4">
    {data.map((row, i) => (
      <TableRow
        key={i}
        row={row}
        headers={headers}
        expandableHistori={expandableHistori}
        detailRoute={detailRoute}
        keyField={keyField}
        historiKeyField={historiKeyField}
        index={i}
      />
    ))}
  </div>
);
