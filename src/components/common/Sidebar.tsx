import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as SidebarIcons from "../icons/sidebar";
import TareaForm from "../common/TareaForm";
import { ProjectsSection } from "./sections/ProjectsSection";
import { TodayTasksSection } from "../common/forms/TodayTaskSection";
import "../../styles/common/Sidebar.css";
import "../../styles/forms/forms.css";
interface SidebarProps {
  onSidebarToggle: (isOpen: boolean) => void;
}

export default function Sidebar({ onSidebarToggle }: SidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userLogin, setUserLogin] = useState<string>("");
  const [userInitial, setUserInitial] = useState<string>("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      const username = userData.username || "";
      setUserLogin(username);
      setUserInitial(username[0].toUpperCase());
    }
  }, []);

  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    onSidebarToggle(newState);
  };

  const handleAddTaskClick = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("userLogin");
    localStorage.removeItem("currentUser");
    navigate("/", { replace: true });
  };

  return (
    <div className="layout-container">
      <div className={`sidebar-wrapper ${isSidebarOpen ? "open" : ""}`}>
        <nav className="sidebar">
          <div className="sidebar-header">
            <div className="user-profile">
              <div className="avatar">{userInitial}</div>
              <div className="user-info">
                <span className="username">{userLogin}</span>
              </div>
              <div className="icons">
                <SidebarIcons.BellIcon className="notification-icon" />
                <button
                  className="menu-button"
                  aria-label="toggleSidebar"
                  onClick={toggleSidebar}
                >
                  <SidebarIcons.MenuIcon className="menu-icon" />
                </button>
              </div>
            </div>
          </div>

          <button
            className="add-task-button-sidebar"
            aria-label="handleAddTaskClick"
            onClick={handleAddTaskClick}
          >
            <SidebarIcons.PlusIcon className="icon" />
            Añadir tarea
          </button>

          <div className="search-container">
            <SidebarIcons.SearchIcon className="search-icon" />
            <input
              type="text"
              placeholder="Buscador"
              className="search-input"
            />
          </div>

          <ul className="nav-items">
            <li className="nav-item">
              <SidebarIcons.InboxIcon className="icon" />
              Bandeja de entrada
              <span className="count">2</span>
            </li>
            <TodayTasksSection />
            <li className="nav-item">
              <SidebarIcons.NextIcon className="icon" />
              Próximo
            </li>
            <li className="nav-item">
              <SidebarIcons.FiltersIcon className="icon" />
              Filtros y Etiquetas
            </li>
          </ul>

          <ProjectsSection />

          <div className="sidebar-footer">
            <button className="footer-button" aria-label="Añadir un equipo">
              <SidebarIcons.PlusIcon className="icon" />
              Añadir un equipo
            </button>
            <button className="footer-button" aria-label="Explorar plantillas">
              <SidebarIcons.TemplateIcon className="icon" />
              Explorar plantillas
            </button>
            <button
              className="footer-button"
              aria-label="Cerrar sesión"
              onClick={handleLogout}
            >
              <SidebarIcons.Logout className="icon" />
              Cerrar sesión
            </button>
          </div>
        </nav>
      </div>
      {!isSidebarOpen && (
        <button
          className="floating-menu-button"
          aria-label="toggleSidebar"
          onClick={toggleSidebar}
        >
          <SidebarIcons.MenuIcon className="menu-icon" />
        </button>
      )}

      {isFormOpen && (
        <TareaForm onClose={handleCloseForm} aria-label="handleCloseForm" />
      )}
    </div>
  );
}
