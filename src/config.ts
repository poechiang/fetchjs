const configData: Record<string, FetchConfig> = {
  default: {
    domain: "http://localhost",
    port: 80,
    path: "",
  },
};

export const config = (
  key: string,
  options?: FetchConfig
): Partial<FetchConfig> => {
  if (!!options) {
    const data = configData[key];
    if (typeof options === "string") {
      return { [options]: data[options] };
    } else {
      configData[key] = { ...data, ...options };
    }
  }

  return { ...configData[key] };
};

export const update = (key: string, options: FetchConfig) => {
  const data = configData[key];
  if (data) {
    Object.entries(options || {}).forEach(([key, value]) => {
      data[key as keyof FetchConfig] = value;
    });
  }
};
