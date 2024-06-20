import { FetchConfig, FetchMethods, FetchParams } from './interface';
import { invokeFetchAction } from './invokeFetchAction';
import { parseUrl } from './parseUrl';

const onPostProcessing = async <T = any>(res: Response, options: FetchConfig) => {
  let data = await res.json();

  if (!res.ok) {
    return (options.onFailure?.(data, options) || data) as T;
  } else {
    return (options.onSuccess?.(data, options) || data) as T;
  }
};

export const generateFetchBuilder =
  (config: FetchConfig) =>
  (method: FetchMethods) =>
  async <T>(url: string, body?: FetchParams, options?: FetchConfig) => {
    const { query, params } = body || {};
    options = { ...config, ...(options || {}), method };
    if (method !== 'GET') {
      options = {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(options?.headers || {}),
        },
      };
    }

    try {
      const data = await invokeFetchAction(parseUrl(url, query), method === 'GET' ? null : JSON.stringify(params), options);
      return onPostProcessing<T>(data, options ?? {});
    } catch (e: any) {
      throw e;
    }
  };
