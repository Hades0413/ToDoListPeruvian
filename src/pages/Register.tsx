import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AuthForm.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import authFormImg from "../assets/img/authFormImg.jpg";
import FaUser from "../components/icons/FaUser";
import FaEnvelope from "../components/icons/FaEnvelope";
import FaLock from "../components/icons/FaLock";

// Esquema de validación con Yup
const validationSchema = Yup.object({
  nombre: Yup.string().required("El nombre es obligatorio"),
  apellido: Yup.string().required("El apellido es obligatorio"),
  dni: Yup.string()
    .matches(/^\d{8}$/, "El DNI debe tener 8 dígitos")
    .required("El DNI es obligatorio"),
  username: Yup.string().required("El nombre de usuario es obligatorio"),
  email: Yup.string()
    .email("Correo electrónico inválido")
    .matches(
      /@(gmail\.com|hotmail\.com|yahoo\.com|outlook\.com|icloud\.com)$/,
      "Solo Gmail, Hotmail, Yahoo, Outlook o iCloud"
    )
    .required("El correo electrónico es obligatorio"),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("La contraseña es obligatoria"),
});

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [generatedUsername, setGeneratedUsername] = useState<string>("");

  const generateUsername = (nombre: string, apellido: string): string => {
    const randomNum = Math.floor(Math.random() * 10000);
    return `${nombre.toLowerCase()}.${apellido.toLowerCase()}${randomNum}`;
  };

  // Enviar datos al backend para registrar usuario
  const handleSubmit = async (values: any) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/register",
        {
          nombre: values.nombre,
          apellido: values.apellido,
          dni: values.dni,
          username: values.username || generatedUsername,
          email: values.email,
          password: values.password,
        }
      );

      if (response.status === 200) {
        Swal.fire({
          title: "¡Éxito!",
          text: "Usuario registrado con éxito.",
          icon: "success",
          background: "#333",
          color: "#fff",
        }).then(() => {
          navigate("/"); // Redirigir al login
        });
      }
    } catch (err: any) {
      if (err.response && err.response.status === 400) {
        // Aquí obtenemos el mensaje de error específico
        let errorMessage =
          "Hubo un error al registrar el usuario. Intenta de nuevo.";

        // Si el error tiene un mensaje específico, lo mostramos
        if (err.response.data === "Username ya existe") {
          errorMessage = "El nombre de usuario ya está en uso.";
        } else if (err.response.data === "DNI ya existe") {
          errorMessage = "El DNI ya está registrado.";
        } else if (err.response.data === "Email ya existe") {
          errorMessage = "El correo electrónico ya está registrado.";
        }

        // Mostrar alerta con el mensaje específico
        Swal.fire({
          title: "Advertencia",
          text: errorMessage,
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
    }
  };

  const handleGenerateNewUsername = (formik: any) => {
    const newUsername = generateUsername(
      formik.values.nombre,
      formik.values.apellido
    );
    setGeneratedUsername(newUsername);
    formik.setFieldValue("username", newUsername);
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
          <Formik
            initialValues={{
              nombre: "",
              apellido: "",
              dni: "",
              username: "",
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form>
                {/* Campo Nombre */}
                <div
                  className={`input-group ${
                    formik.touched.nombre && formik.errors.nombre ? "error" : ""
                  }`}
                >
                  <FaUser className="input-icon" />
                  <Field
                    type="text"
                    className="auth-input"
                    name="nombre"
                    placeholder="Nombre"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      formik.handleChange(e);
                      setGeneratedUsername(
                        generateUsername(e.target.value, formik.values.apellido)
                      );
                    }}
                  />
                  <ErrorMessage
                    name="nombre"
                    component="div"
                    className="error-message"
                  />
                </div>

                {/* Campo Apellido */}
                <div
                  className={`input-group ${
                    formik.touched.apellido && formik.errors.apellido
                      ? "error"
                      : ""
                  }`}
                >
                  <FaUser className="input-icon" />
                  <Field
                    type="text"
                    className="auth-input"
                    name="apellido"
                    placeholder="Apellido"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      formik.handleChange(e);
                      setGeneratedUsername(
                        generateUsername(formik.values.nombre, e.target.value)
                      );
                    }}
                  />
                  <ErrorMessage
                    name="apellido"
                    component="div"
                    className="error-message"
                  />
                </div>

                {/* Campo DNI */}
                <div
                  className={`input-group ${
                    formik.touched.dni && formik.errors.dni ? "error" : ""
                  }`}
                >
                  <FaUser className="input-icon" />
                  <Field
                    type="text"
                    className="auth-input"
                    name="dni"
                    placeholder="DNI"
                  />
                  <ErrorMessage
                    name="dni"
                    component="div"
                    className="error-message"
                  />
                </div>

                {/* Campo Username */}
                <div
                  className={`input-group ${
                    formik.touched.username && formik.errors.username
                      ? "error"
                      : ""
                  }`}
                >
                  <FaUser className="input-icon" />
                  <Field
                    type="text"
                    className="auth-input"
                    name="username"
                    placeholder="Nombre de usuario"
                    value={formik.values.username || generatedUsername}
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="error-message"
                  />
                </div>

                {/* Botón para refrescar nombre de usuario */}
                <button
                  type="button"
                  className="refresh-button"
                  onClick={() => handleGenerateNewUsername(formik)}
                >
                  Generar nuevo nombre de usuario
                </button>

                {/* Campo Correo Electrónico */}
                <div
                  className={`input-group ${
                    formik.touched.email && formik.errors.email ? "error" : ""
                  }`}
                >
                  <FaEnvelope className="input-icon" />
                  <Field
                    type="email"
                    className="auth-input"
                    name="email"
                    placeholder="Correo Electrónico"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error-message"
                  />
                </div>

                {/* Campo Contraseña */}
                <div
                  className={`input-group ${
                    formik.touched.password && formik.errors.password
                      ? "error"
                      : ""
                  }`}
                >
                  <FaLock className="input-icon" />
                  <Field
                    type="password"
                    className="auth-input"
                    name="password"
                    placeholder="Contraseña"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error-message"
                  />
                </div>

                <button type="submit" className="auth-button">
                  Registrarse
                </button>
              </Form>
            )}
          </Formik>

          <a href="/" className="auth-link">
            ¿Ya tienes una cuenta? Inicia sesión
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
