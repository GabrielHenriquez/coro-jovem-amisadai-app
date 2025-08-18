import { Log } from "@services/Logger";
import axios from "axios";

const API = axios.create({
  baseURL: "/",
  timeout: 5000,
});

API.interceptors.request.use(async (config) => {
  Log.info(`[API] REQUEST EM: ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    Log.error("[API ERROR]:", error);
    return Promise.reject(error);
  }
);

export default API;
