import React, { useState } from "react";
import { createPortal } from "react-dom";
import * as SidebarIcons from "../../icons/sidebar";
import { Proyecto } from "../../../types/Proyecto";
import { registrarProyecto } from "../../../api/proyecto/proyectoApi";
import Swal from "sweetalert2";

interface NewProjectFormProps {
  onClose: () => void;
  onSubmit: (projectData: any) => void;
}

export function NewProjectForm({ onClose, onSubmit }: NewProjectFormProps) {
  const [formData, setFormData] = useState<{
    nombre: string;
    descripcion: string;
    prioridad: string;
    fecha_vencimiento: string;
  }>({
    nombre: "",
    descripcion: "",
    prioridad: "1",
    fecha_vencimiento: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const idUsuario = localStorage.getItem("userId");
    if (!idUsuario) {
      Swal.fire({
        title: "Error",
        text: "Usuario no autenticado. Por favor, inicia sesión nuevamente.",
        icon: "error",
        background: "#333",
        color: "#fff",
      });
      return;
    }

    const proyectoData: Proyecto = {
      idUsuario: Number(idUsuario),
      nombreProyecto: formData.nombre,
      descripcionProyecto: formData.descripcion,
      prioridad: Number(formData.prioridad),
      fechaVencimiento: formData.fecha_vencimiento,
    };

    try {
      await registrarProyecto(proyectoData);
      onSubmit(proyectoData);
      onClose();
    } catch (error: any) {
      const errorMessage =
        error.message || "Error desconocido al registrar el proyecto.";

      // Mostrar el error en Swal
      Swal.fire({
        title: "Error al registrar proyecto",
        text: errorMessage,
        icon: "error",
        background: "#333",
        color: "#fff",
      });

      console.error("Error al registrar proyecto:", errorMessage); // Opcional: mantener el log en consola para depuración
    }
  };

  const today = new Date().toISOString().split("T")[0];
  const maxDate = "2050-12-31";

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Añadir proyecto</h2>
          <button
            className="close-button"
            aria-label="onClose"
            onClick={onClose}
          >
            <SidebarIcons.CloseIcon className="icon" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="project-form">
          <div className="project-form-group">
            <label htmlFor="nombre">Nombre del proyecto</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              maxLength={120}
              required
              className="project-form-input"
            />
            <span className="character-count">
              {formData.nombre.length}/120
            </span>
          </div>

          <div className="project-form-group">
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={4}
              className="project-form-input"
            />
          </div>

          <div className="project-form-row">
            <div className="project-form-group">
              <label htmlFor="prioridad">Prioridad</label>
              <select
                id="prioridad"
                name="prioridad"
                value={formData.prioridad}
                onChange={handleChange}
                className="project-form-input"
              >
                <option value="1">Baja</option>
                <option value="2">Media</option>
                <option value="3">Alta</option>
              </select>
            </div>

            <div className="project-form-group">
              <label htmlFor="fecha_vencimiento">Fecha de vencimiento</label>
              <input
                type="date"
                id="fecha_vencimiento"
                name="fecha_vencimiento"
                value={formData.fecha_vencimiento}
                onChange={handleChange}
                min={today}
                max={maxDate}
                className="project-form-input"
              />
            </div>
          </div>

          <div className="project-form-actions">
            <button
              type="button"
              className="project-cancel-button"
              aria-label="onClose"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="project-submit-button"
              aria-label="Crear proyecto"
            >
              Crear proyecto
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
