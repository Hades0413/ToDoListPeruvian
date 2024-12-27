import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import authFormImg from "../../assets/img/auth/authFormImg.jpg";
import InputGroup from "../../components/common/InputGroup";
import { FaUser, FaLock } from "../../components/icons/auth";
import "../../styles/auth/AuthForm.css";
import { loginUser } from "../../services/auth/authService";

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

  const handleSubmit = (values: {
    login: string;
    password: string;
    rememberMe: boolean;
  }) => {
    loginUser(values, navigate);
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div
          className="auth-image"
          style={{ backgroundImage: `url(${authFormImg})` }}
        ></div>
        <div className="auth-form">
          <h1 className="auth-title">Bienvenido de vuelta</h1>
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
                <button
                  type="submit"
                  className="auth-button"
                  aria-label="Iniciar sesión"
                >
                  Iniciar sesión
                </button>
              </Form>
            )}
          </Formik>
          <a href="/register" className="auth-link" aria-label="Regístrate">
            ¿No tienes una cuenta? Regístrate
          </a>
        </div>
      </div>
    </div>
  );
}
