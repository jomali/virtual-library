import React from "react";

export const ApiContext = React.createContext();

export const ApiProvider = ({ children, host }) => {
  return <ApiContext.Provider value={host}>{children}</ApiContext.Provider>;
};
