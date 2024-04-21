import { config } from "./config";

import { parseUrl } from "./parseUrl";
export * from "./config";
const cache: Record<string, IFectch> = {};

const invokeFetchRequest = async (
  url: string,
  params?: BodyInit | null,
  options?: FetchConfig
) => {
  const { domain, path, headers, ...restOptions } = options || {};

  return await fetch(`${domain}${path}${url}`, {
    ...restOptions,
    headers,
    body: params,
  });
};

/**
 * 对接口请求后处理
 * @param res 响应结果
 * @param options 选项
 * @returns 处理后结果
 */
const onPostProcessing = async <T = any>(
  res: Response,
  options: FetchConfig
) => {
  let data = await res.json();

  if (!res.ok) {
    return (options.onFailure?.(data, options) || data) as T;
  } else {
    return (options.onSuccess?.(data, options) || data) as T;
  }
};

const buildFetchActionWithConfig =
  (configKey: string) => (method: FetchConfigMethods) => {
    return async <T>(
      url: string,
      body?: FetchParams,
      options?: FetchConfig
    ) => {
      const defConfig = config(configKey);

      const { query, params } = body || {};
      options = { ...defConfig, ...(options || {}), method };
      if (method !== "GET") {
        options = {
          ...options,
          headers: {
            "Content-Type": "application/json",
            ...(options?.headers || {}),
          },
        };
      }

      try {
        const data = await invokeFetchRequest(
          parseUrl(url, query),
          method === "GET" ? null : JSON.stringify(params),
          options
        );
        return onPostProcessing<T>(data, options);
      } catch (e: any) {
        throw e;
      }
    };
  };

export const withFetcher = (key?: string): IFectch => {
  const configKey = key || "default";
  if (!cache[configKey]) {
    const fetchActionBuilder = buildFetchActionWithConfig(configKey);

    const get = fetchActionBuilder("GET");
    const post = fetchActionBuilder("POST");
    const put = fetchActionBuilder("PUT");
    const _delete = fetchActionBuilder("DELETE");
    const head = fetchActionBuilder("HEAD");
    cache[configKey] = { get, post, put, delete: _delete, head };
  }
  return cache[configKey];
};
