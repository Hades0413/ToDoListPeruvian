import {
  registrarProyecto,
  listarProyecto,
} from "../../api/proyecto/proyectoApi";
import { Proyecto } from "../../types/Proyecto";
import { handleProyectoErrorResponse } from "./proyectoHelpers";

export class ProyectoService {
  async createProyecto(proyectoData: Proyecto) {
    try {
      const response = await registrarProyecto(proyectoData);
      return response.data;
    } catch (error) {
      console.error("Error al crear el proyecto en el servicio:", error);
      const errorMessage = handleProyectoErrorResponse(error); // Captura el mensaje
      console.error("Mensaje final del error:", errorMessage); // Registra el mensaje en consola
      throw new Error(errorMessage); // Puedes lanzarlo si necesitas manejarlo en otro nivel
    }
  }

  // Método para listar los proyectos del usuario
  async getProyectos() {
    try {
      const proyectos = await listarProyecto();
      return proyectos;
    } catch (error) {
      console.error("Error al obtener los proyectos:", error);
      const errorMessage = handleProyectoErrorResponse(error); // Captura el mensaje
      console.error("Mensaje final del error:", errorMessage); // Registra el mensaje en consola
      throw new Error(errorMessage); // Opcional
    }
  }
}

export default ProyectoService;
