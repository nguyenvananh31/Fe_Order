import axios from "axios";
import localStorageUtils, { KeyStorage } from "../../utils/local-storage.utils";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  withCredentials :true,
});

instance.interceptors.request.use(
  (config) => {
    // Fetching token safely from localStorageUtils
    const token = localStorageUtils?.getObject(KeyStorage.AUTH)?.access_token;

    // If token exists, append it and the API key to the headers
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`, // Inject the token
        'Api_key': import.meta.env.VITE_API_KEY, // Inject API key from environment
      };
    }

    // Always return the config to proceed with the request
    return config;
  },
  (error) => Promise.reject(error) // Reject any error
);

export default instance;
