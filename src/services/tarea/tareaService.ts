import { registrarTarea,obtenerTareasPorProyecto } from "../../api/tarea/tareaApi";
import { Tarea } from "../../types/Tarea";
import { handleTareaErrorResponse } from "./tareaHelpers";

class TareaService {
  async createTarea(tareaData: Tarea) {
    try {
      const response = await registrarTarea(tareaData);
      return response.data;
    } catch (error) {
      console.error("Error al crear la tarea en el servicio:", error);
      handleTareaErrorResponse(error);
      throw error;
    }
  }

  async getTareasPorProyecto(idProyecto: number) {
    try {
      const tareas = await obtenerTareasPorProyecto(idProyecto);
      return tareas;
    } catch (error) {
      console.error(
        `Error al obtener las tareas del proyecto ${idProyecto}:`,
        error
      );
      throw error;
    }
  }
}

export default TareaService;
