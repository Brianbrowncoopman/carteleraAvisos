// src/app/models/publicacion.model.ts
export interface Publicacion {// Modelo de datos para una publicación
    id: number; // Identificador único de la publicación
    titulo: string;// Título de la publicación
    descripcion: string;// Descripción detallada de la publicación
    imagen: string;//   URL de la imagen asociada a la publicación
    fecha: number;// Marca de tiempo de la publicación
}  