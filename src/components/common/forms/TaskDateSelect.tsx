import * as Icons from '../../icons/sidebar';

interface TaskDateSelectProps {
  currentDate: string;
  onSelect: (date: string) => void;
  onClose: () => void;
}

export function TaskDateSelect({ 
  currentDate, 
  onSelect, 
  onClose 
}: TaskDateSelectProps) {
  return (
    <div className="priority-select date-select">
      <div className="priority-select-header">
        <span>Fecha de vencimiento</span>
        <button type="button" onClick={onClose}>
          <Icons.CloseIcon className="icon" />
        </button>
      </div>
      <div className="date-select-content">
        <input
          type="date"
          value={currentDate}
          onChange={(e) => onSelect(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          className="date-input"
        />
      </div>
    </div>
  );
}

