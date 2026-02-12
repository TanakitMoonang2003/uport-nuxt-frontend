import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  // Use apiBase from runtime config as the source of truth
  const apiBaseURL = config.public.apiBase;

  // ✅ Remove trailing slashes to prevent double slash in URLs
  const cleanBaseURL = apiBaseURL.replace(/\/+$/, '');

  // ✅ Ensure the base URL always points to the /api prefix
  const finalBaseURL = cleanBaseURL.endsWith('/api') ? cleanBaseURL : `${cleanBaseURL}/api`;



  const api = axios.create({
    baseURL: finalBaseURL,
    withCredentials: true,
  });

  // ใช้ InternalAxiosRequestConfig แทน
  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {

    const token = useCookie("token").value;
    if (token) {
      // ตรวจว่ามี headers ก่อน
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
   
    } else {

    }
    return config;
  });

  // Add response interceptor for debugging
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.error('❌ Axios Error:', error.message, error.response?.data);
      return Promise.reject(error);
    }
  );

  return {
    provide: {
      api,
    },
  };
});
