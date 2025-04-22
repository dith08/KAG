import { useState } from "react";
import { ToastContext } from "./ToastContext";
import { ToastComponent } from "./ToastComponent";

export type ToastContextType = {
  showToast: (message: string, type?: "success" | "error") => void;
};

type Toast = {
  message: string;
  type: "success" | "error";
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<Toast | null>(null);
  const [visible, setVisible] = useState(false);

  const showToast = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setToast({ message, type });
    setVisible(true);
    setTimeout(() => setVisible(false), 2500);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <ToastComponent
          toast={toast}
          visible={visible}
          onClose={() => setVisible(false)}
        />
      )}
    </ToastContext.Provider>
  );
};
