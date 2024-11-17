import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import "../styles/AuthForm.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import authFormImg from "../assets/img/authFormImg.jpg";
import FaLock from "../components/icons/FaLock";
import FaUser from "../components/icons/FaUser";

// Esquema de validación
const validationSchema = Yup.object({
  login: Yup.string()
    .required("El nombre de usuario o correo electrónico es obligatorio")
    .test(
      "is-email-or-username",
      "Solo Gmail, Hotmail, Yahoo, Outlook o iCloud",
      (value) => {
        if (value.includes("@")) {
          return /@(gmail\.com|hotmail\.com|yahoo\.com|outlook\.com|icloud\.com)$/.test(
            value
          );
        }
        return true;
      }
    ),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("La contraseña es obligatoria"),
});

export default function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
      rememberMe: !!localStorage.getItem("rememberedEmail"),
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const loginRequest = {
          email: values.login.includes("@") ? values.login : null,
          username: !values.login.includes("@") ? values.login : null,
          password: values.password,
        };

        const response = await axios.post(
          "http://localhost:8080/api/user/login",
          loginRequest
        );

        if (response.data.code === 200) {
          // Guardar el valor de login, sin importar si es email o username
          localStorage.setItem("userLogin", values.login);

          if (values.rememberMe) {
            localStorage.setItem("rememberedEmail", values.login);
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
          // Si el código no es 200, manejar el error con un mensaje más específico
          let errorMessage = "Hubo un error al intentar iniciar sesión.";

          if (response.data.message) {
            errorMessage = response.data.message;
          }

          Swal.fire({
            title: "Error",
            text: errorMessage,
            icon: "error",
            background: "#333",
            color: "#fff",
          });
        }
      } catch (error: unknown) {
        console.error("Error al intentar iniciar sesión");

        // Verificamos si el error es de tipo AxiosError
        if (error instanceof AxiosError) {
          if (error.response && error.response.status === 400) {
            // Si es un error de tipo 400 (por ejemplo, credenciales incorrectas o campos vacíos)
            let errorMessage = "Hubo un problema con los datos enviados.";

            // Aquí evaluamos los mensajes específicos del backend
            if (
              error.response.data ===
              "El correo electrónico o username es obligatorio"
            ) {
              errorMessage = "El correo electrónico o username es obligatorio.";
            } else if (error.response.data === "La contraseña es obligatoria") {
              errorMessage = "La contraseña es obligatoria.";
            } else if (
              error.response.data ===
              "La contraseña debe tener al menos 8 caracteres"
            ) {
              errorMessage = "La contraseña debe tener al menos 8 caracteres.";
            } else if (error.response.data === "Credenciales incorrectas") {
              errorMessage =
                "Las credenciales son incorrectas. Por favor, verifica tu correo o contraseña.";
            }

            Swal.fire({
              title: "Error",
              text: errorMessage,
              icon: "error",
              background: "#333",
              color: "#fff",
            });
          } else if (error.response && error.response.status === 401) {
            // Si la respuesta es 401 (credenciales incorrectas), mostrar un mensaje específico
            Swal.fire({
              title: "Error",
              text: "Credenciales incorrectas o el usuario no está autorizado.",
              icon: "error",
              background: "#333",
              color: "#fff",
            });
          } else {
            // En caso de otro tipo de error
            Swal.fire({
              title: "Error",
              text: "Hubo un error al intentar iniciar sesión.",
              icon: "error",
              background: "#333",
              color: "#fff",
            });
          }
        } else {
          // Error desconocido
          Swal.fire({
            title: "Error",
            text: "Ocurrió un error desconocido.",
            icon: "error",
            background: "#333",
            color: "#fff",
          });
        }
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
                formik.touched.login && formik.errors.login ? "error" : ""
              }`}
            >
              <FaUser className="input-icon" />
              <input
                id="login"
                type="text"
                className="auth-input"
                placeholder="Correo o nombre de usuario"
                value={formik.values.login}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.login && formik.errors.login ? (
                <div className="error-message">{formik.errors.login}</div>
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
