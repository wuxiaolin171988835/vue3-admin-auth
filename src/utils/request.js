import axios from "axios";
import { getToken } from "./auth";
const service = axios.create({
  baseURL: "http://127.0.0.1:4523/m1/2746745-0-default"
});
service.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.token = token;
  }
  return config;
});
service.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(err)
);

export default service;
