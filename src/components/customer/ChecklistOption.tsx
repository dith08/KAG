import { Dispatch, SetStateAction } from "react";

const ChecklistOption = ({
  options,
  selectedOptions,
  setSelectedOptions,
}: {
  options: string[];
  selectedOptions: string[];
  setSelectedOptions: Dispatch<SetStateAction<string[]>>;
}) => {
  const toggleOption = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          className={`px-3 py-2 rounded-lg ${
            selectedOptions.includes(option) ? "bg-green-700 text-white cursor-pointer" : "bg-gray-100 cursor-pointer"
          }`}
          onClick={() => toggleOption(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default ChecklistOption;
