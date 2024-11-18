import React from "react";
import "../../styles/dashboard/Home.css";
import * as DashboardIcons from "../../components/icons/dashboard";
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
            <DashboardIcons.CalendarIcon className="icon" />
            <span>Eventos de calendario</span>
          </button>
          <button className="header-button">
            <DashboardIcons.ViewIcon className="icon" />
            <span>Vista</span>
          </button>
        </div>
      </header>

      <main className="home-content">
        <div className="task-item">
          <div className="task-checkbox">
            <DashboardIcons.CircleIcon className="icon" />
          </div>
          <div className="task-text">
            Descargar aplicaciones y complementos adicionales para
          </div>
        </div>

        <button className="add-task-button">
          <DashboardIcons.PlusIcon className="icon" />
          <span>Añadir tarea</span>
        </button>
      </main>
    </div>
  );
};

export default Home;
