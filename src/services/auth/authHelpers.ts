import Swal from "sweetalert2";

// Mostrar alertas
export const showAlert = (
  title: string,
  text: string,
  icon: "success" | "error" | "warning"
) => {
  Swal.fire({
    title,
    text,
    icon,
    background: "#333",
    color: "#fff",
  });
};

// Manejo de errores de respuesta
export const handleErrorResponse = (err: any) => {
  const errorMessages: Record<string, string> = {
    "Username ya existe": "El nombre de usuario ya está en uso.",
    "DNI ya existe": "El DNI ya está registrado.",
    "Email ya existe": "El correo electrónico ya está registrado.",
  };

  const errorMessage =
    errorMessages[err.response?.data] ||
    "Hubo un error al registrar el usuario. Intenta de nuevo.";

  // Swal para mostrar la alerta
  Swal.fire({
    title: "Advertencia",
    text: errorMessage,
    icon: "warning",
    background: "#333",
    color: "#fff",
  });
};
