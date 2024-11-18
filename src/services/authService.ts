import { login, register } from "../api/authApi";
import { showAlert, handleErrorResponse } from "./authHelpers";
import { NavigateFunction } from "react-router-dom";
import { AxiosError } from "axios";

// Lógica para login de usuario
export const loginUser = async (
  values: { login: string; password: string; rememberMe: boolean },
  navigate: NavigateFunction
) => {
  try {
    const loginRequest = {
      email: values.login.includes("@") ? values.login : null,
      username: !values.login.includes("@") ? values.login : null,
      password: values.password,
    };

    const response = await login(loginRequest);

    if (response.data.code === 200) {
      localStorage.setItem("userLogin", values.login);
      if (values.rememberMe) {
        localStorage.setItem("rememberedEmail", values.login);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      showAlert("¡Éxito!", "Has iniciado sesión correctamente.", "success");
      navigate("/home");
    } else if (response.data.code === 400) {
      showAlert(
        "Error",
        response.data.message || "Los datos enviados no son válidos.",
        "error"
      );
    } else if (response.data.code === 401) {
      showAlert(
        "Error",
        "Credenciales incorrectas. Intenta nuevamente.",
        "error"
      );
    } else {
      showAlert(
        "Error",
        response.data.message || "Hubo un error al intentar iniciar sesión.",
        "error"
      );
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response) {
        if (error.response.data && error.response.data.message) {
          showAlert("Error", error.response.data.message, "error");
        } else {
          showAlert(
            "Error",
            "Ocurrió un error al intentar iniciar sesión.",
            "error"
          );
        }
      } else {
        showAlert("Error", "Ocurrió un error desconocido.", "error");
      }
    } else {
      showAlert("Error", "Ocurrió un error desconocido.", "error");
    }
  }
};

// Lógica para registrar usuario
export const registerUser = async (values: any, navigate: NavigateFunction) => {
  try {
    const response = await register({
      nombre: values.nombre,
      apellido: values.apellido,
      dni: values.dni,
      username: values.username,
      email: values.email,
      password: values.password,
    });

    if (response.status === 200) {
      showAlert("¡Éxito!", "Usuario registrado con éxito.", "success");
      navigate("/"); // Redirigir al login
    } else {
      // Si el código de estado no es 200, mostrar un mensaje de error genérico
      showAlert("Error", "Hubo un problema al registrar el usuario.", "error");
    }
  } catch (err: any) {
    // Si hay un error en la respuesta (por ejemplo, errores 400 o 500), manejarlo aquí
    if (err.response) {
      // Verificamos si el error tiene un mensaje de respuesta
      if (err.response.data) {
        const errorMessage = err.response.data;
        // Aquí manejamos los errores específicos
        if (errorMessage === "Username ya existe") {
          showAlert(
            "Advertencia",
            "El nombre de usuario ya está en uso.",
            "warning"
          );
        } else if (errorMessage === "DNI ya existe") {
          showAlert("Advertencia", "El DNI ya está registrado.", "warning");
        } else if (errorMessage === "Email ya existe") {
          showAlert(
            "Advertencia",
            "El correo electrónico ya está registrado.",
            "warning"
          );
        } else {
          // Si el error no es específico, mostramos el mensaje genérico
          showAlert("Error", errorMessage, "error");
        }
      } else {
        // Si no hay mensaje de error, mostramos un error genérico
        showAlert("Error", "Hubo un problema con la solicitud.", "error");
      }
    } else {
      // Si no hay respuesta del servidor o si el error es de otro tipo
      showAlert(
        "Error",
        "Hubo un error desconocido. Intenta nuevamente.",
        "error"
      );
    }
  }
};
