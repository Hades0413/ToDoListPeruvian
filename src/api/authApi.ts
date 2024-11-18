import axios from "axios";

// Define el URL base para tu API
const apiUrl = "https://truthful-growth-production.up.railway.app/api/user";

// Función para realizar la petición de login
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
export const register = async (userData: {
  nombre: string;
  apellido: string;
  dni: string;
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${apiUrl}/register`, userData);
    return response;
  } catch (error) {
    throw error;
  }
};
