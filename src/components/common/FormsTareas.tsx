import React, { useState } from "react";
import { Tarea } from "../../types/Tarea";
import "../../styles/forms/task-list.css";
import TaskListItem from "../common/forms/TaskListItem";
import TaskDetailsModal from "../common/forms/TaskDetailsModal";

interface FormsTareasProps {
  tarea: Tarea;
  onEdit: (tarea: Tarea) => void; // Función para actualizar la tarea en el padre
}

const FormsTareas: React.FC<FormsTareasProps> = ({ tarea, onEdit }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <TaskListItem tarea={tarea} onShowDetails={() => setShowDetails(true)} />
      {showDetails && (
        <TaskDetailsModal
          tarea={tarea}
          onClose={() => setShowDetails(false)}
          onEdit={onEdit} // Pasamos la función onEdit
        />
      )}
    </>
  );
};

export default FormsTareas;
