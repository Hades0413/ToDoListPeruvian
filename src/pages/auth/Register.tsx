import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { User } from "../../types/User";
import authFormImg from "../../assets/img/auth/authFormImg.jpg";
import { registerUser } from "../../services/auth/authService";
import InputGroup from "../../components/common/InputGroup";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaRandom,
} from "../../components/icons/auth";
import "../../styles/auth/AuthForm.css";

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
    const randomIndex = Math.floor(Math.random() * combinations.length);
    return combinations[randomIndex];
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div
          className="auth-image"
          style={{ backgroundImage: `url(${authFormImg})` }}
        ></div>
        <div className="auth-form">
          <h1 className="auth-title">Crea una cuenta</h1>
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
            onSubmit={(values: User) => registerUser(values, navigate)}
          >
            {(formik) => (
              <Form>
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
                  rightIcon={<FaRandom />}
                  onRightIconClick={() => {
                    const newUsername = generateUsername(
                      formik.values.nombre,
                      formik.values.apellido
                    );
                    setGeneratedUsername(newUsername);
                    formik.setFieldValue("username", newUsername);
                  }}
                />
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
                <button
                  type="submit"
                  className="auth-button"
                  aria-label="Regístrarse"
                >
                  Registrarse
                </button>
              </Form>
            )}
          </Formik>
          <a href="/" className="auth-link" aria-label="Inicia sesión">
            ¿Ya tienes una cuenta? Inicia sesión
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
