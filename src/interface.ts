export type FetchConfigMethods =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "HEAD"
  | "OPTIONS";
export type LooseObject<T = any> = Record<string, T>;
export interface FetchConfig {
  domain?: string;
  port?: number;
  https?: boolean;
  path?: string;
  mode?: RequestMode;
  method?: FetchConfigMethods;
  credentials?: RequestCredentials;
  headers?: Record<string, string>;
  cache?: RequestCache;
  onFailure?: (data: any, options?: FetchConfig) => any;
  onSuccess?: (data: any, options?: FetchConfig) => any;
  /**
   * 是否对请求结果展示界面提示,
   */
  enableResultPrompt?: boolean;
}

export type FetchParams = Partial<Record<string, LooseObject> | null>;
export type FetchUrl = string;
export type FetchMethod = <T = any>(
  url: string,
  params?: FetchParams,
  options?: FetchConfig
) => Promise<T>;
export type FetchPostMethod = FetchMethod;
export type FetchPutMethod = FetchMethod;
export type FetchHeadMethod = FetchMethod;
export type FetchDeleteMethod = FetchMethod;
export type FetchGetMethod = FetchMethod;
export interface IFectch {
  get: FetchGetMethod;
  post: FetchPostMethod;
  put: FetchPutMethod;
  head: FetchHeadMethod;
  delete: FetchDeleteMethod;
}
