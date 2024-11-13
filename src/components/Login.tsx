import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/AuthForm.css";
import authFormImg from "../assets/img/authFormImg.jpg";
import FaLock from "../components/icons/FaLock";
import FaEnvelope from "../components/icons/FaEnvelope";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // Cargar el email guardado desde localStorage cuando el componente se monte
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      if (response.data.success) {
        // Guardar el email en localStorage si el usuario seleccionó "Recuérdame"
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        Swal.fire({
          title: "¡Éxito!",
          text: "Has iniciado sesión correctamente.",
          icon: "success",
          background: "#333",
          color: "#fff",
        }).then(() => {
          navigate("/home");
        });
      } else {
        Swal.fire({
          title: "Error",
          text: response.data.message,
          icon: "error",
          background: "#333",
          color: "#fff",
        });
      }
    } catch (error) {
      console.error("Error al intentar iniciar sesión", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un error al intentar iniciar sesión.",
        icon: "error",
        background: "#333",
        color: "#fff",
      });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div
          className="auth-image"
          style={{ backgroundImage: `url(${authFormImg})` }}
        ></div>
        <div className="auth-form">
          <h2 className="auth-title">Bienvenido de vuelta</h2>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input
                id="email"
                type="email"
                className="auth-input"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                id="password"
                type="password"
                className="auth-input"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="auth-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />{" "}
                Recuérdame
              </label>
              {/* <a href="/forgot-password" className="forgot-password">
                ¿Olvidaste tu contraseña?
              </a> */}
            </div>
            <button type="submit" className="auth-button">
              Iniciar sesión
            </button>
          </form>
          <a href="/register" className="auth-link">
            ¿No tienes una cuenta? Regístrate
          </a>
        </div>
      </div>
    </div>
  );
}
