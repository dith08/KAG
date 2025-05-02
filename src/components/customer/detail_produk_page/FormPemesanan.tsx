import { useState } from "react";
import { Produk } from "../data/produkDummy";
import { Icon } from "@iconify/react";

interface Props {
  produk: Produk;
}

export default function FormPemesanan({ produk }: Props) {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [formData, setFormData] = useState<Record<string, string | number>>({});

  const jumlahValue = (formData["Jumlah"] as number) || 0;
  const hargaSatuan =
    (produk.form.find((item) => item.type === "readonly")?.value as number) ||
    0;
  const totalHarga = jumlahValue * hargaSatuan;

  const isFormComplete = produk.form.every((input) => {
    const value = formData[input.label];
    if (input.type === "readonly") return true;
    if (input.type === "number") {
      const numValue = Number(value);
      if (input.label === "Jumlah") return numValue >= 100;
      if (input.label === "Jumlah Halaman") return numValue >= 20;
    }
    return value !== undefined && value !== "" && value !== 0;
  });
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  const handleInputChange = (label: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-18">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Langkah 1 */}
        <div>
          <div className="flex items-center mb-4">
            <div className="bg-yellow-500 text-white font-bold text-2xl w-12 h-12 flex items-center justify-center rounded-md">
              1
            </div>
            <h3 className="ml-4 text-xl font-bold text-green-700 border-b-4 border-yellow-500 pb-1">
              TENTUKAN PILIHANMU
            </h3>
          </div>
          <form className="space-y-4">
            {produk.form.map((input, index) => (
              <div key={index} className="flex flex-col">
                <label className="font-medium mb-1">{input.label}</label>

                {input.type === "select" && (
                  <select
                    className="border p-2 rounded"
                    onChange={(e) =>
                      handleInputChange(input.label, e.target.value)
                    }
                  >
                    <option value="">Pilih {input.label}</option>
                    {input.options?.map((option, idx) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}

                {input.type === "number" && (
                  <>
                    <input
                      type="number"
                      className="border p-2 rounded-lg text-black"
                      placeholder={`Masukkan ${input.label.toLowerCase()}`}
                      min={
                        input.label === "Jumlah"
                          ? 100
                          : input.label === "Jumlah Halaman"
                          ? 20
                          : undefined
                      }
                      value={formData[input.label] ?? ""}
                      onChange={(e) => {
                        const value =
                          e.target.value === "" ? 0 : parseInt(e.target.value);
                        handleInputChange(input.label, value);
                      }}
                    />

                    {input.label === "Jumlah" &&
                      typeof formData[input.label] === "number" &&
                      (formData[input.label] as number) < 100 && (
                        <p className="text-red-500 text-sm mt-1">
                          Jumlah minimal pemesanan adalah 100 pcs
                        </p>
                      )}

                    {input.label === "Jumlah Halaman" &&
                      typeof formData[input.label] === "number" &&
                      (formData[input.label] as number) < 20 && (
                        <p className="text-red-500 text-sm mt-1">
                          Jumlah halaman minimal adalah 20 halaman
                        </p>
                      )}
                  </>
                )}

                {input.type === "textarea" && (
                  <textarea
                    className="border p-2 rounded"
                    rows={3}
                    placeholder="Masukkan catatan untuk penjual"
                    onChange={(e) =>
                      handleInputChange(input.label, e.target.value)
                    }
                  ></textarea>
                )}

                {input.type === "readonly" && (
                  <input
                    type="text"
                    className="border p-2 rounded"
                    value={`Rp. ${input.value?.toLocaleString()}`}
                    readOnly
                  />
                )}
              </div>
            ))}{" "}
          </form>
        </div>

        {/* Langkah 2 & 3 */}
        <div className="space-y-8">
          {/* Langkah 2 */}
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-yellow-500 text-white font-bold text-2xl w-12 h-12 flex items-center justify-center rounded-md">
                2
              </div>
              <h3 className="ml-4 text-xl font-bold text-green-700 border-b-4 border-yellow-500 pb-1">
                UPLOAD DESAIN
              </h3>
            </div>

            <p className="font-medium mb-2">
              Format yang didukung: <strong>CDR, PDF, PNG, JPG, PSD</strong>
            </p>

            <div className="flex items-center gap-4 mb-2">
              <label className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded cursor-pointer inline-flex items-center gap-2">
                <Icon icon="mage:file-upload-fill" className="w-5 h-5" /> BROWSE
                <input
                  type="file"
                  accept=".cdr,.pdf,.png,.jpg,.jpeg,.psd"
                  className="hidden"
                  onChange={handleUpload}
                />
              </label>
              <span>
                Tidak punya desain?{" "}
                <a href="#" className="text-blue-500">
                  Klik disini
                </a>
              </span>
            </div>

            {uploadedImage && (
              <img
                src={URL.createObjectURL(uploadedImage)}
                alt="Uploaded Preview"
                className="mt-4 max-h-48 rounded"
              />
            )}
          </div>

          {/* Langkah 3 */}
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-yellow-500 text-white font-bold text-2xl w-12 h-12 flex items-center justify-center rounded-md">
                3
              </div>
              <h3 className="ml-4 text-xl font-bold text-green-700 border-b-4 border-yellow-500 pb-1">
                TAMBAH KE KERANJANG
              </h3>
            </div>

            <p className="text-lg font-semibold mb-3">
              Total:{" "}
              <span className="text-green-700 font-bold">
                Rp. {totalHarga.toLocaleString()}
              </span>
            </p>

            <button
              type="submit"
              className={`py-2 px-4 rounded text-white ${
                isFormComplete
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!isFormComplete}
            >
              Tambah ke Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
