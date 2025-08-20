import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API,
  withCredentials: false, // ✅ for cookies if used
});

export default api;
