import React, { ReactNode } from "react";
import { Icon } from "@iconify/react";

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
    <>
      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeOutScale {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0.9);
          }
        }

        .popup-enter {
          animation: fadeInScale 0.2s ease-out forwards;
        }

        .popup-exit {
          animation: fadeOutScale 0.2s ease-in forwards;
        }
      `}</style>

      <div
        className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 px-4"
        onClick={
          onClose ? (e) => e.target === e.currentTarget && onClose() : undefined
        }
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
      >
        <div
          className={`bg-white p-4 sm:p-6 rounded-xl shadow-xl w-full max-w-md sm:max-w-lg 
            ${isOpen ? "popup-enter" : "popup-exit"}`}
        >
          <div className="flex justify-between items-center mb-4">
            <h3
              id="popup-title"
              className="text-lg sm:text-xl font-semibold text-black"
            >
              {title}
            </h3>
            {onClose && (
              <button
                className="text-gray-500 hover:text-gray-800 transition-colors duration-200 cursor-pointer"
                onClick={onClose}
                aria-label="Close popup"
              >
                <Icon icon="mdi:close" className="text-lg sm:text-xl" />
              </button>
            )}
          </div>
          <p className="text-sm sm:text-base text-black/50 mb-4 sm:mb-6 leading-relaxed">
            {message}
          </p>
          {children && <div className="mb-4 sm:mb-6">{children}</div>}
          <div className="flex justify-end space-x-3 sm:space-x-4">
            <button
              onClick={onCancel}
              className="bg-gray-200 text-gray-700 px-3 sm:px-4 py-2 rounded-md hover:bg-gray-300 
                focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-200 text-sm sm:text-base cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="bg-red-500 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-red-600 
                focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors duration-200 text-sm sm:text-base cursor-pointer"
            >
              Iya
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmPopup;
