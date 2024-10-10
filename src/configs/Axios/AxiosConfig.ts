import axios from "axios";
import localStorageUtils, { KeyStorage } from "../../utils/local-storage.utils";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",

});

instance.interceptors.request.use(
  (config) => {
    const token = localStorageUtils.getObject(KeyStorage.AUTH)?.access_token;
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
        'Api_key': import.meta.env.VITE_API_KEY,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;