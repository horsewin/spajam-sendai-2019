import config from "../constants/config";

export const setGetUrl = (path, param) => {
  if (param) {
    return `${config.api.baseUrl}${path}?${param}`;
  }

  return `${config.api.baseUrl}${path}`;
};

export const setPostUrl = path => {
  return `${config.api.baseUrl}${path}`;
};
