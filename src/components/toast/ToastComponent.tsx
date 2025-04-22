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
          animation: slideIn 0.5s ease forwards;
        }

        .slide-out {
          animation: slideOut 0.5s ease forwards;
        }
      `}</style>

      {show && (
        <div
          className={`fixed top-2 sm:top-4 md:top-5 right-2 sm:right-4 md:right-5 z-50 w-[90%] sm:w-[360px] max-w-sm 
            flex items-start gap-3 p-4 rounded-lg shadow-lg border-l-4 
            ${visible ? "slide-in" : "slide-out"}
            ${
              toast.type === "success"
                ? "bg-green-50 border-green-500 text-green-700"
                : "bg-red-50 border-red-500 text-red-700"
            }`}
        >
          <Icon
            icon={
              toast.type === "success" ? "mdi:check-circle" : "mdi:alert-circle"
            }
            className="text-2xl flex-shrink-0 mt-0.5"
          />
          <span className="flex-1 pr-6 break-words">{toast.message}</span>

          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            onClick={() => {
              setShow(false);
              onClose();
            }}
          >
            <Icon icon="mdi:close" className="text-lg" />
          </button>
        </div>
      )}
    </>
  );
};
