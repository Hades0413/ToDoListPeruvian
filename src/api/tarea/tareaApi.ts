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



export const obtenerTareasPorProyecto = async (idProyecto: number) => {
  try {
    const response = await axios.post(`${apiUrl}/proyecto`, { idProyecto }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log("Tareas listadas:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener las tareas del proyecto ${idProyecto}:`, error);
    throw error;
  }
};

