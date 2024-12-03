import React from "react";
import { Status } from "../../icons/sidebar";

const NoTasksMessage: React.FC = () => {
  return (
    <div className="no-tasks-message">
      <Status className="no-tasks-icon" />
      <p>No se encontraron tareas</p>
    </div>
  );
};

export default NoTasksMessage;
