import * as Icons from "../../icons/sidebar";

interface TaskPrioritySelectProps {
  currentPriority: number;
  onSelect: (priority: number) => void;
  onClose: () => void;
}

export function TaskPrioritySelect({
  currentPriority,
  onSelect,
  onClose,
}: TaskPrioritySelectProps) {
  const priorities = [
    { id: 1, name: "Baja", color: "#808080" },
    { id: 2, name: "Media", color: "#ffb13d" },
    { id: 3, name: "Alta", color: "#ff4b2b" },
  ];

  return (
    <div className="priority-select">
      <div className="priority-select-header">
        <span>Prioridad</span>
        <button type="button" aria-label="Prioridad" onClick={onClose}>
          <Icons.CloseIcon className="icon" />
        </button>
      </div>
      <div className="priority-options">
        {priorities.map((priority) => (
          <button
            key={priority.id}
            type="button"
            aria-label="Prioridad"
            className={`priority-option ${
              currentPriority === priority.id ? "selected" : ""
            }`}
            onClick={() => onSelect(priority.id)}
            style={
              { "--priority-color": priority.color } as React.CSSProperties
            }
          >
            <Icons.FiltersIcon className="icon" />
            <span>{priority.name}</span>
            {currentPriority === priority.id && (
              <Icons.CheckIcon className="icon check" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
