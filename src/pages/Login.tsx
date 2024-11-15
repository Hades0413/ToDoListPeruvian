import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AuthForm.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import authFormImg from "../assets/img/authFormImg.jpg";
import FaLock from "../components/icons/FaLock";
import FaEnvelope from "../components/icons/FaEnvelope";

// Esquema de validación
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Email inválido")
    .matches(
      /@(gmail\.com|hotmail\.com|yahoo\.com|outlook\.com|icloud\.com)$/,
      "Solo correos de Gmail, Hotmail, Yahoo, Outlook o iCloud"
    )
    .required("El email es obligatorio"),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("La contraseña es obligatoria"),
});

export default function Login() {
  const navigate = useNavigate();

  // Inicializar Formik
  const formik = useFormik({
    initialValues: {
      email: localStorage.getItem("rememberedEmail") || "",
      password: "",
      rememberMe: !!localStorage.getItem("rememberedEmail"),
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:5000/login", {
          email: values.email,
          password: values.password,
        });

        if (response.data.success) {
          if (values.rememberMe) {
            localStorage.setItem("rememberedEmail", values.email);
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
    },
  });

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div
          className="auth-image"
          style={{ backgroundImage: `url(${authFormImg})` }}
        ></div>
        <div className="auth-form">
          <h2 className="auth-title">Bienvenido de vuelta</h2>
          <form onSubmit={formik.handleSubmit}>
            <div
              className={`input-group ${
                formik.touched.email && formik.errors.email ? "error" : ""
              }`}
            >
              <FaEnvelope className="input-icon" />
              <input
                id="email"
                type="email"
                className="auth-input"
                placeholder="tu@email.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error-message">{formik.errors.email}</div>
              ) : null}
            </div>

            <div
              className={`input-group ${
                formik.touched.password && formik.errors.password ? "error" : ""
              }`}
            >
              <FaLock className="input-icon" />
              <input
                id="password"
                type="password"
                className="auth-input"
                placeholder="Contraseña"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error-message">{formik.errors.password}</div>
              ) : null}
            </div>

            <div className="auth-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={formik.values.rememberMe}
                  onChange={formik.handleChange}
                  name="rememberMe"
                />{" "}
                Recuérdame
              </label>
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
