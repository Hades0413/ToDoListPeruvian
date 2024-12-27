import { useState } from "react";
import * as Icons from "../../components/icons/sidebar";
import TareaForm from "../../components/common/TareaForm";
import "../../styles/dashboard/Home.css";
import "../../styles/forms/task-form.css";
import "../../styles/forms/forms.css";

interface TaskData {
  idProyecto: number;
  nombre: string;
  descripcion: string;
  prioridad: number;
  estado: number;
  fechaVencimiento: string;
}

interface Task extends TaskData {
  id: number;
}

export default function Home() {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [currentProjectId] = useState<number | undefined>();

  const handleTaskComplete = (taskId: number) => {
    const taskToComplete = tasks.find((task) => task.id === taskId);
    if (taskToComplete) {
      setCompletedTasks([...completedTasks, taskToComplete]);
      setTasks(tasks.filter((task) => task.id !== taskId));
    }
  };

  const filteredTasks = tasks.filter((task) =>
    currentProjectId ? task.idProyecto === currentProjectId : true
  );

  return (
    <div className="home-container">
      <div className="home-content">
        <header className="home-header">
          <div className="header-left">
            <h1>Hoy</h1>
            <span className="task-count">{filteredTasks.length} tareas</span>
          </div>
          <div className="header-right">
            <button className="header-button" aria-label="Vista">
              <Icons.FiltersIcon className="icon" />
              <span>Vista</span>
            </button>
            <button className="header-button" aria-label="Ordenar">
              <Icons.MenuIcon className="icon" />
              <span>Ordenar</span>
            </button>
          </div>
        </header>

        <div className="home-content">
          {filteredTasks.map((task) => (
            <div key={task.id} className="task-item">
              <button
                className="task-checkbox"
                aria-label="handleTaskComplete"
                onClick={() => handleTaskComplete(task.id)}
              >
                <Icons.CheckIcon className="icon" />
              </button>
              <div className="task-text">
                <div>{task.nombre}</div>
                {task.descripcion && (
                  <div className="task-description">{task.descripcion}</div>
                )}
              </div>
            </div>
          ))}

          {showTaskForm ? (
            <TareaForm
              onClose={() => setShowTaskForm(false)}
              projectId={currentProjectId}
            />
          ) : (
            <button
              onClick={() => setShowTaskForm(true)}
              className="add-task-button"
              aria-label="Añadir tarea"
            >
              <Icons.PlusIcon className="icon" />
              Añadir tarea
            </button>
          )}
        </div>

        {completedTasks.length > 0 && (
          <div className="completed-tasks">
            <Icons.CheckIcon className="icon" />
            {completedTasks.length} tareas completadas
          </div>
        )}
      </div>
    </div>
  );
}
