import { isUndefined, pickBy } from "lodash";
import { FetchParams } from "./interface";

/**
 * 生成完整的url
 * @param url 请求url
 * @param query 请求参数
 * @returns 生成的新url
 * @example
 *  const url="api/v1/users?uid=1";
 *  const query = {sortBy='createTime',sortOrder='DESC'};
 *  const fullUrl = parseFullUrl(url,query);
 *  console.log(fullUrl); // out:'api/v1/users?uid=1&sortBy=createTime&sortOrder=DESC"
 */
export const parseUrl = (url: string, params?: FetchParams) => {
  const [path, query = ""] = url.split("?");

  const queryObj = pickBy(
    {
      ...(params || {}),
      ...query.split("&").reduce((o, s) => {
        const [k, v] = s.split("=");
        return v ? { ...o, [k]: v } : o;
      }, {}),
    },
    (v: any) => !isUndefined(v) && v !== null && v.length !== 0
  );

  const queryStr = Object.entries(queryObj)
    .map(([k, v]) => `${k}=${v}`)
    .join("&");

  if (queryStr) {
    return `${path}?${queryStr}`;
  } else {
    return path;
  }
};
