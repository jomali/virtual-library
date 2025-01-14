import React from "react";

export const ApiContext = React.createContext({});

export const ApiProvider: React.FC<IApiProvider> = (props) => {
  const { children, host } = props;
  console.log(`🔔 host`, host);

  return <ApiContext.Provider value={{}}>{children}</ApiContext.Provider>;
};

export interface IApiProvider {
  children: React.ReactNode;
  host: string;
}
