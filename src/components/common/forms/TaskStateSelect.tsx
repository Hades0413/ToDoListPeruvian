import React from "react";
import * as Icons from "../../icons/sidebar";

interface TaskStateSelectProps {
  currentState: number;
  onSelect: (state: number) => void;
  onClose: () => void;
}

export function TaskStateSelect({
  currentState,
  onSelect,
  onClose,
}: TaskStateSelectProps) {
  const states = [
    { id: 1, name: "Pendiente", color: "#808080" },
    { id: 2, name: "Inactivo", color: "#FFC107" },
    { id: 3, name: "Activo", color: "#4CAF50" },
  ];

  return (
    <div className="priority-select state-select">
      <div className="priority-select-header">
        <span>Estado</span>
        <button type="button" aria-label="Estado" onClick={onClose}>
          <Icons.CloseIcon className="icon" />
        </button>
      </div>
      <div className="priority-options">
        {states.map((state) => (
          <button
            key={state.id}
            type="button"
            aria-label="Prioridad"
            className={`priority-option ${
              currentState === state.id ? "selected" : ""
            }`}
            onClick={() => onSelect(state.id)}
            style={{ "--priority-color": state.color } as React.CSSProperties}
          >
            <Icons.BellIcon className="icon" />
            <span>{state.name}</span>
            {currentState === state.id && (
              <Icons.CheckIcon className="icon check" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
