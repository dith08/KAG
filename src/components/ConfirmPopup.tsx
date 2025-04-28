import React, { ReactNode } from "react";

interface ConfirmPopupProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  children?: ReactNode;
  onClose?: () => void;
}

const ConfirmPopup: React.FC<ConfirmPopupProps> = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
  title,
  children,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <p className="mb-4">{message}</p>
        {children && <div className="mb-4">{children}</div>}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 cursor-pointer"
          >
            Iya
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
