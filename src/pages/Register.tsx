import React from "react";
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
  correoElectronico: Yup.string()
    .email("Correo electrónico inválido")
    .matches(
      /@(gmail\.com|hotmail\.com|yahoo\.com|outlook\.com|icloud\.com)$/,
      "Solo Gmail, Hotmail, Yahoo, Outlook o iCloud"
    )
    .required("El correo electrónico es obligatorio"),
  contrasena: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("La contraseña es obligatoria"),
});

const Register: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    try {
      const response = await axios.post("http://localhost:5000/register", {
        nombre_usuario: values.nombre,
        email_usuario: values.correoElectronico,
        contrasena_usuario: values.contrasena,
      });

      if (response.status === 201) {
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
      if (err.response && err.response.status === 409) {
        if (err.response.data.error.includes("correo electrónico")) {
          Swal.fire({
            title: "Advertencia",
            text: "El correo electrónico ya está registrado. Intenta con otro.",
            icon: "warning",
            background: "#333",
            color: "#fff",
          });
        } else if (err.response.data.error.includes("nombre de usuario")) {
          Swal.fire({
            title: "Advertencia",
            text: "El nombre de usuario ya está registrado. Intenta con otro.",
            icon: "warning",
            background: "#333",
            color: "#fff",
          });
        }
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
              correoElectronico: "",
              contrasena: "",
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
                  />
                  <ErrorMessage
                    name="nombre"
                    component="div"
                    className="error-message"
                  />
                </div>

                {/* Campo Correo Electrónico */}
                <div
                  className={`input-group ${
                    formik.touched.correoElectronico &&
                    formik.errors.correoElectronico
                      ? "error"
                      : ""
                  }`}
                >
                  <FaEnvelope className="input-icon" />
                  <Field
                    type="email"
                    className="auth-input"
                    name="correoElectronico"
                    placeholder="Correo Electrónico"
                  />
                  <ErrorMessage
                    name="correoElectronico"
                    component="div"
                    className="error-message"
                  />
                </div>

                {/* Campo Contraseña */}
                <div
                  className={`input-group ${
                    formik.touched.contrasena && formik.errors.contrasena
                      ? "error"
                      : ""
                  }`}
                >
                  <FaLock className="input-icon" />
                  <Field
                    type="password"
                    className="auth-input"
                    name="contrasena"
                    placeholder="Contraseña"
                  />
                  <ErrorMessage
                    name="contrasena"
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
