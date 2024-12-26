import axios from "axios";
import {
  registrarTarea,
  obtenerTareaPorId,
  obtenerTareasPorProyecto,
  editarTarea,
  eliminarTarea,
} from "../../api/tarea/tareaApi";

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

  // Obtener tarea por ID
  async getTareaPorId(id: number) {
    try {
      const tarea = await obtenerTareaPorId(id); // Llamamos a la función para obtener la tarea por ID
      return tarea;
    } catch (error) {
      console.error(`Error al obtener la tarea con ID ${id}:`, error);
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

  // Editar tarea
  async updateTarea(id: number, tareaData: Tarea) {
    try {
      const response = await editarTarea(id, tareaData);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar la tarea con ID ${id}:`, error);
      handleTareaErrorResponse(error);
      throw error;
    }
  }

  // Eliminar tarea
  async deleteTarea(id: number) {
    try {
      const response = await eliminarTarea(id);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          `Error al eliminar la tarea con ID ${id}:`,
          error.response?.data || error.message
        );
      } else {
        console.error(
          `Error desconocido al eliminar la tarea con ID ${id}:`,
          error
        );
      }
      handleTareaErrorResponse(error);
      throw error;
    }
  }
}

export default TareaService;
