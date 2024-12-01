import { registrarTarea } from "../../api/tarea/tareaApi";
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

}

export default TareaService;
