export const getPriorityClass = (prioridad: number) => {
  switch (prioridad) {
    case 1:
      return "priority-high";
    case 2:
      return "priority-medium";
    case 3:
      return "priority-low";
    default:
      return "";
  }
};

export const getStatusClass = (estado: number) => {
  switch (estado) {
    case 1:
      return "status-pending";
    case 2:
      return "status-in-progress";
    case 3:
      return "status-completed";
    default:
      return "";
  }
};