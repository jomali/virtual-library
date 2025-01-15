/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export const ApiContext = React.createContext<IApi>({
  host: "",
  DELETE: () => null,
  GET: () => null,
  POST: () => null,
  PUT: () => null,
});

export const ApiProvider: React.FC<IApiProvider> = (props) => {
  const { children, host } = props;

  const httpRequest = React.useCallback(
    (options: Record<string, unknown>, call: string) => {
      const resource = [host, "api", call];

      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      options.headers = headers;
      options.mode = "cors";

      return fetch(resource.join("/"), options).then((response) => {
        if (response.ok) {
          return response.status === 200 ? response.json() : true;
        } else {
          throw new Error(
            response.statusText
              ? `Error ${response.status}: ${response.statusText}`
              : `Error ${response.status}`
          );
        }
      });
    },
    [host]
  );

  const DELETE = React.useCallback(
    (call: string) => {
      const options = { method: "DELETE" };
      return httpRequest(options, call);
    },
    [httpRequest]
  );

  const GET = React.useCallback(
    (call: string) => {
      const options = { method: "GET" };
      return httpRequest(options, call);
    },
    [httpRequest]
  );

  const POST = React.useCallback(
    (call: string, data: object) => {
      const options = { method: "POST", body: JSON.stringify(data) };
      return httpRequest(options, call);
    },
    [httpRequest]
  );

  const PUT = React.useCallback(
    (call: string, data: object) => {
      const options = { method: "PUT", body: JSON.stringify(data) };
      return httpRequest(options, call);
    },
    [httpRequest]
  );

  return (
    <ApiContext.Provider
      value={{
        host,
        DELETE,
        GET,
        POST,
        PUT,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export interface IApiProvider {
  children: React.ReactNode;
  host: string;
}

export interface IApi {
  host: string;
  DELETE: (call: string) => any;
  GET: (call: string) => any;
  POST: (call: string, data: Record<string, unknown>) => any;
  PUT: (call: string, data: Record<string, unknown>) => any;
}
