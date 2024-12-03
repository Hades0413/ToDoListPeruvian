import React from "react";
import { Field, ErrorMessage } from "formik";
import { Proyecto } from "../../../types/Proyecto";

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

  if (loading) {
    return (
      <div className="form-group">
        <label htmlFor="idProyecto">Proyecto</label>
        <select disabled>
          <option>Cargando proyectos...</option>
        </select>
      </div>
    );
  }

  if (error) {
    return (
      <div className="form-group">
        <label htmlFor="idProyecto">Proyecto</label>
        <select disabled>
          <option>Error al cargar proyectos</option>
        </select>
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="form-group">
      <label htmlFor="idProyecto">Proyecto</label>
      <Field name="idProyecto">
        {() => (
          <select id="idProyecto" onChange={handleChange} value={value || ""}>
            <option key="default" value="">
              Selecciona un proyecto
            </option>
            {proyectos.map((proyecto) => (
              <option
                key={`project-${proyecto.idProyecto}`}
                value={proyecto.idProyecto}
              >
                {proyecto.nombreProyecto}{" "}
              </option>
            ))}
          </select>
        )}
      </Field>
      <ErrorMessage name="idProyecto" component="div" className="error" />
    </div>
  );
};
