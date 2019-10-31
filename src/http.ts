import fetch from 'node-fetch'
import { HeadersInit, Request, RequestInfo, RequestInit, Response } from 'node-fetch'
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
          reject('Too many requests')
        } else {
          reject(response);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const get = async <T>(
  path: string,
  headers?: HeadersInit,
  args: RequestInit = { method: "get", headers: headers }
): Promise<HttpResponse<T>> => {
  // console.log('GET Request to %s', path)
  return await http<T>(new Request(path, args));
};
 
export const post = async <TResponse, TBody>(
  path: string,
  body: TBody,
  headers?: HeadersInit,
  args: RequestInit = { method: "post", body: JSON.stringify(body), headers: headers }
): Promise<HttpResponse<TResponse>> => {
  return await http<TResponse>(new Request(path, args));
};

export const put = async <TResponse, TBody>(
  path: string,
  body: TBody,
  headers?: HeadersInit,
  args: RequestInit = { method: "put", body: JSON.stringify(body), headers: headers }
): Promise<HttpResponse<TResponse>> => {
  return await http<TResponse>(new Request(path, args));
};

