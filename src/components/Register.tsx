import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    // Validar campos
    if (!nombre || !correoElectronico || !contrasena) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      // Enviar los datos al backend en el puerto 5000
      const response = await axios.post("http://localhost:5000/register", {
        nombre_usuario: nombre,
        email_usuario: correoElectronico,
        contrasena_usuario: contrasena,
      });

      if (response.status === 201) {
        setError(""); // Limpiar el error si todo fue bien
        alert("Usuario registrado con éxito");
        navigate("/"); // Redirigir al login después del registro exitoso
      }
    } catch (err) {
      // Manejo de error si la respuesta del servidor es incorrecta
      setError("Hubo un error al registrar el usuario. Intenta de nuevo.");
      console.error("Error al registrar usuario:", err);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #8b5cf6, #7c3aed)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "24px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "24px",
          }}
        >
          Registrarse
        </h2>

        {/* Mostrar mensaje de error si existe */}
        {error && (
          <div
            style={{
              backgroundColor: "#f8d7da",
              color: "#721c24",
              padding: "10px",
              borderRadius: "4px",
              marginBottom: "16px",
            }}
          >
            {error}
          </div>
        )}

        <form style={{ marginBottom: "24px" }} onSubmit={handleSubmit}>
          <label
            style={{ display: "block", marginBottom: "6px", color: "#000" }}
          >
            Nombre
          </label>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px 12px",
              marginBottom: "12px",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              color: "#000",
            }}
          />

          <label
            style={{ display: "block", marginBottom: "6px", color: "#000" }}
          >
            Correo Electrónico
          </label>
          <input
            type="email"
            placeholder="tu@email.com"
            value={correoElectronico}
            onChange={(e) => setCorreoElectronico(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px 12px",
              marginBottom: "12px",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              color: "#000",
            }}
          />

          <label
            style={{ display: "block", marginBottom: "6px", color: "#000" }}
          >
            Contraseña
          </label>
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px 12px",
              marginBottom: "12px",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              color: "#000",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "8px 12px",
              backgroundColor: "#4f46e5",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Registrarse
          </button>
        </form>

        <button
          onClick={() => navigate("/")}
          style={{
            width: "100%",
            textAlign: "center",
            color: "#4f74e5",
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          ¿Ya tienes una cuenta? Inicia sesión!
        </button>
      </div>
    </div>
  );
};

export default Register;
