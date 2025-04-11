import { useState } from "react";
import { Produk } from '../customer/data/produkDummy';

interface Props {
  produk: Produk;
}

export default function FormPemesanan({ produk }: Props) {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [jumlah, setJumlah] = useState<number>(0);

  // Ambil harga dari form field dengan type 'readonly'
  const hargaSatuan = produk.form.find((item: { type: string; }) => item.type === "readonly")?.value as number || 0;
  const totalHarga = jumlah * hargaSatuan;

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  const handleJumlahChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setJumlah(value);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-18">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Langkah 1 */}
        <div>
          <div className="flex items-center mb-4">
            <div className="bg-orange-400 text-white font-bold text-2xl w-12 h-12 flex items-center justify-center rounded-md">
              1
            </div>
            <h3 className="ml-4 text-xl font-bold text-green-700 border-b-4 border-orange-400 pb-1">
              TENTUKAN PILIHANMU
            </h3>
          </div>
          <form className="space-y-4">
            {produk.form.map((input, index) => (
              <div key={index} className="flex flex-col">
                <label className="font-semibold mb-1">{input.label}</label>

                {input.type === "select" && (
                  <select className="border p-2 rounded text-gray-700">
                    {input.options?.map((option, idx) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}

                {input.type === "number" && input.label === "Jumlah" && (
                  <input
                    type="number"
                    className="border p-2 rounded text-gray-700"
                    placeholder="Masukkan jumlah"
                    onChange={handleJumlahChange}
                  />
                )}

                {input.type === "readonly" && (
                  <input
                    type="text"
                    readOnly
                    value={`Rp. ${input.value?.toLocaleString()}`}
                    className="border p-2 rounded text-gray-700 bg-gray-100"
                  />
                )}

                {input.type === "textarea" && (
                  <textarea
                    className="border p-2 rounded text-gray-700"
                    rows={3}
                    placeholder={input.label}
                  />
                )}
              </div>
            ))}
          </form>
        </div>

        {/* Langkah 2 & 3 */}
        <div className="space-y-8">
          {/* Langkah 2 */}
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-orange-400 text-white font-bold text-2xl w-12 h-12 flex items-center justify-center rounded-md">
                2
              </div>
              <h3 className="ml-4 text-xl font-bold text-green-700 border-b-4 border-orange-400 pb-1">
                UPLOAD DESAIN
              </h3>
            </div>

            <p className="font-medium mb-2">
              Format yang didukung: <strong>CDR, PDF, PNG, JPG, PSD</strong>
            </p>

            <div className="flex items-center gap-4 mb-2">
              <label className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded cursor-pointer inline-flex items-center gap-2">
                📤 BROWSE
                <input type="file" className="hidden" onChange={handleUpload} />
              </label>
              <span>
                Tidak punya desain?{" "}
                <a href="#" className="text-blue-600 underline">
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
              <div className="bg-orange-400 text-white font-bold text-2xl w-12 h-12 flex items-center justify-center rounded-md">
                3
              </div>
              <h3 className="ml-4 text-xl font-bold text-green-700 border-b-4 border-orange-400 pb-1">
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
              className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded inline-flex items-center gap-2"
            >
              🛒 ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
