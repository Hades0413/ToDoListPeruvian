import axios from "axios";
import { User } from "../../types/User";

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

    if (response.status === 200) {
      const searchData = loginRequest.email ? { email: loginRequest.email } : { username: loginRequest.username };
      const userResponse = await axios.post(`${apiUrl}/buscar`, searchData);

      const userData = userResponse.data;
      localStorage.setItem("currentUser", JSON.stringify(userData));

      localStorage.setItem("userId", JSON.stringify(userData.id));

      return response;
    }

  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error al intentar el login o la búsqueda:", error.response?.data || error.message);
    } else {
      console.error("Error desconocido:", error);
    }
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
