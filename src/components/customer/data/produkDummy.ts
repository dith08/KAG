export interface FormInput {
  label: string;
  type: "text" | "number" | "select" | "textarea" | "readonly";
  value?: string | number;
  options?: string[];
}

export interface Produk {
  slug: string;
  nama: string;
  deskripsi: string[];
  image: string;
  form: FormInput[];
}

export const produkDummy: Produk[] = [
  {
    slug: "paperbag",
    nama: "Paperbag",
    deskripsi: [
      "Tas berbahan kertas",
      "Kertas Art Carton 210 Laminasi Doft atau Glossy",
      "Ukuran Maksimal p x l x t = 18 x 7,6 x 24",
      "Cetak Full Color",
      "Estimasi produksi mengacu pada jumlah pesanan anda",
    ],
    image: "/images/paperbag3.png",
    form: [
      { label: "Bahan", type: "select", options: ["Art Carton", "Ivory"] },
      { label: "Jumlah", type: "number" },
      { label: "Harga Satuan", type: "readonly", value: 5000 },
      { label: "Catatan", type: "textarea" },
    ],
  },
];

export default produkDummy;
