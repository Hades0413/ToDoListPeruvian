import axios from "axios";
import { Proyecto } from "../../types/Proyecto";

const apiUrl =
  "https://todolistperuvianbackend-production.up.railway.app/api/proyectos";

// Función para registrar un proyecto
export const registrarProyecto = async (proyectoData: Proyecto) => {
  try {
    const response = await axios.post(`${apiUrl}/registrar`, proyectoData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error: any) {
    console.error("Error al registrar proyecto:", error);

    // Extrae el mensaje de error detallado del servidor
    const serverMessage = error.response?.data || "Error desconocido";

    // Valida si el error es por proyecto duplicado
    if (serverMessage.includes("Duplicate entry")) {
      throw new Error("Ya existe un proyecto con ese nombre.");
    }

    // Lanza cualquier otro error
    throw new Error(serverMessage);
  }
};

// Función para listar proyectos del usuario
export const listarProyecto = async () => {
  try {
    const userId = JSON.parse(localStorage.getItem("userId") || "null");

    if (!userId) {
      throw new Error("No se encontró el ID del usuario en el localStorage.");
    }

    const proyectoData = { Id: userId };

    const response = await axios.post(`${apiUrl}/user`, proyectoData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error al listar proyectos:", error);
    throw error;
  }
};

// Función para listar proyectos por id
export const obtenerProyectoPorId = async (id: number) => {
  try {
    const response = await axios.get(`/api/proyectos/${id}`);
    return response;
  } catch (error) {
    console.error("Error al obtener el proyecto:", error);
    throw error;
  }
};
