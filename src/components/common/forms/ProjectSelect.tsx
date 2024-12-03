import React from "react";
import { Field, ErrorMessage } from "formik";
import { Proyecto } from "../../../types/Proyecto";
import "../../../styles/forms/project-select.css";

interface ProjectSelectProps {
  proyectos: Proyecto[];
  value: number;
  onChange: (value: number) => void;
  loading?: boolean;
  error?: string | null;
}

export const ProjectSelect: React.FC<ProjectSelectProps> = ({
  proyectos,
  value,
  onChange,
  loading = false,
  error = null,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const numericValue = selectedValue ? parseInt(selectedValue, 10) : 0;
    onChange(numericValue);
  };

  return (
    <div className="project-select">
      <label htmlFor="idProyecto">Proyecto</label>
      <Field name="idProyecto">
        {() => (
          <div className="select-wrapper">
            <select
              id="idProyecto"
              onChange={handleChange}
              value={value || ""}
              disabled={loading || !!error}
            >
              <option key="default" value="">
                {loading
                  ? "Cargando proyectos..."
                  : error
                  ? "Error al cargar proyectos"
                  : "Selecciona un proyecto"}
              </option>
              {!loading &&
                !error &&
                proyectos.map((proyecto) => (
                  <option
                    key={`project-${proyecto.idProyecto}`}
                    value={proyecto.idProyecto}
                  >
                    {proyecto.nombreProyecto}
                  </option>
                ))}
            </select>
          </div>
        )}
      </Field>
      <ErrorMessage name="idProyecto" component="div" className="error" />
    </div>
  );
};
