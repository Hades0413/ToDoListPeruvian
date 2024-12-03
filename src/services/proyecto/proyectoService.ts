import {
  registrarProyecto,
  listarProyecto
} from "../../api/proyecto/proyectoApi";
import { Proyecto } from "../../types/Proyecto";
import { handleProyectoErrorResponse } from "./proyectoHelpers";

export class ProyectoService {
  async createProyecto(proyectoData: Proyecto) {
    try {
      const response = await registrarProyecto(proyectoData);
      return response.data;
    } catch (error) {
      console.error("Error al crear la proyecto en el servicio:", error);
      handleProyectoErrorResponse(error);
      throw error;
    }
  }

  // Método para listar los proyectos del usuario
  async getProyectos() {
    try {
      const proyectos = await listarProyecto();
      return proyectos;
    } catch (error) {
      console.error("Error al obtener los proyectos:", error);
      handleProyectoErrorResponse(error);
      throw error;
    }
  }
}





export default ProyectoService;
