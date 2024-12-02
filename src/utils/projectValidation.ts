import { Proyecto } from '../types/Proyecto';

export const isValidProject = (proyecto: Proyecto): boolean => {
  return (
    proyecto !== null &&
    proyecto !== undefined &&
    typeof proyecto.idUsuario === 'number' &&
    proyecto.idUsuario > 0 &&
    typeof proyecto.nombreProyecto === 'string' &&
    proyecto.nombreProyecto.trim() !== ''
  );
};

export const filterValidProjects = (projects: Proyecto[]): Proyecto[] => {
  return projects.filter(isValidProject);
};