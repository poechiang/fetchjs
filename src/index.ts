import { generateFetchBuilder } from './generateFetchBuilder';
import { FetchMethods, IFectch } from './interface';

export * as config from './config';

const configCache: Record<string, IFectch> = {};

export const withFetcher = (ckey?: string): IFectch => {
  let configData = configCache[ckey || 'default'];
  if (!configData) {
    const fetchActionBuilder = generateFetchBuilder(configData);

    configData = ['get', 'post', 'put', 'delete', 'head'].reduce(
      (data, method) => ({
        ...data,
        [method]: fetchActionBuilder(method.toUpperCase() as FetchMethods),
      }),
      {} as IFectch
    );
    if (ckey && ckey !== 'default') {
      configCache[ckey] = configData;
    }
  }
  return configData;
};
