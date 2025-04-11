import { FC } from "react";

interface FormInput {
  label: string;
  type: "text" | "number" | "select" | "textarea" | "readonly";
  value?: string | number;
  options?: string[];
}

interface Produk {
  slug: string;
  nama: string;
  deskripsi: string[];
  image: string;
  form: FormInput[];
}

interface Props {
  produk: Produk;
}

const ProdukDetail: FC<Props> = ({ produk }) => {
  return (
    <div className="container mx-auto py-8 px-4 space-y-10">
      {/* DESKRIPSI PRODUK */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <img
          src={produk.image}
          alt={produk.nama}
          className="max-h-80 object-contain"
        />
        <div>
          <h1 className="text-3xl font-bold text-green-800 mb-4">
            {produk.nama}
          </h1>
          <ul className="list-disc ml-5 space-y-2 text-gray-700">
            {produk.deskripsi.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* FORM PEMESANAN */}
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold text-green-800 mb-4">
          Form Pemesanan
        </h2>
        <form className="space-y-4">
          {produk.form.map((input, index) => (
            <div key={index} className="flex flex-col">
              <label className="font-medium">{input.label}</label>

              {input.type === "select" && (
                <select className="border p-2 rounded">
                  {input.options?.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}

              {input.type === "text" || input.type === "number" ? (
                <input
                  type={input.type}
                  className="border p-2 rounded"
                  placeholder={input.label}
                />
              ) : null}

              {input.type === "textarea" && (
                <textarea className="border p-2 rounded" rows={3}></textarea>
              )}

              {input.type === "readonly" && (
                <input
                  type="text"
                  className="border p-2 rounded bg-gray-100"
                  value={`Rp. ${input.value?.toLocaleString()}`}
                  readOnly
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
          >
            Tambah ke Keranjang
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProdukDetail;
