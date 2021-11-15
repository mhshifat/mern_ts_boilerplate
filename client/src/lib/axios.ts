import axios from "axios";
import { toast } from "react-toastify";

const { REACT_APP_API_URI } = process.env;

const http = axios.create({
  baseURL: `${REACT_APP_API_URI}/api/v1`,
  headers: {
    "content-Type": "application/json",
    Accept: "application/json"
  },
  withCredentials: true
});

http.interceptors.response.use(
  (config) => config,
  async (err) => {
    const originalRequest = err.config;
    const newEvent = new CustomEvent("errors", {
      detail: []
    });
    window.dispatchEvent(newEvent);
    if (err.response?.status === 401 && !originalRequest?.isRetry) {
      originalRequest.isRetry = true;
      try {
        await axios.get(`${process.env.REACT_APP_API_URI}/api/v1/auth`, {
          withCredentials: true
        });
        return http.request(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    } else if (err.response?.status === 401 || err.response?.status === 400) {
      toast.error(err?.response?.data?.error || err?.message);
      return Promise.reject(err);
    } else if (err.response?.status === 422) {
      const event = new CustomEvent("errors", {
        detail: err.response?.data?.errors
      });
      window.dispatchEvent(event);
      return Promise.reject(err);
    } else {
      return Promise.reject(err);
    }
  }
);

export default http;
