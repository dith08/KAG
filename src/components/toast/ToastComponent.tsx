import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

type ToastProps = {
  toast: {
    message: string;
    type: "success" | "error";
  };
  visible: boolean;
  onClose: () => void;
};

export const ToastComponent = ({ toast, visible, onClose }: ToastProps) => {
  const [show, setShow] = useState(visible);

  useEffect(() => {
    setShow(visible);
    if (visible) {
      const timer = setTimeout(() => {
        setShow(false);
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        .slide-in {
          animation: slideIn 0.3s ease-out forwards;
        }

        .slide-out {
          animation: slideOut 0.3s ease-in forwards;
        }
      `}</style>

      {show && (
        <div
          className={`fixed top-4 right-4 z-50 w-[calc(100%-2rem)] sm:w-80 md:w-96 max-w-md 
            flex items-start gap-3 p-3 sm:p-4 rounded-xl shadow-xl border-l-4 
            ${visible ? "slide-in" : "slide-out"}
            ${
              toast.type === "success"
                ? "bg-green-100 border-green-600 text-green-800"
                : "bg-red-100 border-red-600 text-red-800"
            } transition-all duration-300`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <Icon
            icon={
              toast.type === "success" ? "mdi:check-circle" : "mdi:alert-circle"
            }
            className="text-xl sm:text-2xl flex-shrink-0 mt-0.5"
          />
          <span className="flex-1 text-sm sm:text-base pr-8 break-words leading-snug">
            {toast.message}
          </span>

          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            onClick={() => {
              setShow(false);
              onClose();
            }}
            aria-label="Close toast"
          >
            <Icon icon="mdi:close" className="text-base sm:text-lg" />
          </button>
        </div>
      )}
    </>
  );
};
