import { useState } from "react";
import { Icon } from "@iconify/react";
import ChecklistOption from "./ChecklistOption";

const ReviewModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [rating, setRating] = useState<number | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [reviewText, setReviewText] = useState("");

  const improvementOptions = [
    "Kualitas produk tidak sesuai ekspektasi",
    "Pelayanan kurang memuaskan",
    "Pengiriman terlalu lama",
    "Harga terlalu mahal",
    "Kemasan kurang baik",
  ];

  const satisfactionOptions = [
    "Produk berkualitas",
    "Pelayanan memuaskan",
    "Pengiriman cepat",
    "Harga sesuai kualitas",
    "Kemasan bagus",
  ];

  const handleRating = (value: number) => {
    setRating(value);
    setSelectedOptions([]); // Reset checklist saat rating berubah
  };

  const handleSubmit = () => {
    console.log({ rating, selectedOptions, reviewText });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Feedback</h2>
          <button onClick={onClose}>
            <Icon icon="mdi:close" className="text-2xl cursor-pointer" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Icon
              key={star}
              icon={rating && rating >= star ? "mdi:star" : "mdi:star-outline"}
              className="text-4xl cursor-pointer text-green-700"
              onClick={() => handleRating(star)}
            />
          ))}
        </div>

        {rating && rating < 5 && (
          <ChecklistOption
            options={improvementOptions}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />
        )}
        {rating === 5 && (
          <ChecklistOption
            options={satisfactionOptions}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />
        )}

        <textarea
          className="w-full p-2 rounded-lg mt-4 bg-gray-100"
          placeholder="Tulis ulasan Anda di sini..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />

        <button
          className="w-full bg-green-700 text-white py-2 mt-4 rounded-lg cursor-pointer"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ReviewModal;
