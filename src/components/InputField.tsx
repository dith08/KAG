import React from "react";
import { Icon } from "@iconify/react";

interface InputFieldProps {
  type: string;
  placeholder: string;
  icon: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword?: boolean;
  togglePasswordVisibility?: () => void;
  disabled?: boolean; // Tambahkan prop disabled
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  icon,
  value,
  onChange,
  showPassword,
  togglePasswordVisibility,
  disabled = false, // Default ke false jika tidak disediakan
}) => {
  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full p-3 pl-12 pr-12 border border-black/50 rounded-[15px] focus:outline-none focus:ring-1 focus:ring-green-700 transition-all duration-200 ${
          disabled ? "opacity-50 cursor-not-allowed bg-gray-100" : "opacity-100"
        }`}
      />
      <Icon
        icon={icon}
        className={`absolute left-3 top-1/2 -translate-y-1/2 text-2xl ${
          disabled ? "text-gray-400" : "text-gray-500"
        }`}
      />
      {togglePasswordVisibility && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          disabled={disabled}
          className={`absolute right-3 top-1/2 -translate-y-1/2 text-2xl cursor-pointer transition-opacity duration-200 ${
            disabled ? "text-gray-400 opacity-50 cursor-not-allowed" : "text-gray-500 opacity-100"
          }`}
        >
          <Icon icon={showPassword ? "mdi:eye" : "mdi:eye-off"} />
        </button>
      )}
    </div>
  );
};

export default InputField;