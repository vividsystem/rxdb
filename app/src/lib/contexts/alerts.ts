import { createContext, useContext } from "solid-js";

export type AlertType = "success" | "error" | "info" | "warning"


export interface Alert {
  id: string;
  type: AlertType;
	title: string
  message?: string;
}

interface AlertContextValue {
  addAlert: (alert: Omit<Alert, "id">) => void;
}

export const AlertContext = createContext<AlertContextValue>();

export function useAlerts() {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error("useAlerts must be used within an AlertProvider");
  return ctx;
}
