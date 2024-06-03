export const prepareRequestParams = (params) => {
    const mapped =  Object.entries(params)
      .filter(([key, value]) => value !== "" && value !== 0)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");
    return mapped ? `${mapped}` : "";
  };