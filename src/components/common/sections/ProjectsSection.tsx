import React, { useState, useRef, useEffect } from 'react';
import * as SidebarIcons from "../../icons/sidebar";
import { InitialProjectPopup } from '../modals/InitialProjectPopup';
import { NewProjectForm } from '../forms/NewProjectForm';
import { truncateText } from '../../../utils/stringUtils'; // Importa la función truncateText

interface Project {
  id: string;
  name: string;
  count: number;
}

export function ProjectsSection() {
  const [isProjectsOpen, setIsProjectsOpen] = useState(true);
  const [projects, setProjects] = useState<Project[]>([
    { id: '1', name: 'Mis Cosas', count: 5 }
  ]);
  const [showInitialPopup, setShowInitialPopup] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const addButtonRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const toggleProjects = () => setIsProjectsOpen(!isProjectsOpen);

  const handleAddProjectClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowInitialPopup(!showInitialPopup);
  };

  const handleProjectSubmit = (projectData: any) => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: projectData.nombre,
      count: 0
    };
    setProjects([...projects, newProject]);
    setShowProjectForm(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      // Si se hace clic fuera del botón o del popup, cierra el popup
      if (
        showInitialPopup &&
        !addButtonRef.current?.contains(e.target as Node) &&
        !popupRef.current?.contains(e.target as Node)
      ) {
        setShowInitialPopup(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [showInitialPopup]);

  return (
    <div className="projects-section">
      <div className="projects-header" onClick={toggleProjects}>
        <span>Mis Proyectos</span>
        <div className="projects-header-actions">
          <button
            ref={addButtonRef}
            className="add-project-button"
            onClick={handleAddProjectClick}
          >
            <SidebarIcons.PlusIcon className="icon" />
          </button>
          <button className="toggle-button">
            <SidebarIcons.ArrowIcon
              className={`arrow-icon ${isProjectsOpen ? "open" : ""}`}
            />
          </button>
        </div>
      </div>

      {showInitialPopup && (
        <InitialProjectPopup
          buttonRef={addButtonRef}
          ref={popupRef}
          onClose={() => setShowInitialPopup(false)}
          onProjectClick={() => {
            setShowInitialPopup(false);
            setShowProjectForm(true);
          }}
        />
      )}

      {isProjectsOpen && (
        <ul className="projects-list">
          {projects.map((project) => (
            <li key={project.id} className="project-item">
              <SidebarIcons.HashIcon className="icon" />
              {truncateText(project.name, 20)} {/* Aplica truncateText */}
              <span className="count">{project.count}</span>
            </li>
          ))}
        </ul>
      )}

      {showProjectForm && (
        <NewProjectForm
          onClose={() => setShowProjectForm(false)}
          onSubmit={handleProjectSubmit}
        />
      )}
    </div>
  );
}
