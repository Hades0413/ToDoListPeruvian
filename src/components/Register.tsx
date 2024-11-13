import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/AuthForm.css";
import authFormImg from "../assets/img/authFormImg.jpg";
import FaUser from "../components/icons/FaUser";
import FaEnvelope from "../components/icons/FaEnvelope";
import FaLock from "../components/icons/FaLock";

const Register: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar campos
    if (!nombre || !correoElectronico || !contrasena) {
      Swal.fire({
        title: "Error",
        text: "Todos los campos son obligatorios.",
        icon: "error",
        background: "#333",
        color: "#fff",
      });
      return;
    }

    try {
      // Realizar la solicitud al backend
      const response = await axios.post("http://localhost:5000/register", {
        nombre_usuario: nombre,
        email_usuario: correoElectronico,
        contrasena_usuario: contrasena,
      });

      // Manejar el éxito del registro
      if (response.status === 201) {
        Swal.fire({
          title: "¡Éxito!",
          text: "Usuario registrado con éxito.",
          icon: "success",
          background: "#333",
          color: "#fff",
        }).then(() => {
          navigate("/"); // Redirigir al usuario
        });
      }
    } catch (err: any) {
      // Manejo específico para correo electrónico duplicado
      if (err.response && err.response.status === 409) { // 409 Conflict
        Swal.fire({
          title: "Advertencia",
          text: "El correo electrónico ya está registrado. Intenta con otro.",
          icon: "warning",
          background: "#333",
          color: "#fff",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Hubo un error al registrar el usuario. Intenta de nuevo.",
          icon: "error",
          background: "#333",
          color: "#fff",
        });
      }
      console.error("Error al registrar usuario:", err);
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
          <h2 className="auth-title">Crea una cuenta</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <FaUser className="input-icon" />
              <input
                type="text"
                className="auth-input"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                className="auth-input"
                placeholder="Correo Electrónico"
                value={correoElectronico}
                onChange={(e) => setCorreoElectronico(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type="password"
                className="auth-input"
                placeholder="Contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="auth-button">
              Registrarse
            </button>
          </form>
          <a href="/" className="auth-link">
            ¿Ya tienes una cuenta? Inicia sesión
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
