import fetch, { Request, RequestInfo, Response } from 'node-fetch'

export interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

const http = <T>(request: RequestInfo): Promise<HttpResponse<T>> => {
  return new Promise((resolve, reject) => {
    let response: HttpResponse<T>;
    fetch(request)
      .then(res => {
        response = res;
        return res.json();
      })
      .then(body => {
        if (response.ok) {
          response.parsedBody = body;
          resolve(response);
        } else if (response.status === 429) {
          reject('Rate limit, too many requests')
        } else {
          reject(response);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const get = <T>(
  path: string,
  headers?: {[index: string]: string},
): Promise<HttpResponse<T>> => {
  const requestInit = { method: "get", headers: headers };
  // console.log('GET Request to %s', path)
  return http<T>(new Request(path, requestInit));
};
 
export const post = <TResponse, TBody>(
  path: string,
  body: TBody,
  headers?: {[index: string]: string},
): Promise<HttpResponse<TResponse>> => {
  const requestInit = { method: "post", body: JSON.stringify(body), headers: headers };
  return http<TResponse>(new Request(path, requestInit));
};

export const put = <TResponse, TBody>(
  path: string,
  body: TBody,
  headers?: {[index: string]: string},
): Promise<HttpResponse<TResponse>> => {
  const requestInit = { method: "put", body: JSON.stringify(body), headers: headers };
  return http<TResponse>(new Request(path, requestInit));
};

