import axios from "axios";
import { User } from "../types/User";

// URL base para tu API
const apiUrl = "https://truthful-growth-production.up.railway.app/api/user";

// Función para Login
export const login = async (loginRequest: {
  email: string | null;
  username: string | null;
  password: string;
}) => {
  try {
    const response = await axios.post(`${apiUrl}/login`, loginRequest);
    return response;
  } catch (error) {
    throw error;
  }
};

// Función para registrar un nuevo usuario
export const register = async (userData: User) => {
  // interfaz User
  try {
    const response = await axios.post(`${apiUrl}/register`, userData);
    return response;
  } catch (error) {
    throw error;
  }
};
