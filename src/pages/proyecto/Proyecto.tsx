import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TareaService from "../../services/tarea/tareaService";
import { Tarea } from "../../types/Tarea";
import FormsTareas from "../../components/common/FormsTareas";
import NoTasksMessage from "../../components/common/forms/NoTasksMessage";

const Proyecto: React.FC = () => {
  const { idProyecto } = useParams<{ idProyecto: string }>();
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const tareaService = new TareaService();

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

  return (
    <div className="proyecto-container">
      <h1>Proyecto {idProyecto} </h1>
      <div className="tasks-container">
        {tareas.length > 0 ? (
          tareas.map((tarea) => (
            <FormsTareas key={tarea.idTarea} tarea={tarea} />
          ))
        ) : (
          <NoTasksMessage />
        )}
      </div>
    </div>
  );
};

export default Proyecto;
