import Swal from "sweetalert2";

export const showErrorAlert = (message: string) => {
  Swal.fire({
    title: "Error",
    text: message,
    icon: "error",
    background: "#333",
    color: "#fff",
  });
};

// Manejo de errores de API para proyectos
export const handleProyectoErrorResponse = (error: any): string => {
  const errorMessages: Record<string, string> = {
    "El nombre de la tarea es obligatorio.":
      "Por favor, ingresa un nombre para la tarea.",
    "El ID del proyecto no es válido.": "El proyecto seleccionado no existe.",
    "Ya existe una tarea con el mismo nombre en este proyecto.":
      "El nombre de la tarea ya está en uso. Por favor, elige otro.",
    "Hubo un error interno del servidor.": "Inténtalo más tarde.",
  };

  const serverMessage = error.response?.data?.message || "";
  const errorMessage =
    errorMessages[serverMessage] ||
    "Hubo un error desconocido al registrar el proyecto. Intenta nuevamente.";

  console.error("Error del servidor:", serverMessage || errorMessage);
  return errorMessage;
};
