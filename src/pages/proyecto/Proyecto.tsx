import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import TareaService from "../../services/tarea/tareaService";
import { Tarea } from "../../types/Tarea";
import FormsTareas from "../../components/common/FormsTareas";
import NoTasksMessage from "../../components/common/forms/NoTasksMessage";

const Proyecto: React.FC = () => {
  const { idProyecto } = useParams<{ idProyecto: string }>();
  const location = useLocation();
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const tareaService = new TareaService();

  const nombreProyecto = location.state?.nombreProyecto || "Sin nombre";

  useEffect(() => {
    const fetchTareas = async () => {
      if (idProyecto) {
        try {
          const tareasData = await tareaService.getTareasPorProyecto(
            parseInt(idProyecto, 10)
          );
          setTareas(tareasData);
        } catch (error) {
          console.error("Error al obtener las tareas:", error);
          setTareas([]);
        }
      }
    };

    fetchTareas();
  }, [idProyecto]);

  // Función para manejar la edición de una tarea
  const handleEditTarea = (updatedTarea: Tarea) => {
    // Aquí puedes actualizar el estado de las tareas o hacer una llamada al backend
    setTareas((prevTareas) =>
      prevTareas.map((tarea) =>
        tarea.idTarea === updatedTarea.idTarea ? updatedTarea : tarea
      )
    );
  };

  return (
    <div className="proyecto-container">
      <h1>{nombreProyecto}</h1>
      <div className="tasks-container">
        {tareas.length > 0 ? (
          tareas.map((tarea) => (
            <FormsTareas
              key={tarea.idTarea}
              tarea={tarea}
              onEdit={handleEditTarea}
            />
          ))
        ) : (
          <NoTasksMessage />
        )}
      </div>
    </div>
  );
};

export default Proyecto;
