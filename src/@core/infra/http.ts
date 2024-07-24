import axios from "axios";
import * as AxiosLogger from "axios-logger";
import { useToast } from "@chakra-ui/react";
import logger from "@/utils/logger";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 120000,
  timeoutErrorMessage: "Connection Timeout",
});

AxiosLogger.setGlobalConfig({
  prefixText: "ARTIS",
  dateFormat: "HH:MM:ss",
  status: true,
  data: false,
  headers: false,
  logger: logger.info.bind(this),
  statusText: true,
});
http.interceptors.request.use(
  function (config) {
    AxiosLogger.requestLogger(config) as any;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
http.interceptors.response.use(AxiosLogger.responseLogger, (err) => {
  if (err?.response) {
    const { method } = err?.config;
    const { status, data } = err?.response;

    if (status >= 400 && status <= 499) {
      logger.warn(
        `[Response] ${method?.toUpperCase()} ${
          err.response.config.url
        } ${status} - Response Body: ${JSON.stringify(data)}`
      );
    } else {
      logger.error(
        `[Response] ${method?.toUpperCase()} ${
          err.response.config.url
        } ${status} - Response Body: ${JSON.stringify(data)}`
      );
    }
  } else {
    logger.error(err.stack);
  }

  return Promise.reject(err);
});
export default http;
