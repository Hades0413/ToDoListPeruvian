import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TareaService from "../../services/tarea/tareaService";
import ProyectoService from "../../services/proyecto/proyectoService";
import { Tarea } from "../../types/Tarea";
import { Proyecto } from "../../types/Proyecto";
import { TaskPrioritySelect } from "./forms/TaskPrioritySelect";
import { TaskStateSelect } from "./forms/TaskStateSelect";
import { TaskDateSelect } from "./forms/TaskDateSelect";
import { TaskFormButtons } from "./forms/TaskFormButtons";
import { TaskFormSubmit } from "./forms/TaskFormSubmit";
import { ProjectSelect } from "./forms/ProjectSelect";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Swal from "sweetalert2";

interface TareaEditFormProps {
  onClose: () => void;
  tareaId: number;
  onSave: (updatedTask: Tarea) => void;
}

interface TareaFormValues extends Omit<Tarea, "idProyecto"> {
  idProyecto: number;
}

const TareaEditForm: React.FC<TareaEditFormProps> = ({
  onClose,
  tareaId,
  onSave,
}) => {
  const [showPrioritySelect, setShowPrioritySelect] = useState(false);
  const [showStateSelect, setShowStateSelect] = useState(false);
  const [showDateSelect, setShowDateSelect] = useState(false);
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [tareaData, setTareaData] = useState<Tarea | null>(null);

  const tareaService = new TareaService();
  const proyectoService = new ProyectoService();

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const proyectosData = await proyectoService.getProyectos();
        setProyectos(proyectosData);
      } catch (error) {
        console.error("Error al obtener los proyectos:", error);
      }
    };

    const fetchTareaData = async () => {
      try {
        const tarea = await tareaService.getTareaPorId(tareaId);
        setTareaData(tarea);
      } catch (error) {
        console.error("Error al obtener la tarea:", error);
      }
    };

    fetchProyectos();
    fetchTareaData();
  }, [tareaId]);

  if (!tareaData) {
    return <p>Cargando...</p>;
  }

  const validationSchema = Yup.object({
    idProyecto: Yup.number()
      .min(1, "Debes seleccionar un proyecto")
      .required("El proyecto es obligatorio"),
    nombre: Yup.string()
      .trim()
      .max(120, "El título no puede exceder 120 caracteres")
      .required("El nombre de la tarea es obligatorio"),
    descripcion: Yup.string()
      .max(120, "La descripción no puede exceder 120 caracteres")
      .required("La descripción es obligatoria"),
    prioridad: Yup.number()
      .oneOf([1, 2, 3], "Prioridad no válida")
      .required("La prioridad es obligatoria"),
    estado: Yup.number()
      .oneOf([1, 2, 3], "Estado no válido")
      .required("El estado es obligatorio"),
    fechaVencimiento: Yup.date()
      .min(new Date(), "La fecha de vencimiento no puede ser anterior a hoy")
      .required("La fecha de vencimiento es obligatoria"),
  });

  const handleSubmit = async (
    values: TareaFormValues,
    { setSubmitting }: any
  ) => {
    try {
      const idUsuario = localStorage.getItem("userId");
      if (!idUsuario) {
        console.error("Usuario no autenticado");
        Swal.fire({
          title: "No estás autenticado",
          icon: "error",
          confirmButtonText: "Aceptar",
          background: "#333",
          color: "#fff",
        });
        return;
      }
      if (!tareaId) {
        console.error("ID de tarea no disponible");
        Swal.fire({
          title: "ID de tarea no válido",
          icon: "error",
          confirmButtonText: "Aceptar",
          background: "#333",
          color: "#fff",
        });
        return;
      }

      const tareaConUsuario = { ...values, idUsuario: parseInt(idUsuario, 10) };

      console.log("Datos a actualizar:", tareaConUsuario);

      if (!tareaConUsuario || Object.keys(tareaConUsuario).length === 0) {
        console.error("No hay datos para actualizar");
        Swal.fire({
          title: "No hay datos válidos para actualizar",
          icon: "error",
          confirmButtonText: "Aceptar",
          background: "#333",
          color: "#fff",
        });
        return;
      }

      const response = await tareaService.updateTarea(tareaId, tareaConUsuario);

      if (response && response.success) {
        Swal.fire({
          title: "Tarea actualizada correctamente",
          icon: "success",
          confirmButtonText: "Aceptar",
          background: "#333",
          color: "#fff",
        });

        if (response.data) {
          onSave(response.data);
        } else {
          console.error("No se recibieron datos actualizados de la tarea");
          Swal.fire({
            title: "Tarea actualizada",
            icon: "success",
            text: "No se recibieron los datos actualizados de la tarea.",
            confirmButtonText: "Aceptar",
            background: "#333",
            color: "#fff",
          });
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }

        onClose();
      } else {
        console.error("Error al actualizar la tarea: Respuesta no válida");
        Swal.fire({
          title: "Tarea actualizada correctamente",
          icon: "success",
          confirmButtonText: "Aceptar",
          background: "#333",
          color: "#fff",
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error al actualizar la tarea:", error.message);

        Swal.fire({
          title: "Ocurrió un error inesperado",
          icon: "error",
          text: error.message || "No se pudo actualizar la tarea.",
          confirmButtonText: "Aceptar",
          background: "#333",
          color: "#fff",
        });
      } else {
        console.error("Error desconocido:", error);
        Swal.fire({
          title: "Ocurrió un error inesperado",
          icon: "error",
          text: "No se pudo actualizar la tarea.",
          confirmButtonText: "Aceptar",
          background: "#333",
          color: "#fff",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const closeAllSelects = () => {
    setShowPrioritySelect(false);
    setShowStateSelect(false);
    setShowDateSelect(false);
  };

  const initialValues: TareaFormValues = tareaData
    ? {
        idProyecto: tareaData.idProyecto,
        nombre: tareaData.nombre,
        descripcion: tareaData.descripcion,
        prioridad: tareaData.prioridad,
        estado: tareaData.estado,
        fechaVencimiento: tareaData.fechaVencimiento.split("T")[0],
        idUsuario: Number(localStorage.getItem("idUsuario")) || 0,
      }
    : {
        idProyecto: 0,
        nombre: "",
        descripcion: "",
        prioridad: 1,
        estado: 1,
        fechaVencimiento: "",
        idUsuario: 0,
      };

  return (
    <AnimatePresence>
      <motion.div
        className="task-form-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="task-form-container"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="close-button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Cerrar formulario"
          >
            <X size={24} />
          </button>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, status }) => (
              <Form className="task-form">
                <div className="task-form-main">
                  <ProjectSelect
                    proyectos={proyectos}
                    value={values.idProyecto}
                    onChange={(value) => setFieldValue("idProyecto", value)}
                  />

                  <Field
                    name="nombre"
                    type="text"
                    placeholder="Nombre de la tarea"
                    className="task-name-input"
                    maxLength={120}
                  />
                  <ErrorMessage
                    name="nombre"
                    component="div"
                    className="error"
                  />

                  <Field
                    name="descripcion"
                    as="textarea"
                    placeholder="Descripción"
                    className="task-description-input"
                  />
                  <ErrorMessage
                    name="descripcion"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="task-form-actions">
                  <TaskFormButtons
                    onPriorityClick={() => {
                      closeAllSelects();
                      setShowPrioritySelect(true);
                    }}
                    onStateClick={() => {
                      closeAllSelects();
                      setShowStateSelect(true);
                    }}
                    onDateClick={() => {
                      closeAllSelects();
                      setShowDateSelect(true);
                    }}
                    currentPriority={values.prioridad}
                    currentState={values.estado}
                    currentDate={values.fechaVencimiento}
                  />

                  <TaskFormSubmit onCancel={onClose} />
                </div>

                {showPrioritySelect && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="select-popup"
                    >
                      <TaskPrioritySelect
                        currentPriority={values.prioridad}
                        onSelect={(priority) => {
                          setFieldValue("prioridad", priority);
                          setShowPrioritySelect(false);
                        }}
                        onClose={() => setShowPrioritySelect(false)}
                      />
                    </motion.div>
                  </AnimatePresence>
                )}

                {showStateSelect && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="select-popup"
                    >
                      <TaskStateSelect
                        currentState={values.estado}
                        onSelect={(state) => {
                          setFieldValue("estado", state);
                          setShowStateSelect(false);
                        }}
                        onClose={() => setShowStateSelect(false)}
                      />
                    </motion.div>
                  </AnimatePresence>
                )}

                {showDateSelect && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="select-popup"
                    >
                      <TaskDateSelect
                        currentDate={values.fechaVencimiento}
                        onSelect={(date) => {
                          setFieldValue("fechaVencimiento", date);
                          setShowDateSelect(false);
                        }}
                        onClose={() => setShowDateSelect(false)}
                      />
                    </motion.div>
                  </AnimatePresence>
                )}

                {status && (
                  <div>
                    {status.success && (
                      <p className="success">{status.success}</p>
                    )}
                    {status.error && <p className="error">{status.error}</p>}
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TareaEditForm;
