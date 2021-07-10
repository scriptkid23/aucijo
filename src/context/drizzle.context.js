import React, { createContext, useContext } from "react";

export const DrizzleContext = createContext();

export function DrizzleProvider({ drizzle, children }) {
  return <DrizzleContext.Provider value={drizzle}>{children}</DrizzleContext.Provider>;
}

export function useDrizzleContext() {
  const context = useContext(DrizzleContext);
  return context;
}