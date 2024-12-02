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
    <div className="task-form-container">
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
              <ErrorMessage name="nombre" component="div" className="error" />

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
              <TaskPrioritySelect
                currentPriority={values.prioridad}
                onSelect={(priority) => {
                  setFieldValue("prioridad", priority);
                  setShowPrioritySelect(false);
                }}
                onClose={() => setShowPrioritySelect(false)}
              />
            )}

            {showStateSelect && (
              <TaskStateSelect
                currentState={values.estado}
                onSelect={(state) => {
                  setFieldValue("estado", state);
                  setShowStateSelect(false);
                }}
                onClose={() => setShowStateSelect(false)}
              />
            )}

            {showDateSelect && (
              <TaskDateSelect
                currentDate={values.fechaVencimiento}
                onSelect={(date) => {
                  setFieldValue("fechaVencimiento", date);
                  setShowDateSelect(false);
                }}
                onClose={() => setShowDateSelect(false)}
              />
            )}

            {status && (
              <div>
                {status.success && <p className="success">{status.success}</p>}
                {status.error && <p className="error">{status.error}</p>}
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TareaForm;
