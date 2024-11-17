import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Sidebar.css";

import PlusIcon from "../../components/icons/PlusIcon";
import SearchIcon from "../../components/icons/SearchIcon";
import InboxIcon from "../../components/icons/InboxIcon";
import TodayIcon from "../../components/icons/TodayIcon";
import NextIcon from "../../components/icons/NextIcon";
import FiltersIcon from "../../components/icons/FiltersIcon";
import ArrowIcon from "../../components/icons/ArrowIcon";
import HashIcon from "../../components/icons/HashIcon";
import StarIcon from "../../components/icons/StarIcon";
import TemplateIcon from "../../components/icons/TemplateIcon";
import BellIcon from "../../components/icons/BellIcon";
import MenuIcon from "../../components/icons/MenuIcon";

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
    // Obtener el valor del login guardado en localStorage
    const storedLogin = localStorage.getItem("userLogin");
    if (storedLogin) {
      setUserLogin(storedLogin);
      // Tomar la primera letra del login (sea email o username)
      setUserInitial(storedLogin[0].toUpperCase());
    }
  }, []);

  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    onSidebarToggle(newState);
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
                {/* Muestra el login completo */}
              </div>
              <div className="icons">
                <BellIcon className="notification-icon" />
                <button className="menu-button" onClick={toggleSidebar}>
                  <MenuIcon className="menu-icon" />
                </button>
              </div>
            </div>
          </div>

          {/* Resto del Sidebar */}
          <button className="add-task-button-sidebar">
            <PlusIcon className="icon" />
            Añadir tarea
          </button>

          <div className="search-container">
            <SearchIcon className="search-icon" />
            <input
              type="text"
              placeholder="Buscador"
              className="search-input"
            />
          </div>

          <ul className="nav-items">
            <li className="nav-item">
              <InboxIcon className="icon" />
              Bandeja de entrada
              <span className="count">2</span>
            </li>
            <li className="nav-item">
              <TodayIcon className="icon" />
              Hoy
              <span className="count">1</span>
            </li>
            <li className="nav-item">
              <NextIcon className="icon" />
              Próximo
            </li>
            <li className="nav-item">
              <FiltersIcon className="icon" />
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
                <ArrowIcon
                  className={`arrow-icon ${isProjectsOpen ? "open" : ""}`}
                />
              </button>
            </div>
            {isProjectsOpen && (
              <ul className="projects-list">
                <li className="project-item">
                  <HashIcon className="icon" />
                  Mis Cosas
                  <StarIcon className="star-icon" />
                  <span className="count">5</span>
                </li>
              </ul>
            )}
          </div>

          <div className="sidebar-footer">
            <button className="footer-button">
              <PlusIcon className="icon" />
              Añadir un equipo
            </button>
            <button className="footer-button">
              <TemplateIcon className="icon" />
              Explorar plantillas
            </button>
          </div>
        </nav>
      </div>
      {!isSidebarOpen && (
        <button className="floating-menu-button" onClick={toggleSidebar}>
          <MenuIcon className="menu-icon" />
        </button>
      )}
    </div>
  );
}
