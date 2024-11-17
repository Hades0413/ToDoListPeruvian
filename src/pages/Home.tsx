import React from "react";
import "../styles/Home.css";
import CalendarIcon from "../components/icons/CalendarIcon";
import ViewIcon from "../components/icons/ViewIcon";
import PlusIcon from "../components/icons/PlusIcon";
import CircleIcon from "../components/icons/CircleIcon";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-left">
          <h1>Hoy</h1>
          <span className="task-count">1 tarea</span>
        </div>
        <div className="header-right">
          <button className="header-button">
            <CalendarIcon className="icon" />
            <span>Eventos de calendario</span>
          </button>
          <button className="header-button">
            <ViewIcon className="icon" />
            <span>Vista</span>
          </button>
        </div>
      </header>

      <main className="home-content">
        <div className="task-item">
          <div className="task-checkbox">
            <CircleIcon className="icon" />
          </div>
          <div className="task-text">
            Descargar aplicaciones y complementos adicionales para
          </div>
        </div>

        <button className="add-task-button">
          <PlusIcon className="icon" />
          <span>Añadir tarea</span>
        </button>
      </main>
    </div>
  );
};

export default Home;
