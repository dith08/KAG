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
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  icon,
  value,
  onChange,
  showPassword,
  togglePasswordVisibility,
}) => {
  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-3 pl-12 pr-12 border border-black/50 rounded-[15px] focus:outline-none focus:ring-1 focus:ring-green-700"
      />
      <Icon
        icon={icon}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-2xl"
      />
      {togglePasswordVisibility && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-2xl cursor-pointer"
        >
          <Icon icon={showPassword ? "mdi:eye" : "mdi:eye-off"} />
        </button>
      )}
    </div>
  );
};

export default InputField;
