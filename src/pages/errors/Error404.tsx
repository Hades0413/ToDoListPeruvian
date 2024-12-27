import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowRight } from "lucide-react";
import "../../styles/errors/Error404.css";
import errorImage from "../../assets/img/errors/error404.png";

const Error404: React.FC = () => {
  return (
    <div className="error-404-container">
      <nav className="error-nav">
        <div className="error-nav__logo">
          <Link className="error-link-404" to="/">
            <Home size={24} strokeWidth={1.5} />
            ToDoListPeruvian
          </Link>
        </div>
      </nav>

      <div className="error-content">
        <div className="error-left">
          <img
            loading="lazy"
            src={errorImage}
            alt="404 illustration"
            className="error-image"
          />
        </div>

        <div className="error-right">
          <h1 className="error-title-404">404</h1>
          <h2 className="error-subtitle">¡Página No Encontrada!</h2>
          <p className="error-message-404">
            Lo sentimos, no pudimos encontrar la página que buscas. Te invitamos
            a volver al inicio para continuar explorando.
          </p>
          <Link
            to="/home"
            className="error-home-button"
            aria-label="IR A INICIO"
          >
            IR A INICIO
            <ArrowRight size={20} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error404;
