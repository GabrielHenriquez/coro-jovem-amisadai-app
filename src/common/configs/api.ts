import axios from "axios";

export const API = axios.create({
  baseURL: "/",
  timeout: 5000,
});

API.interceptors.request.use(async (config) => {
  console.log(
    `🚀 [API] REQUEST EM: ${config.method?.toUpperCase()} ${config.url}`
  );
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("❌ [API ERROR]:", error);
    return Promise.reject(error);
  }
);
