import axios from "axios";
import { Tarea } from "../../types/Tarea";

const apiUrl =
  "https://todolistperuvianbackend-production.up.railway.app/api/tareas";

export const registrarTarea = async (tareaData: Tarea) => {
  try {
    const response = await axios.post(`${apiUrl}/registrar`, tareaData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.error("Error al registrar tarea:", error);
    throw error;
  }
};

// Obtener tarea por ID
export const obtenerTareaPorId = async (id: number) => {
  try {
    const response = await axios.get(`${apiUrl}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la tarea con ID ${id}:`, error);
    throw error;
  }
};

export const obtenerTareasPorProyecto = async (idProyecto: number) => {
  try {
    const response = await axios.post(
      `${apiUrl}/proyecto`,
      { idProyecto },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error al obtener las tareas del proyecto ${idProyecto}:`,
      error
    );
    throw error;
  }
};

// Editar tarea existente
export const editarTarea = async (id: number, tareaData: Tarea) => {
  try {
    const response = await axios.put(`${apiUrl}/${id}`, tareaData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error(`Error al editar la tarea con ID ${id}:`, error);
    throw error;
  }
};

// Eliminar tarea existente
export const eliminarTarea = async (id: number) => {
  try {
    const response = await axios.delete(`${apiUrl}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error(`Error al eliminar la tarea con ID ${id}:`, error);
    throw error;
  }
};
