import { Base64 } from "js-base64";
import React from "react";
import { APIContext } from "./ContextAPI";

const DEBUG = true;

const AUTHORIZATION = {
  password: "pass",
  username: "user",
};

export default () => {
  const configuration = React.useContext(APIContext);

  const apiUrl =
    process.env.NODE_ENV === "development"
      ? configuration.data.api.urlDev
      : configuration.data.api.url;

  const headers = new Headers();
  headers.append(
    "Authorization",
    "Basic " +
      Base64.encode(AUTHORIZATION.username + ":" + AUTHORIZATION.password)
  );
  headers.append("Content-Type", "application/json");

  const _httpRequest = (options, call, ...params) => {
    const resource = [apiUrl, call];
    params.forEach((param) => {
      if (typeof param === "string") {
        param = encodeURIComponent(param);
      }
      resource.push(param);
    });

    if (DEBUG) {
      let requestDebug = `${options.method}: ${resource.join("/")}`;
      if (options.body) requestDebug += ` - ${options.body}`;
      console.log(requestDebug);
    }

    options.headers = headers;
    options.mode = "cors";
    return fetch(resource.join("/"), options).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        let error = new Error(
          "Error " + response.status + ": " + response.statusText
        );
        error.response = response;
        throw error;
      }
    });
  };

  const DELETE = (call, ...params) => {
    const options = { method: "DELETE" };
    return _httpRequest(options, call, ...params);
  };

  const GET = (call, ...params) => {
    const options = { method: "GET" };
    return _httpRequest(options, call, ...params);
  };

  const POST = (call, data, ...params) => {
    const options = { method: "POST", body: JSON.stringify(data) };
    return _httpRequest(options, call, ...params);
  };

  const PUT = (call, data, ...params) => {
    const options = { method: "PUT", body: JSON.stringify(data) };
    return _httpRequest(options, call, ...params);
  };

  return { DELETE, GET, POST, PUT };
};
