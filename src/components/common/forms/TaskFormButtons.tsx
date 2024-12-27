import * as Icons from "../../icons/sidebar";

interface TaskFormButtonsProps {
  onPriorityClick: () => void;
  onStateClick: () => void;
  onDateClick: () => void;
  currentPriority: number;
  currentState: number;
  currentDate: string;
}

export function TaskFormButtons({
  onPriorityClick,
  onStateClick,
  onDateClick,
  currentPriority,
  currentState,
  currentDate,
}: TaskFormButtonsProps) {
  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 3:
        return "#ff4b2b";
      case 2:
        return "#ffb13d";
      default:
        return "#808080";
    }
  };

  const getStateColor = (state: number) => {
    switch (state) {
      case 3:
        return "#4CAF50";
      case 2:
        return "#FFC107";
      default:
        return "#808080";
    }
  };

  const formatDate = (date: string) => {
    const today = new Date().toISOString().split("T")[0];
    if (date === today) return "Hoy";
    return new Date(date).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div className="task-form-buttons">
      <button
        type="button"
        className="task-action-button"
        aria-label="onDateClick"
        onClick={onDateClick}
      >
        <Icons.TodayIcon className="icon" />
        {formatDate(currentDate)}
      </button>
      <button
        type="button"
        className="task-action-button"
        aria-label="Prioridad"
        onClick={onPriorityClick}
        style={{ color: getPriorityColor(currentPriority) }}
      >
        <Icons.FiltersIcon className="icon" />
        Prioridad
      </button>
      <button
        type="button"
        className="task-action-button"
        aria-label="Estado"
        onClick={onStateClick}
        style={{ color: getStateColor(currentState) }}
      >
        <Icons.BellIcon className="icon" />
        Estado
      </button>
    </div>
  );
}
