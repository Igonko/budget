import axios from "axios";
import { getTokenFromLocalStorage } from "../helpers/localstorage.helper";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const instance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage() || ""}`,
  },
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("Server responded with an error:", error.response.data);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up the request:", error.message);
    }
    return Promise.reject(error);
  }
);
