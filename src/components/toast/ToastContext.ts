import { createContext } from "react";
import { ToastContextType } from "./ToastProvider";

export const ToastContext = createContext<ToastContextType | undefined>(undefined);