// import React, { useState } from 'react';
// import * as Icons from '../../components/icons/sidebar';
// import { NewTaskForm } from '../../components/common/forms/NewTaskForm';
// import '../../styles/dashboard/Home.css';
// import '../../styles/forms/task-form.css';

// // Definimos un tipo para los datos del formulario
// interface TaskData {
//   nombre_tg_tareas: string;
//   descripcion_tg_tareas: string;
//   id_tm_prioridad: number;
//   id_tm_estado: number;
//   fecha_vencimiento_tg_tareas: string;
//   id_tg_proyectos?: number;
// }

// // Tipo para una tarea completa
// interface Task extends TaskData {
//   id: number;
// }

// export default function Home() {
//   const [showTaskForm, setShowTaskForm] = useState(false);
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
//   const [currentProjectId, setCurrentProjectId] = useState<number | undefined>();

//   const handleTaskSubmit = (taskData: TaskData) => {
//     const newTask: Task = {
//       id: Date.now(), // Genera un ID único
//       ...taskData,
//       id_tg_proyectos: currentProjectId,
//     };
//     setTasks([...tasks, newTask]);
//     setShowTaskForm(false);
//   };

//   const handleTaskComplete = (taskId: number) => {
//     const taskToComplete = tasks.find((task) => task.id === taskId);
//     if (taskToComplete) {
//       setCompletedTasks([...completedTasks, taskToComplete]);
//       setTasks(tasks.filter((task) => task.id !== taskId));
//     }
//   };

//   const filteredTasks = tasks.filter((task) =>
//     currentProjectId ? task.id_tg_proyectos === currentProjectId : true
//   );

//   return (
//     <div className="home-container">
//       <div className="home-content">
//         <header className="home-header">
//           <div className="header-left">
//             <h1>Hoy</h1>
//             <span className="task-count">{filteredTasks.length} tareas</span>
//           </div>
//           <div className="header-right">
//             <button className="header-button">
//               <Icons.FiltersIcon className="icon" />
//               <span>Vista</span>
//             </button>
//             <button className="header-button">
//               <Icons.MenuIcon className="icon" />
//               <span>Ordenar</span>
//             </button>
//           </div>
//         </header>

//         <div className="home-content">
//           {filteredTasks.map((task) => (
//             <div key={task.id} className="task-item">
//               <button
//                 className="task-checkbox"
//                 onClick={() => handleTaskComplete(task.id)}
//               >
//                 <Icons.CheckIcon className="icon" />
//               </button>
//               <div className="task-text">
//                 <div>{task.nombre_tg_tareas}</div>
//                 {task.descripcion_tg_tareas && (
//                   <div className="task-description">
//                     {task.descripcion_tg_tareas}
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}

//           {showTaskForm ? (
//             <NewTaskForm
//               projectId={currentProjectId}
//               onSubmit={handleTaskSubmit}
//               onCancel={() => setShowTaskForm(false)}
//             />
//           ) : (
//             <button
//               onClick={() => setShowTaskForm(true)}
//               className="add-task-button"
//             >
//               <Icons.PlusIcon className="icon" />
//               Añadir tarea
//             </button>
//           )}
//         </div>

//         {completedTasks.length > 0 && (
//           <div className="completed-tasks">
//             <Icons.CheckIcon className="icon" />
//             {completedTasks.length} tareas completadas
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';
import * as Icons from '../../components/icons/sidebar';
import TareaForm from '../../components/common/TareaForm';
import '../../styles/dashboard/Home.css';
import '../../styles/forms/task-form.css';
import '../../styles/forms/forms.css';

// Define types for task data
interface TaskData {
  idProyecto: number;
  nombre: string;
  descripcion: string;
  prioridad: number;
  estado: number;
  fechaVencimiento: string;
}

// Type for a complete task
interface Task extends TaskData {
  id: number;
}

export default function Home() {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [currentProjectId, setCurrentProjectId] = useState<number | undefined>();

  const handleTaskSubmit = (taskData: TaskData) => {
    const newTask: Task = {
      id: Date.now(), // Generate a unique ID
      ...taskData,
      idProyecto: currentProjectId || taskData.idProyecto,
    };
    setTasks([...tasks, newTask]);
    setShowTaskForm(false);
  };

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
                  <div className="task-description">
                    {task.descripcion}
                  </div>
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

