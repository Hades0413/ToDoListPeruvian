// Archivo: TaskDetailsModal.tsx
import React, { useState } from "react";
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
import Swal from "sweetalert2";
import TareaService from "../../../services/tarea/tareaService"; // Asegúrate de que esta ruta sea correcta
import TareaEditForm from "../TareaEditForm";

interface TaskDetailsModalProps {
  tarea: Tarea;
  onClose: () => void;
  onEdit: (tarea: Tarea) => void; // Añadir la función onEdit como prop
}

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({
  tarea,
  onClose,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async (id: number) => {
    try {
      const tareaService = new TareaService();
      await tareaService.deleteTarea(id);
      Swal.fire("Eliminada", "La tarea ha sido eliminada.", "success");
      onClose();
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
      Swal.fire("Error", "Hubo un problema al eliminar la tarea.", "error");
    }
  };

  if (isEditing) {
    return (
      <TareaEditForm
        onClose={() => setIsEditing(false)}
        tareaId={tarea.idTarea ?? 0}
        onSave={(updatedTask) => {
          setIsEditing(false);
          onEdit(updatedTask);
        }}
      />
    );
  }

  const handleEdit = () => {
    setIsEditing(true);
    onEdit(tarea);  // Aquí pasas la tarea completa
  };
  

  return (
    <div className="task-modal">
      <div className="task-modal-header">
        <h2 className="task-modal-title">{tarea.nombre}</h2>
        <button className="close-button" onClick={onClose}>
          <CloseIcon />
        </button>
      </div>

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
            ? "Baja"
            : tarea.prioridad === 2
            ? "Media"
            : "Alta"}
        </div>
      </div>

      <div className="task-info">
        <Status className="task-info-icon task-icon" />
        <span className="task-info-label">Estado</span>
        <div className={`task-info-value ${getStatusClass(tarea.estado)}`}>
          {tarea.estado === 1
            ? "Pendiente"
            : tarea.estado === 2
            ? "Inactivo"
            : "Activo"}
        </div>
      </div>

      <div className="task-info">
        <TodayIcon className="task-info-icon task-icon" />
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
        <button
          className="task-action-button update-button"
          onClick={handleEdit}
        >
          <Edit />
          Editar
        </button>

        <button
          className="task-action-button delete-button"
          onClick={() => {
            const id = tarea.idTarea ?? 0;
            Swal.fire({
              title: `¿Estás seguro de eliminar la tarea "${tarea.nombre}"?`,
              text: `ID: ${id}`,
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Sí, eliminar",
              cancelButtonText: "No, cancelar",
            }).then((result) => {
              if (result.isConfirmed && id !== 0) {
                handleDelete(id);
              }
            });
          }}
        >
          <Delete />
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default TaskDetailsModal;
