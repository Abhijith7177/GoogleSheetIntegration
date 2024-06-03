import axios from "axios";
import Cookies from "js-cookie";

export const Axios = axios.create({
  baseURL: "http://localhost:9000/api/",
  withCredentials: true,
});

Axios.interceptors.request.use(
  config => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
