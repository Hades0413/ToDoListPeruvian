export interface Tarea {
  idTarea?: number;
  idProyecto: number;
  nombre: string;
  descripcion: string;
  prioridad: number;
  estado: number;
  fechaVencimiento: string;
  fechaCreacion?: string;
}
