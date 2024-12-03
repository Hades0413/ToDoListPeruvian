import React from "react";
import { Tarea } from "../../../types/Tarea";
import {
  CloseIcon,
  Status,
  Description,
  Priority,
  TodayIcon,
  Edit,
  Delete,
} from "../../icons/sidebar";
import { formatDate } from "../../../utils/dateUtils";
import { getPriorityClass, getStatusClass } from "../../../utils/taskUtils";

interface TaskDetailsModalProps {
  tarea: Tarea;
  onClose: () => void;
}

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({
  tarea,
  onClose,
}) => {
  return (
    <div className="task-modal">
      <div className="task-modal-header">
        <h2 className="task-modal-title">{tarea.nombre}</h2>
        <button className="close-button" onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
      {/* 
      <div className="task-info">
        <Status className="task-info-icon" />
        <span className="task-info-label">ID</span>
        <div className="task-info-value">{tarea.idTarea}</div>
      </div> 
      */}

      <div className="task-info">
        <Description className="task-info-icon task-icon" />
        <span className="task-info-label">Descripción</span>
        <div className="task-info-value">{tarea.descripcion}</div>
      </div>

      <div className="task-info">
        <Priority className="task-info-icon task-icon" />
        <span className="task-info-label">Prioridad</span>
        <div className={`task-info-value ${getPriorityClass(tarea.prioridad)}`}>
          {tarea.prioridad === 1
            ? "Alta"
            : tarea.prioridad === 2
            ? "Media"
            : "Baja"}
        </div>
      </div>

      <div className="task-info">
        <Status className="task-info-icon task-icon" />
        <span className="task-info-label">Estado</span>
        <div className={`task-info-value ${getStatusClass(tarea.estado)}`}>
          {tarea.estado === 1
            ? "Pendiente"
            : tarea.estado === 2
            ? "En progreso"
            : "Completada"}
        </div>
      </div>
      <div className="task-info">
        <TodayIcon className="task-info-icon  task-icon" />
        <span className="task-info-label">Fecha de creación</span>
        <div className="task-info-value">{formatDate(tarea.fechaCreacion)}</div>
      </div>

      <div className="task-info">
        <TodayIcon className="task-info-icon task-icon" />
        <span className="task-info-label">Fecha de vencimiento</span>
        <div className="task-info-value">
          {formatDate(tarea.fechaVencimiento)}
        </div>
      </div>

      <div className="task-modal-actions">
        <button className="task-action-button update-button">
          <Edit />
          Editar
        </button>
        <button className="task-action-button delete-button">
          <Delete />
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default TaskDetailsModal;
