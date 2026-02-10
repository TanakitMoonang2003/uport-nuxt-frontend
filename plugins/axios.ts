import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  // Browser always uses localhost (client-side requests)
  // Environment variable can override for SSR if needed
  const apiBaseURL = config.public.apiBase || process.env.NUXT_PUBLIC_API_BASE || "http://localhost:3001/api";

  // ✅ Remove trailing slashes to prevent double slash in URLs
  const cleanBaseURL = apiBaseURL.replace(/\/+$/, '');

  console.log('🔧 API Base URL:', cleanBaseURL);

  const api = axios.create({
    baseURL: cleanBaseURL,
    withCredentials: true,
  });

  // ใช้ InternalAxiosRequestConfig แทน
  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    console.log('🔍 Axios Request Interceptor Triggered!');
    console.log('🔍 Method:', config.method?.toUpperCase());
    console.log('🔍 URL:', config.url);
    console.log('🔍 BaseURL:', config.baseURL);
    console.log('🔍 Full URL:', `${config.baseURL}${config.url}`);
    console.log('🔍 Headers:', config.headers);
    console.log('🔍 Data:', config.data);

    const token = useCookie("token").value;
    if (token) {
      // ตรวจว่ามี headers ก่อน
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🔍 Added Authorization header');
    } else {
      console.log('🔍 No token found');
    }
    return config;
  });

  // Add response interceptor for debugging
  api.interceptors.response.use(
    (response) => {
      console.log('✅ Axios Response:', response.status, response.data);
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
