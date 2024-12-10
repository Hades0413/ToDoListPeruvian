export interface Tarea {
  idTarea?: number;
  idUsuario?: number;
  idProyecto: number;
  nombre: string;
  descripcion: string;
  prioridad: number;
  estado: number;
  fechaVencimiento: string;
  fechaCreacion?: string;
}
