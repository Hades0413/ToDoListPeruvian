import React, { useEffect, useState, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import * as SidebarIcons from "../../icons/sidebar";

interface InitialProjectPopupProps {
  onClose: () => void;
  onProjectClick: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

// Usamos forwardRef para pasar la referencia del popup desde el componente padre
export const InitialProjectPopup = forwardRef<HTMLDivElement, InitialProjectPopupProps>(
  ({ onClose, onProjectClick, buttonRef }, ref) => {
    const [position, setPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
      const calculatePosition = () => {
        if (!buttonRef.current) return;
        const buttonRect = buttonRef.current.getBoundingClientRect();
        setPosition({
          top: buttonRect.bottom + 5, // 10px por debajo del botón
          left: buttonRect.left + 0,  // 20px a la derecha del botón
        });
      };

      calculatePosition();
      window.addEventListener('resize', calculatePosition);
      return () => window.removeEventListener('resize', calculatePosition);
    }, [buttonRef]);

    return createPortal(
      <div
        ref={ref} // Asignamos la referencia al contenedor del popup
        className="initial-project-popup"
        style={{
          position: 'absolute',
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
        onClick={(e) => {
          e.stopPropagation();
          onProjectClick();
        }}
      >
        <div className="popup-content">
          <SidebarIcons.HashIcon className="icon" />
          <div className="popup-text">
            <span className="popup-title">Añadir proyecto</span>
            <span className="popup-subtitle">Planifica y asigna tareas</span>
          </div>
        </div>
      </div>,
      document.body
    );
  }
);

InitialProjectPopup.displayName = 'InitialProjectPopup'; // Necesario para forwardRef
