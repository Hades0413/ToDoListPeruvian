import axios from 'axios';
import { Tarea } from "../../types/Tarea";

const apiUrl = "http://localhost:8080/api/tareas";

export const registrarTarea = async (tareaData: Tarea) => {
  try {
    
    const response = await axios.post(`${apiUrl}/registrar`, tareaData, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return response;
  } catch (error) {
    throw error;
  }
};
