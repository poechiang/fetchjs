import { FetchConfig } from '../interface';
export * from './const';

// presets config data
const DEFAULT_CONFIG = {
  domain: 'http://localhost',
  port: 80,
  path: '',
} as FetchConfig;

// config data map, private, readonly
const configDataMap: Map<string, FetchConfig> = new Map<string, FetchConfig>();

/**
 * write config data for key
 * @param key key name to read, write, update
 * @param value the value to write, update
 * @returns void
 */
const set = (key: string, value: FetchConfig) => {
  configDataMap.set(key, { ...DEFAULT_CONFIG, ...value });
};

/**
 * read config data for key
 * @param key key name to read, write, update
 * @param value the value to write, update
 * @returns return the fetch config data if key exists, otherwise return undefined
 */
const get = (key: string): FetchConfig | undefined => {
  return configDataMap.get(key);
};

/**
 * update config data for key
 * @param key key name to read, write, update
 * @param value the value to write, update
 * @returns return the updated fetch config data if key exists, otherwise return undefined
 */
const update = (key: string, value: FetchConfig): FetchConfig | undefined => {
  const data = configDataMap.get(key) ?? DEFAULT_CONFIG;
  set(key, { ...data, ...value });
  return get(key);
};

export default { get, set, update };
