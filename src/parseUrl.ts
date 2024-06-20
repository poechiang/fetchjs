import { FetchParams } from './interface';
import { pick } from './utils';

/** 解析URL */
export const parseUrl = (url: string, query?: FetchParams) => {
  const [path, queryStr = ''] = url.split('?');

  const querySegments = queryStr.split('&').reduce((o, s) => {
    const [k, v] = s.split('=');
    return v ? { ...o, [k]: v } : o;
  }, {});
  const queryObj = pick({ ...(query || {}), ...querySegments });

  const newQueryStr = Object.entries(queryObj)
    .map(([k, v]) => `${k}=${v}`)
    .join('&');

  return [path, newQueryStr].join('&');
};
