import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Función para manejar el inicio de sesión
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Enviar la solicitud al servidor (asegurándose de que el puerto es 5000)
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      if (response.data.success) {
        // Si la respuesta es exitosa, muestra un mensaje de éxito y redirige
        Swal.fire({
          title: "¡Éxito!",
          text: "Has iniciado sesión correctamente.",
          icon: "success",
        }).then(() => {
          // Redirige al home.tsx
          navigate("/home");
        });
      } else {
        // Si la autenticación falla, muestra un mensaje de error
        Swal.fire({
          title: "Error",
          text: response.data.message,
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error al intentar iniciar sesión", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un error al intentar iniciar sesión.",
        icon: "error",
      });
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
          Bienvenido de vuelta
        </h2>
        <form style={{ marginBottom: "24px" }} onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}
