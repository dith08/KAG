// components/checkout/PaymentMethodCard.tsx
import React from "react";

interface PaymentMethodCardProps {
  method: string;
  icon?: React.ReactNode;
  isSelected: boolean;
  onSelect: () => void;
}

const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({
  method,
  icon,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      className={`
        flex items-center p-4 border rounded-lg cursor-pointer 
        ${isSelected ? "border-green-500 bg-green-50" : "border-gray-300"}
      `}
      onClick={onSelect}
    >
      {icon && <div className="mr-4">{icon}</div>}
      <div className="flex-grow">{method}</div>
      {isSelected && (
        <div className="ml-auto text-green-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodCard;
