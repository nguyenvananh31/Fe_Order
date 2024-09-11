import axios from "axios";
import localStorageUtils, { KeyStorage } from "../utils/local-storage.utils";
 // Đường dẫn đến utility lưu trữ

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorageUtils.getObject(KeyStorage.AUTH)?.token; // Hoặc cấu trúc dữ liệu phù hợp
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;

