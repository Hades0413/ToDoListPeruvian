import axios from 'axios';
import { Tarea } from "../../types/Tarea";

const apiUrl = "https://truthful-growth-production.up.railway.app/api/tareas";

export const registrarTarea = async (tareaData: Tarea) => {
  try {
    const response = await axios.post(`${apiUrl}/registrar`, tareaData, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return response;
  } catch (error) {
    console.error("Error al registrar tarea:", error);
    throw error;
  }
};
