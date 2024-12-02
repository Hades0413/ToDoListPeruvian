import axios from "axios";
import { Proyecto } from "../../types/Proyecto";

const apiUrl =
  "https://truthful-growth-production.up.railway.app/api/proyectos";

export const registrarProyecto = async (proyectoData: Proyecto) => {
  try {
    const response = await axios.post(`${apiUrl}/registrar`, proyectoData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.error("Error al registrar proyecto:", error);
    throw error;
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

    console.log("Proyectos listados:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error al listar proyectos:", error);
    throw error;
  }
};

