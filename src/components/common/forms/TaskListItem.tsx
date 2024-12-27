import React from "react";
import { Tarea } from "../../../types/Tarea";
import { TodayIcon, Edit, Delete } from "../../icons/sidebar";
import { formatDate } from "../../../utils/dateUtils";
import { Clock } from "lucide-react";

interface TaskListItemProps {
  tarea: Tarea;
  onShowDetails: () => void;
}

const TaskListItem: React.FC<TaskListItemProps> = ({
  tarea,
  onShowDetails,
}) => {
  return (
    <div className="task-list-item" onClick={onShowDetails}>
      <div className="task-list-header">
        <div className="task-list-name">{tarea.nombre}</div>
        <div className="task-list-actions">
          <button
            className="task-action-button update-button"
            aria-label="Edit"
          >
            <Edit />
          </button>
          <button
            className="task-action-button delete-button"
            aria-label="Delete"
          >
            <Delete />
          </button>
        </div>
      </div>
      <div className="task-list-dates">
        <span className="task-list-date">
          <TodayIcon className="task-info-icon task-icon" />
          {formatDate(tarea.fechaCreacion)}
        </span>
        <span className="task-list-date">
          <Clock className="task-info-icon task-icon" />
          {formatDate(tarea.fechaVencimiento)}
        </span>
      </div>
    </div>
  );
};

export default TaskListItem;
