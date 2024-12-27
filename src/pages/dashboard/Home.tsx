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

interface Project {
  id: number;
  nombre: string;
}

export default function Home() {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [currentProjectId, setCurrentProjectId] = useState<number | undefined>(
    undefined
  );

  // Lista simulada de proyectos
  const projects: Project[] = [
    { id: 1, nombre: "Proyecto A" },
    { id: 2, nombre: "Proyecto B" },
    { id: 3, nombre: "Proyecto C" },
  ];

  // Función para manejar el envío del formulario de tarea
  const handleTaskSubmit = (taskData: TaskData) => {
    // Validar que los datos esenciales están presentes
    if (!taskData.nombre || !taskData.prioridad || !taskData.estado) {
      alert("Por favor, complete todos los campos requeridos.");
      return;
    }

    // Crear una nueva tarea
    const newTask: Task = {
      id: Date.now(), // Genera un ID único usando la fecha actual (en un entorno real esto lo gestionaría el backend)
      ...taskData,
      idProyecto: currentProjectId || taskData.idProyecto, // Asigna el idProyecto, si no hay proyecto actual, usa el idProyecto de la tarea
    };

    // Actualizar el estado de las tareas
    setTasks([...tasks, newTask]);

    // Cerrar el formulario
    setShowTaskForm(false);
  };

  // Función para manejar el marcado de tareas completadas
  const handleTaskComplete = (taskId: number) => {
    const taskToComplete = tasks.find((task) => task.id === taskId);
    if (taskToComplete) {
      setCompletedTasks([...completedTasks, taskToComplete]);
      setTasks(tasks.filter((task) => task.id !== taskId));
    }
  };

  // Filtrar las tareas según el proyecto seleccionado
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
            <button className="header-button">
              <Icons.FiltersIcon className="icon" />
              <span>Vista</span>
            </button>
            <button className="header-button">
              <Icons.MenuIcon className="icon" />
              <span>Ordenar</span>
            </button>
          </div>
        </header>

        {/* Selector de proyectos */}
        <div className="project-selector">
          <select
            onChange={(e) => setCurrentProjectId(Number(e.target.value))}
            value={currentProjectId || ""}
          >
            <option value="">Selecciona un proyecto</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="home-content">
          {filteredTasks.map((task) => (
            <div key={task.id} className="task-item">
              <button
                className="task-checkbox"
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
              projectId={currentProjectId} // Pasamos el projectId como prop
            />
          ) : (
            <button
              onClick={() => setShowTaskForm(true)}
              className="add-task-button"
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
