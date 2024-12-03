import React from "react";
import { Tarea } from "../../types/Tarea";

interface FormsTareasProps {
  tarea: Tarea;
}

const FormsTareas: React.FC<FormsTareasProps> = ({ tarea }) => {
  const formatDate = (dateString?: string) => {
    return dateString ? new Date(dateString).toLocaleDateString() : "No especificada";
  };

  return (
    <div className="task-box">
      <h2>{tarea.nombre}</h2>
      <h2>{tarea.idTarea}</h2>
      <p><strong>Descripción:</strong> {tarea.descripcion}</p>
      <p><strong>Prioridad:</strong> {tarea.prioridad}</p>
      <p><strong>Estado:</strong> {tarea.estado}</p>
      <p>
        <strong>Fecha de vencimiento:</strong> {formatDate(tarea.fechaVencimiento)}
      </p>
      <p>
        <strong>Fecha de creación:</strong> {formatDate(tarea.fechaCreacion)}
      </p>
    </div>
  );
};

export default FormsTareas;
