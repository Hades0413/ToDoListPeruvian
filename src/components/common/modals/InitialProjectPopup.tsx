import React, { useEffect, useState, forwardRef } from "react";
import { createPortal } from "react-dom";
import * as SidebarIcons from "../../icons/sidebar";

interface InitialProjectPopupProps {
  onClose: () => void;
  onProjectClick: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

export const InitialProjectPopup = forwardRef<
  HTMLDivElement,
  InitialProjectPopupProps
>(({ onClose, onProjectClick, buttonRef }, ref) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const calculatePosition = () => {
      if (!buttonRef.current) return;
      const buttonRect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: buttonRect.bottom + 5,
        left: buttonRect.left,
      });
    };

    calculatePosition();
    window.addEventListener("resize", calculatePosition);
    return () => window.removeEventListener("resize", calculatePosition);
  }, [buttonRef]);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  return createPortal(
    <div
      ref={ref}
      className="initial-project-popup"
      style={{
        position: "absolute",
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
        <button
          className="popup-close-button"
          aria-label="X"
          onClick={handleClose}
        >
          X
        </button>
      </div>
    </div>,
    document.body
  );
});

InitialProjectPopup.displayName = "InitialProjectPopup";
