declare type FetchConfigMethods =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "HEAD"
  | "OPTIONS";
declare interface FetchConfig {
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

declare type FetchParams = Partial<Record<string, LooseObject> | null>;
declare type FetchUrl = string | IFetchUrl;
declare type FetchMethod = <T = any>(
  url: string,
  params?: FetchParams,
  options?: FetchConfig
) => Promise<IFetchResult<T>>;
declare type FetchPostMethod = FetchMethod;
declare type FetchPutMethod = FetchMethod;
declare type FetchHeadMethod = FetchMethod;
declare type FetchDeleteMethod = FetchMethod;
declare type FetchGetMethod = FetchMethod;
declare interface IFectch {
  get: FetchGetMethod;
  post: FetchPostMethod;
  put: FetchPutMethod;
  head: FetchHeadMethod;
  delete: FetchDeleteMethod;
}
