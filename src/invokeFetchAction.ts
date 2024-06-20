import { FetchConfig } from './interface';

export const invokeFetchAction = async (url: string, params?: BodyInit | null, options?: FetchConfig) => {
  const { domain, path, headers, ...rest } = options || {};

  const response = await fetch(`${domain}${path}${url}`, {
    ...rest,
    headers,
    body: params,
  });

  return response;
};
