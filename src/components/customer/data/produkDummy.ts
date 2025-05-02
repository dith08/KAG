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
  {
    slug: "kalender",
    nama: "Kalender",
    deskripsi: [
      "Tersedia dalam beberapa pilihan bahan",
      "Ukuran bervariasi",
      "Jumlah isi terdapat 4 pilihian yaitu 1 lembar - 4 lembar - 7 lembar - 13 lembar",
      "Finishing bisa menggunakan spiral dan hanger bisa juga dengan klem kaleng",
      "Estimasi produksi mengacu pada jumlah pesanan anda",
    ],
    image: "/images/calendar.png",
    form: [
      {
        label: "Bahan",
        type: "select",
        options: ["Art Paper 150", "Art Carton 230", "Art Carton 260"],
      },
      {
        label: "Isi",
        type: "select",
        options: ["1 lembar", "4 lembar", "7 lembar", "13 lembar"],
      },
      { label: "Jumlah", type: "number" },
      { label: "Harga Satuan", type: "readonly", value: 5000 },
      { label: "Catatan", type: "textarea" },
    ],
  },
  {
    slug: "majalah",
    nama: "Majalah",
    deskripsi: [
      "Dengan pilihan bahan bervariatif",
      "Jumlah halaman custom",
      "Cetak bisa full color atau blackwhite",
      "Untuk ukuran A4 jilid staples hanya bisa posisi potrait",
      "Estimasi produksi mengacu pada jumlah pesanan anda",
    ],
    image: "/images/magazine.png",
    form: [
      { label: "Ukuran", type: "select", options: ["B5", "A5", "A4"] },
      {
        label: "Orientasi",
        type: "select",
        options: ["Portrait", "Landscape"],
      },
      {
        label: "Finishing Buku",
        type: "select",
        options: ["Jahit Kawat", "Spiral", "Perfect Banding"],
      },
      {
        label: "Bahan Cover",
        type: "select",
        options: ["HVS 80", "Art Paper 120", "Matte Paper 120"],
      },
      {
        label: "Finishing Cover",
        type: "select",
        options: ["Tanpa Laminasi", "Laminasi Doff", "Laminasi Glossy"],
      },
      {
        label: "Bahan Isi",
        type: "select",
        options: ["HVS 80", "Art Paper 120", "Matte Paper 120"],
      },
      { label: "Jumlah Halaman", type: "number" },
      { label: "Cetak Sisi", type: "select", options: ["1 Muka", "2 Muka"] },
      {
        label: "Warna",
        type: "select",
        options: ["Full Color", "Black & White"],
      },
      { label: "Jumlah", type: "number" },
      { label: "Harga Satuan", type: "readonly", value: 20000 },
      { label: "Catatan", type: "textarea" },
    ],
  },
];

export default produkDummy;
