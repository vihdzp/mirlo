import { API_ROOT } from "../../constants";
import { MirloFetchError } from "./MirloFetchError";

const baseUrl = API_ROOT?.replace(" ", "") ?? "";

/**
 * Wraps fetch() calls to Mirlo's API with error handling.
 *
 * @param endpoint The API request path (appended to API_ROOT)
 * @param init Fetch request options
 * @returns The resolved JSON response
 * @throws MirloFetchError if the response code is not OK
 * @throws SyntaxError if the response body is not JSON
 */
async function fetchWrapper<R>(
  endpoint: string,
  init: RequestInit
): Promise<R> {
  const res = await fetch(`${baseUrl}/${endpoint}`, {
    credentials: "include",
    ...init,
  });
  if (!res.ok) {
    let message;
    try {
      message = (await res.json()).error;
    } catch (e) {
      message = res.text;
    }
    throw new MirloFetchError(res, message);
  }
  return await res.json();
}

/**
 * Wraps fetch() GET calls to Mirlo's API with error handling.
 *
 * @param endpoint The API request path (appended to API_ROOT)
 * @param init Fetch request options
 * @returns The resolved JSON response
 * @throws MirloFetchError if the response code is not OK
 * @throws SyntaxError if the response body is not JSON
 */
export function get<R>(endpoint: string, init: RequestInit): Promise<R> {
  return fetchWrapper(endpoint, {
    method: "GET",
    ...init,
  });
}

/**
 * Wraps fetch() POST calls to Mirlo's API with error handling.
 *
 * @param endpoint The API request path (appended to API_ROOT)
 * @param body The JSON-encoded request body
 * @param init Fetch request options
 * @returns The resolved JSON response
 * @throws MirloFetchError if the response code is not OK
 * @throws SyntaxError if the response body is not JSON
 */
export function post<T, R>(
  endpoint: string,
  body: T,
  init: RequestInit = {}
): Promise<R> {
  return fetchWrapper(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    ...init,
  });
}

/**
 * Wraps fetch() PUT calls to Mirlo's API with error handling.
 *
 * @param endpoint The API request path (appended to API_ROOT)
 * @param body The JSON-encoded request body
 * @param init Fetch request options
 * @returns The resolved JSON response
 * @throws MirloFetchError if the response code is not OK
 * @throws SyntaxError if the response body is not JSON
 */
export function put<T, R>(
  endpoint: string,
  body: T,
  init: RequestInit = {}
): Promise<R> {
  return fetchWrapper(endpoint, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    ...init,
  });
}

/**
 * Wraps fetch() DELETE calls to Mirlo's API with error handling.
 *
 * @param endpoint The API request path (appended to API_ROOT)
 * @param init Fetch request options
 * @returns The resolved JSON response
 * @throws MirloFetchError if the response code is not OK
 * @throws SyntaxError if the response body is not JSON
 */
export function del<R>(endpoint: string, init: RequestInit = {}): Promise<R> {
  return fetchWrapper(endpoint, {
    method: "DELETE",
    ...init,
  });
}
