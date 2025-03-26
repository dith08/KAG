// components/checkout/DeliveryMethodCard.tsx
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
        relative flex items-center p-4 border rounded-lg cursor-pointer 
        ${isSelected ? "border-green-500 bg-white" : "border-gray-300"}
      `}
      onClick={onSelect}
    >
      <div className="mr-4">
        <Icon icon={icon} width={40} height={40} className="text-gray-600" />
      </div>
      <div className="flex-grow">
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-gray-600">{description}</div>
        {additionalInfo && (
          <div className="text-xs text-gray-500 mt-1">{additionalInfo}</div>
        )}
      </div>
      {isSelected && (
        <div className="absolute top-2 right-2 text-green-500">
          <Icon icon="mdi:check-circle" width={24} height={24} />
        </div>
      )}
    </div>
  );
};

export default DeliveryMethodCard;
