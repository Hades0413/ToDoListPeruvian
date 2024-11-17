import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AuthForm.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import authFormImg from "../assets/img/authFormImg.jpg";
import InputGroup from "../components/common/InputGroup";
import FaUser from "../components/icons/FaUser";
import FaEnvelope from "../components/icons/FaEnvelope";
import FaLock from "../components/icons/FaLock";
import { User } from "../types/User";

// Esquema de validación con Yup
const allowedDomains = [
  "gmail.com",
  "hotmail.com",
  "yahoo.com",
  "outlook.com",
  "icloud.com",
];

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
      new RegExp(`@(${allowedDomains.join("|")})$`),
      `Solo ${allowedDomains.join(", ")} son permitidos`
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

    // Definir todas las combinaciones posibles
    const combinations = [
      `${nombre.toLowerCase()}.${apellido.toLowerCase()}${randomNum}`,
      `${apellido.toLowerCase()}.${nombre.toLowerCase()}${randomNum}`,
      `${randomNum}${nombre.toLowerCase()}.${apellido.toLowerCase()}`,
      `${randomNum}${apellido.toLowerCase()}.${nombre.toLowerCase()}`,
      `${nombre.toLowerCase()}${apellido.toLowerCase()}${randomNum}`,
      `${apellido.toLowerCase()}${nombre.toLowerCase()}${randomNum}`,
      `${randomNum}${nombre.toLowerCase()}${apellido.toLowerCase()}`,
      `${randomNum}${apellido.toLowerCase()}${nombre.toLowerCase()}`,
    ];

    // Seleccionar una combinación aleatoria
    const randomIndex = Math.floor(Math.random() * combinations.length);

    return combinations[randomIndex];
  };

  const handleSubmit = async (values: User) => {
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
      handleErrorResponse(err); // Llamar a la función para manejar los errores
    }
  };

  const handleErrorResponse = (err: any) => {
    const errorMessages: Record<string, string> = {
      "Username ya existe": "El nombre de usuario ya está en uso.",
      "DNI ya existe": "El DNI ya está registrado.",
      "Email ya existe": "El correo electrónico ya está registrado.",
    };

    const errorMessage =
      errorMessages[err.response?.data] ||
      "Hubo un error al registrar el usuario. Intenta de nuevo.";

    Swal.fire({
      title: "Advertencia",
      text: errorMessage,
      icon: "warning",
      background: "#333",
      color: "#fff",
    });
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
                {/* Usar InputGroup para cada campo */}
                <InputGroup
                  formik={formik}
                  name="nombre"
                  type="text"
                  placeholder="Nombre"
                  icon={<FaUser />}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    formik.handleChange(e);
                    const newUsername = generateUsername(
                      e.target.value,
                      formik.values.apellido
                    );
                    setGeneratedUsername(newUsername);
                    formik.setFieldValue("username", newUsername);
                  }}
                />
                <InputGroup
                  formik={formik}
                  name="apellido"
                  type="text"
                  placeholder="Apellido"
                  icon={<FaUser />}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    formik.handleChange(e);
                    const newUsername = generateUsername(
                      formik.values.nombre,
                      e.target.value
                    );
                    setGeneratedUsername(newUsername);
                    formik.setFieldValue("username", newUsername);
                  }}
                />
                <InputGroup
                  formik={formik}
                  name="dni"
                  type="text"
                  placeholder="DNI"
                  icon={<FaUser />}
                />
                <InputGroup
                  formik={formik}
                  name="username"
                  type="text"
                  placeholder="Nombre de usuario"
                  icon={<FaUser />}
                  value={formik.values.username || generatedUsername}
                  onChange={formik.handleChange}
                />
                {/* Botón para generar un nuevo nombre de usuario */}
                <button
                  type="button"
                  className="auth-button generate-username"
                  onClick={() => {
                    const newUsername = generateUsername(
                      formik.values.nombre,
                      formik.values.apellido
                    );
                    setGeneratedUsername(newUsername);
                    formik.setFieldValue("username", newUsername);
                  }}
                >
                  Generar nombre de usuario
                </button>

                <InputGroup
                  formik={formik}
                  name="email"
                  type="email"
                  placeholder="Correo Electrónico"
                  icon={<FaEnvelope />}
                />
                <InputGroup
                  formik={formik}
                  name="password"
                  type="password"
                  placeholder="Contraseña"
                  icon={<FaLock />}
                />

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
