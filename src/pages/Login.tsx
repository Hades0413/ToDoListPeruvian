import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import authFormImg from "../assets/img/authFormImg.jpg";
import InputGroup from "../components/common/InputGroup";
import FaUser from "../components/icons/FaUser";
import FaLock from "../components/icons/FaLock";
import "../styles/AuthForm.css";

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

const showAlert = (title: string, text: string, icon: "success" | "error") => {
  Swal.fire({
    title,
    text,
    icon,
    background: "#333",
    color: "#fff",
  });
};

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (values: { login: string; password: string; rememberMe: boolean }) => {
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
        localStorage.setItem("userLogin", values.login);

        if (values.rememberMe) {
          localStorage.setItem("rememberedEmail", values.login);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        showAlert("¡Éxito!", "Has iniciado sesión correctamente.", "success");
        navigate("/home");
      } else {
        showAlert(
          "Error",
          response.data.message ||
            "Hubo un error al intentar iniciar sesión.",
          "error"
        );
      }
    } catch (error: unknown) {
      console.error("Error al intentar iniciar sesión");

      if (error instanceof AxiosError && error.response) {
        let errorMessage = "Hubo un error al intentar iniciar sesión.";

        if (error.response.status === 400) {
          errorMessage = error.response.data || errorMessage;
        } else if (error.response.status === 401) {
          errorMessage = "Credenciales incorrectas o usuario no autorizado.";
        }

        showAlert("Error", errorMessage, "error");
      } else {
        showAlert("Error", "Ocurrió un error desconocido.", "error");
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
          <h2 className="auth-title">Bienvenido de vuelta</h2>
          <Formik
            initialValues={{
              login: localStorage.getItem("rememberedEmail") || "",
              password: "",
              rememberMe: !!localStorage.getItem("rememberedEmail"),
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form>
                <InputGroup
                  formik={formik}
                  name="login"
                  type="text"
                  placeholder="Correo o nombre de usuario"
                  icon={<FaUser />}
                />
                <InputGroup
                  formik={formik}
                  name="password"
                  type="password"
                  placeholder="Contraseña"
                  icon={<FaLock />}
                />
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
              </Form>
            )}
          </Formik>
          <a href="/register" className="auth-link">
            ¿No tienes una cuenta? Regístrate
          </a>
        </div>
      </div>
    </div>
  );
}
