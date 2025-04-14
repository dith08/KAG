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
  additionalInfo,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      className={`
    relative flex flex-col items-center 
    p-4 sm:p-4 md:p-5 lg:p-6 
    border-2 rounded-lg cursor-pointer 
    ${isSelected ? "border-green-700 bg-white" : "border-black/50 bg-white"}
  `}
      onClick={onSelect}
    >
      {isSelected ? (
        <div className="absolute top-0 right-0 bg-green-700 text-white p-2 rounded-bl-lg rounded-tr-lg">
          <Icon icon="icon-park-solid:correct" width={18} height={18} />
        </div>
      ) : (
        <div className="absolute top-0 right-0 bg-black/50 text-white p-2 rounded-bl-lg rounded-tr-lg">
          <Icon icon="icon-park-solid:correct" width={18} height={18} />
        </div>
      )}

      <div className="mb-3">
        <Icon
          icon={icon}
          width={40}
          height={40}
          className={`
            ${isSelected ? "text-green-700" : "text-black/50"}
          `}
        />
      </div>

      <div className="text-center">
        <div
          className={`
          font-semibold mb-1 
          ${isSelected ? "text-green-700" : "text-black/50"}
        `}
        >
          {title}
        </div>
        <div
          className={`
          text-sm mb-1 
          ${isSelected ? "text-green-700" : "text-black/50"}
        `}
        >
          {description}
        </div>
        {additionalInfo && (
          <div
            className={`
            text-xs 
            ${isSelected ? "text-green-700" : "text-black/50"}
          `}
          >
            {additionalInfo}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryMethodCard;
