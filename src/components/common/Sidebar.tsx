import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/common/Sidebar.css";
import * as SidebarIcons from "../icons/sidebar";

interface SidebarProps {
  onSidebarToggle: (isOpen: boolean) => void;
}

export default function Sidebar({ onSidebarToggle }: SidebarProps) {
  const [isProjectsOpen, setIsProjectsOpen] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userLogin, setUserLogin] = useState<string>("");
  const [userInitial, setUserInitial] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    // Obtener los datos del usuario guardados en localStorage
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      const username = userData.username || ""; // Obtener el username del usuario
      setUserLogin(username);

      // Tomar la primera letra del username para la inicial
      setUserInitial(username[0].toUpperCase());
    }
  }, []);

  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    onSidebarToggle(newState);
  };

  // Función para manejar el cierre de sesión
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
              <div className="avatar">
                {userInitial} {/* Muestra la inicial */}
              </div>
              <div className="user-info">
                <span className="username">{userLogin}</span>{" "}
                {/* Muestra el username del usuario */}
              </div>
              <div className="icons">
                <SidebarIcons.BellIcon className="notification-icon" />
                <button className="menu-button" onClick={toggleSidebar}>
                  <SidebarIcons.MenuIcon className="menu-icon" />
                </button>
              </div>
            </div>
          </div>

          {/* Resto del Sidebar */}
          <button className="add-task-button-sidebar">
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
            <li className="nav-item">
              <SidebarIcons.TodayIcon className="icon" />
              Hoy
              <span className="count">1</span>
            </li>
            <li className="nav-item">
              <SidebarIcons.NextIcon className="icon" />
              Próximo
            </li>
            <li className="nav-item">
              <SidebarIcons.FiltersIcon className="icon" />
              Filtros y Etiquetas
            </li>
          </ul>

          <div className="projects-section">
            <div
              className="projects-header"
              onClick={() => setIsProjectsOpen(!isProjectsOpen)}
            >
              <span>Mis Proyectos</span>
              <button className="toggle-button">
                <SidebarIcons.ArrowIcon
                  className={`arrow-icon ${isProjectsOpen ? "open" : ""}`}
                />
              </button>
            </div>
            {isProjectsOpen && (
              <ul className="projects-list">
                <li className="project-item">
                  <SidebarIcons.HashIcon className="icon" />
                  Mis Cosas
                  <SidebarIcons.StarIcon className="star-icon" />
                  <span className="count">5</span>
                </li>
              </ul>
            )}
          </div>

          <div className="sidebar-footer">
            <button className="footer-button">
              <SidebarIcons.PlusIcon className="icon" />
              Añadir un equipo
            </button>
            <button className="footer-button">
              <SidebarIcons.TemplateIcon className="icon" />
              Explorar plantillas
            </button>

            <button className="footer-button" onClick={handleLogout}>
              <SidebarIcons.TemplateIcon className="icon" />
              Cerrar sesión
            </button>
          </div>
        </nav>
      </div>
      {!isSidebarOpen && (
        <button className="floating-menu-button" onClick={toggleSidebar}>
          <SidebarIcons.MenuIcon className="menu-icon" />
        </button>
      )}
    </div>
  );
}
