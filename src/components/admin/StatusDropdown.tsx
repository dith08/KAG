import { useState, useEffect } from "react";

interface StatusDropdownProps {
  initialStatus: string;
  options: string[];
  onStatusChange: (status: string) => void;
  onDetailStatusChange?: (detail: string) => void; // optional kalau nggak butuh detail
}

export default function StatusDropdown({
  initialStatus,
  options,
  onStatusChange,
  onDetailStatusChange,
}: StatusDropdownProps) {
  const [, setShowSubMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [statusPesanan, setStatusPesanan] = useState(initialStatus || "");
  const [, setStatusDetail] = useState("");

  useEffect(() => {
    setStatusPesanan(initialStatus);
  }, [initialStatus]);

  const handleSelect = (status: string) => {
    setStatusPesanan(status);
    onStatusChange(status);
    setShowDropdown(false);

    if (onDetailStatusChange) {
      // Reset detail status kalau ada
      if (status !== "Sedang Diproses") {
        setShowSubMenu(false);
        setStatusDetail("");
        onDetailStatusChange("");
      }
    }
  };

  const handleDetailSelect = (detail: string) => {
    setStatusDetail(detail);
    if (onDetailStatusChange) {
      onDetailStatusChange(detail);
    }
    setShowDropdown(false);
    setShowSubMenu(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setShowDropdown((prev) => !prev)}
        className="inline-flex justify-between w-48 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
      >
        {statusPesanan || "Pilih Status"}
      </button>

      {showDropdown && (
        <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {options.map((status) => (
              <button
                key={status}
                onClick={() => handleSelect(status)}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {status}
              </button>
            ))}
          </div>

          {statusPesanan === "Sedang Diproses" && onDetailStatusChange && (
            <div className="mt-2 border-t pt-2">
              <span className="px-4 text-xs text-gray-500">Detail Status:</span>
              <div>
                {["Verifikasi Desain", "Antri Cetak", "Proses Cetak", "Finishing", "Packing"].map((detail) => (
                  <button
                    key={detail}
                    onClick={() => handleDetailSelect(detail)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {detail}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
