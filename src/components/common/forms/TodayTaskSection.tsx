import React, { useState, useEffect } from "react";
import { TodayIcon, ArrowIcon } from "../../icons/sidebar";
import TareaService from "../../../services/tarea/tareaService";
import ProyectoService from "../../../services/proyecto/proyectoService";
import { Tarea } from "../../../types/Tarea";
import TaskListItem from "../../common/forms/TaskListItem";
import NoTasksMessage from "../../common/forms/NoTasksMessage";

export const TodayTasksSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [todayTasks, setTodayTasks] = useState<Tarea[]>([]);
  const [proyectos, setProyectos] = useState<any[]>([]);
  const tareaService = new TareaService();
  const proyectoService = new ProyectoService();

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const proyectosList = await proyectoService.getProyectos();
        setProyectos(proyectosList);
      } catch (error) {
        console.error("Error al obtener los proyectos:", error);
      }
    };

    fetchProyectos();
  }, []);

  useEffect(() => {
    const fetchTodayTasks = async () => {
      try {
        let allTasks: Tarea[] = [];
        for (let proyecto of proyectos) {
          const response = await tareaService.getTareasPorProyecto(proyecto.id);
          if (response) {
            const today = new Date().toISOString().split("T")[0];
            const tasksForToday = response.filter(
              (task: Tarea) =>
                task.fechaVencimiento &&
                task.fechaVencimiento.split("T")[0] === today
            );
            allTasks = [...allTasks, ...tasksForToday];
          }
        }
        setTodayTasks(allTasks);
      } catch (error) {
        console.error("Error al obtener las tareas de hoy:", error);
        setTodayTasks([]);
      }
    };

    if (isOpen && proyectos.length > 0) {
      fetchTodayTasks();
    }
  }, [isOpen, proyectos]);

  return (
    <div className="today-tasks-section">
      <div className="nav-item" onClick={() => setIsOpen(!isOpen)}>
        <TodayIcon className="icon" />
        Hoy
        <span className="count">{todayTasks.length}</span>
        <ArrowIcon className={`arrow-icon ${isOpen ? "open" : ""}`} />
      </div>

      {isOpen && (
        <div className="today-tasks-dropdown">
          {todayTasks.length > 0 ? (
            todayTasks.map((tarea) => (
              <TaskListItem
                key={tarea.idTarea}
                tarea={tarea}
                onShowDetails={() =>
                  console.log("Mostrar detalles de la tarea", tarea)
                }
              />
            ))
          ) : (
            <NoTasksMessage />
          )}
        </div>
      )}
    </div>
  );
};
