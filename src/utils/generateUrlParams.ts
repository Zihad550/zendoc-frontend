const generateUrlParams = (args: Record<string, unknown> | undefined) => {
  const params = new URLSearchParams();
  if (!args || !Object.keys(args).length) return params;
  Object.entries(args).forEach(([key, value]) => {
    if (value) {
      params.append(key, String(value));
    }
  });
  return params;
};

export default generateUrlParams;
