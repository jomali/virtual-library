export class HttpRequest {
  private static request = (
    resource: string,
    options: Record<string, unknown>
  ) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    options.headers = headers;
    options.mode = "cors";

    return fetch(resource, options).then((response) => {
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
  };

  public static DELETE = (resource: string) => {
    const options = { method: "DELETE" };
    return this.request(resource, options);
  };

  public static GET = (resource: string) => {
    const options = { method: "GET" };
    return this.request(resource, options);
  };

  public static POST = (resource: string, data: unknown) => {
    const options = { method: "POST", body: JSON.stringify(data) };
    return this.request(resource, options);
  };

  public static PUT = (resource: string, data: unknown) => {
    const options = { method: "PUT", body: JSON.stringify(data) };
    return this.request(resource, options);
  };
}
