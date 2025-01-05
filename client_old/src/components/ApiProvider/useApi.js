import React from "react";
import { ApiContext } from "./ApiProvider";

export default () => {
  const hostname = React.useContext(ApiContext);

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const _httpRequest = (options, call, ...params) => {
    const resource = [hostname, call];

    params.forEach((param) => {
      if (typeof param === "string") {
        param = encodeURIComponent(param);
      }
      resource.push(param);
    });

    options.headers = headers;
    options.mode = "cors";

    return fetch(resource.join("/"), options)
      .then((response) => {
        if (response.ok) {
          return response.status === 200 ? response.json() : true;
        } else {
          let errorcode;
          for (var pair of response.headers.entries()) {
            if (pair[0] === "errorcode") {
              errorcode = pair[1];
              break;
            }
          }
          const error = new Error(
            response.statusText
              ? `Error ${response.status}: ${response.statusText}`
              : `Error ${response.status}`
          );
          error.errorcode = errorcode;
          error.response = response;
          throw error;
        }
      })
      .catch((error) => {
        const result = { ...error, level: "error" };
        throw result;
      });
  };

  const DELETE = (call, ...params) => {
    const options = { method: "DELETE" };
    return _httpRequest(options, ["api", call].join("/"), ...params);
  };

  const GET = (call, ...params) => {
    const options = { method: "GET" };
    return _httpRequest(options, ["api", call].join("/"), ...params);
  };

  const POST = (call, data, ...params) => {
    const options = { method: "POST", body: JSON.stringify(data) };
    return _httpRequest(options, ["api", call].join("/"), ...params);
  };

  const PUT = (call, data, ...params) => {
    const options = { method: "PUT", body: JSON.stringify(data) };
    return _httpRequest(options, ["api", call].join("/"), ...params);
  };

  return {
    hostname,
    DELETE,
    GET,
    POST,
    PUT,
  };
};
