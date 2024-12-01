import React from 'react';

interface TaskFormSubmitProps {
  onCancel: () => void;
}

export function TaskFormSubmit({ onCancel }: TaskFormSubmitProps) {
  return (
    <div className="task-form-submit">
      <button type="button" className="cancel-button" onClick={onCancel}>
        Cancelar
      </button>
      <button type="submit" className="submit-button">
        Añadir tarea
      </button>
    </div>
  );
}