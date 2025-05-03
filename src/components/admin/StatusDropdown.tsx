import { useState, useEffect } from "react";

interface StatusDropdownProps {
  initialStatus: string;
  onStatusChange: (status: string) => void;
  onDetailStatusChange: (detail: string) => void;
}

export default function StatusDropdown({
  initialStatus,
  onStatusChange,
  onDetailStatusChange,
}: StatusDropdownProps) {
  const [showSubMenu, setShowSubMenu] = useState(false);
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
    if (status !== "Sedang Diproses") {
      setShowSubMenu(false);
      setStatusDetail("");
      onDetailStatusChange("");
    }
  };

  const handleDetailSelect = (detail: string) => {
    setStatusDetail(detail);
    onDetailStatusChange(detail);
    setShowDropdown(false);
    setShowSubMenu(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={() => setShowDropdown((prev) => !prev)}
          className="inline-flex justify-between w-48 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          {statusPesanan || "Pilih Status"}
        </button>
        {showDropdown && (
          <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              <button
                onClick={() => handleSelect("Menunggu Konfirmasi")}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Menunggu Konfirmasi
              </button>

              <div className="relative">
                <button
                  onClick={() => {
                    setShowSubMenu(true);
                    setStatusPesanan("Sedang Diproses");
                    onStatusChange("Sedang Diproses");
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Sedang Diproses →
                </button>

                {showSubMenu && (
                  <div className="absolute left-full top-0 mt-0 ml-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    {[
                      "Verifikasi Desain",
                      "Antri Cetak",
                      "Proses Cetak",
                      "Finishing",
                      "Packing",
                    ].map((detail) => (
                      <button
                        key={detail}
                        onClick={() => handleDetailSelect(detail)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        {detail}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => handleSelect("Dikirim")}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Dikirim
              </button>
              <button
                onClick={() => handleSelect("Selesai")}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Selesai
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}