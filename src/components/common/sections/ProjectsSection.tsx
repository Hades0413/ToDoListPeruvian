import React, { useState, useRef, useEffect } from "react";
import * as SidebarIcons from "../../icons/sidebar";
import { InitialProjectPopup } from "../modals/InitialProjectPopup";
import { NewProjectForm } from "../forms/NewProjectForm";
import { truncateText } from "../../../utils/stringUtils";
import ProyectoService from "../../../services/proyecto/proyectoService";
import '../../../styles/common/ProjectsSection.css';

interface Project {
  idProyecto: string;
  nombreProyecto: string;
}

export function ProjectsSection() {
  const [isProjectsOpen, setIsProjectsOpen] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [showInitialPopup, setShowInitialPopup] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const addButtonRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const proyectoService = new ProyectoService();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const proyectos = await proyectoService.getProyectos();
        setProjects(proyectos);
      } catch (error) {
        console.error("Error al obtener los proyectos:", error);
      }
    };

    fetchProjects();
  }, []);

  const toggleProjects = () => setIsProjectsOpen(!isProjectsOpen);

  const handleAddProjectClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowInitialPopup(!showInitialPopup);
  };

  const handleProjectSubmit = (projectData: any) => {
    const newProject: Project = {
      idProyecto: Date.now().toString(),
      nombreProyecto: projectData.nombre,
    };
    setProjects([...projects, newProject]);
    setShowProjectForm(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        showInitialPopup &&
        !addButtonRef.current?.contains(e.target as Node) &&
        !popupRef.current?.contains(e.target as Node)
      ) {
        setShowInitialPopup(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
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
            <li key={project.idProyecto} className="project-item">
              <SidebarIcons.HashIcon className="icon" />
              {truncateText(project.nombreProyecto || "", 20)}{" "}
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
