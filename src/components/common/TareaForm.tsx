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

interface TareaFormProps {
  onClose: () => void;
  projectId?: number;
}

interface TareaFormValues extends Omit<Tarea, "idProyecto"> {
  idProyecto: number;
}

const TareaForm: React.FC<TareaFormProps> = ({ onClose, projectId }) => {
  const [showPrioritySelect, setShowPrioritySelect] = useState(false);
  const [showStateSelect, setShowStateSelect] = useState(false);
  const [showDateSelect, setShowDateSelect] = useState(false);
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);

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

    fetchProyectos();
  }, []);

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
      .min(
        new Date(),
        "La fecha de vencimiento no puede ser anterior a la fecha actual"
      )
      .required("La fecha de vencimiento es obligatoria"),
  });

  const handleSubmit = async (
    values: TareaFormValues,
    { setSubmitting, setStatus }: any
  ) => {
    try {
      await tareaService.createTarea(values);
      // Show SweetAlert success message
      Swal.fire({
        title: "Tarea registrada correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
        background: "#333", // Fondo oscuro
        color: "#fff", // Texto blanco
      }).then(() => {
        // Reload the page or update the task list
        window.location.reload(); // Reload the page to show the new task
      });
      setStatus({ success: "Tarea creada correctamente" });
      onClose();
    } catch (error) {
      console.error("Error al crear la tarea:", error);
      setStatus({ error: "Error al crear la tarea. Intenta nuevamente." });
    } finally {
      setSubmitting(false);
    }
  };

  const closeAllSelects = () => {
    setShowPrioritySelect(false);
    setShowStateSelect(false);
    setShowDateSelect(false);
  };

  const initialValues: TareaFormValues = {
    idProyecto: projectId || 0,
    nombre: "",
    descripcion: "",
    prioridad: 1,
    estado: 1,
    fechaVencimiento: new Date().toISOString().split("T")[0],
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

export default TareaForm;
