import React from "react";
import { Icon } from "@iconify/react";

interface DeliveryMethodCardProps {
  icon: string;
  title: string;
  description: string;
  additionalInfo?: string;
  isSelected: boolean;
  onSelect: () => void;
}

const DeliveryMethodCard: React.FC<DeliveryMethodCardProps> = ({
  icon,
  title,
  description,
  additionalInfo = "",
  isSelected,
  onSelect,
}) => {
  return (
    <div
      className={`
        relative flex flex-col items-center 
        p-3 sm:p-4 
        border rounded-lg cursor-pointer w-full
        transition-all duration-200
        ${isSelected ? "border-green-700 bg-white shadow-sm" : "border-black/50 bg-white"}
      `}
      onClick={onSelect}
      role="button"
      aria-label={`Pilih ${title}`}
    >
      {isSelected && (
        <div className="absolute top-0 right-0 bg-green-700 text-white p-1 rounded-bl-lg rounded-tr-lg">
          <Icon icon="icon-park-solid:correct" width={16} height={16} />
        </div>
      )}

      <div className="mb-2">
        <Icon
          icon={icon}
          width={28}
          height={28}
          className={isSelected ? "text-green-700" : "text-black/50"}
        />
      </div>

      <div className="text-center">
        <div
          className={`font-semibold text-sm sm:text-base mb-1 ${
            isSelected ? "text-green-700" : "text-black/50"
          }`}
        >
          {title}
        </div>
        <div
          className={`text-sm ${
            isSelected ? "text-green-700" : "text-black/50"
          }`}
        >
          {description}
        </div>
        {additionalInfo && (
          <div
            className={`text-sm ${
              isSelected ? "text-green-700" : "text-black/50"
            }`}
          >
            {additionalInfo}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryMethodCard;