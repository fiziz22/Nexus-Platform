// src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true, // if you plan to use cookies for auth
});

export const loginUser = (data: { email: string; password: string; role: string }) =>
  api.post("/auth/login", data);

export const registerUser = (data: { name: string; email: string; password: string; role: string }) =>
  api.post("/auth/register", data);

export const updateUserProfile = (userId: string, updates: any, token: string) =>
  api.put(`/users/${userId}`, updates, {
    headers: { Authorization: `Bearer ${token}` },
  });

export default api;
