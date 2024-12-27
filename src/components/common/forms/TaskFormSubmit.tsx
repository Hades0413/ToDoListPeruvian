interface TaskFormSubmitProps {
  onCancel: () => void;
}

export function TaskFormSubmit({ onCancel }: TaskFormSubmitProps) {
  return (
    <div className="task-form-submit">
      <button
        type="button"
        className="cancel-button"
        aria-label="Cancelar"
        onClick={onCancel}
      >
        Cancelar
      </button>
      <button type="submit" className="submit-button" aria-label="Añadir tarea">
        Añadir tarea
      </button>
    </div>
  );
}
