import { Icon } from "@iconify/react";
import React, { useState } from "react";

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
      className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer 
        ${
          isSelected ? "border-green-700 bg-white" : "border-black/50 bg-white"
        }`}
      onClick={onSelect}
    >
      {icon && <div className="mr-4">{icon}</div>}
      <div
        className={`flex-grow ${
          isSelected
            ? "text-green-700 font-medium"
            : "text-black/50 font-medium"
        }`}
      >
        {method}
      </div>
      {isSelected && (
        <div className="absolute bottom-0 right-0 bg-green-700 text-white p-1 rounded-br-lg rounded-tl-lg">
          <Icon icon="icon-park-solid:correct" width={12} height={12} />
        </div>
      )}
    </div>
  );
};

const PaymentOptions: React.FC = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);

  const paymentMethods = [
    { id: "bank-transfer", method: "Transfer Bank" },
    { id: "tunai", method: "Tunai" },
  ];

  const banks = [{ id: "bri", name: "BRI" }];

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-4 uppercase">
        Metode Pembayaran
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {paymentMethods.map((method) => (
          <PaymentMethodCard
            key={method.id}
            method={method.method}
            isSelected={selectedPaymentMethod === method.id}
            onSelect={() => setSelectedPaymentMethod(method.id)}
          />
        ))}
      </div>

      {/* Jika Transfer Bank Dipilih, Tampilkan Opsi Bank */}
      {selectedPaymentMethod === "bank-transfer" && (
        <div className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            {banks.map((bank) => (
              <label
                key={bank.id}
                className="flex items-center cursor-pointer space-x-2"
              >
                <input
                  type="radio"
                  name="bank"
                  value={bank.id}
                  checked={selectedBank === bank.id}
                  onChange={() => setSelectedBank(bank.id)}
                  className="hidden"
                />
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    selectedBank === bank.id
                      ? "border-green-700"
                      : "border-gray-400"
                  }`}
                >
                  {selectedBank === bank.id && (
                    <div className="w-2 h-2 bg-green-700 rounded-full"></div>
                  )}
                </div>
                <img
                  src={`/images/bank-bri.png`}
                  alt={bank.name}
                  className="w-10 h-8"
                />
                <span className="font-medium">{bank.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentOptions;
