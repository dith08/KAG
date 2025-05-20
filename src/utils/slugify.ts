export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/\s+/g, "-")         // Ganti spasi dengan -
    .replace(/[^\w-]+/g, "")      // Hapus karakter non-alphanumeric
    .replace(/--+/g, "-")         // Ganti multiple - dengan single -
    .replace(/^-+|-+$/g, "");     // Hapus - di awal/akhir