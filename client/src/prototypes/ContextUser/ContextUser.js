import React from "react";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [data] = React.useState(true);

  return (
    <UserContext.Provider value={{ data }}>{children}</UserContext.Provider>
  );
};
