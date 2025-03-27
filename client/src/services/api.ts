import axios from "axios";
import { User, LoginResponse, UsersResponse } from "@/lib/types";

const API_BASE_URL = "https://reqres.in/api";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add authentication token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post("/login", { email, password });
    return response.data;
  } catch (error) {
    throw new Error("Invalid email or password");
  }
};

// User operations
export const getUsers = async (page: number = 1): Promise<UsersResponse> => {
  try {
    const response = await api.get(`/users?page=${page}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
};

export const updateUser = async (id: number, userData: Partial<User>): Promise<User> => {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update user");
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  try {
    await api.delete(`/users/${id}`);
  } catch (error) {
    throw new Error("Failed to delete user");
  }
};
