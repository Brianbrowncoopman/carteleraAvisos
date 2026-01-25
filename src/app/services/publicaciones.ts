import { Injectable } from '@angular/core';// Servicio para gestionar publicaciones
import { Preferences } from '@capacitor/preferences';// Almacenamiento de preferencias
import { Publicacion } from '../models/publicacion.model';//  Modelo de datos para una publicación
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';// Cámara del dispositivo

// Servicio inyectable disponible en toda la aplicación
@Injectable({
  providedIn: 'root',
})
export class PublicacionesService {// Servicio para gestionar publicaciones
  private _publicaciones: Publicacion[] = [];// Lista interna de publicaciones
  private readonly STORAGE_KEY = 'avisos_publicaciones';// Clave de almacenamiento
  private _contadorId = 0;// Contador para generar IDs únicos

  constructor(){}
 // Genera un ID único basado en la marca de tiempo y un contador
  private generarIdUnico():number {
    this._contadorId++;
    return Date.now() + this._contadorId;
  }

 // Toma una foto usando la cámara del dispositivo
  async tomarFoto(): Promise<string> {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    return image.dataUrl || '';
  }
 // Guarda una nueva publicación
  async guardarPublicacion(
    titulo: string,
    descripcion: string,
    imagen: string
  ){

    const ahora = Date.now();// Marca de tiempo actual

    const nueva: Publicacion ={// Nueva publicación
      id: this.generarIdUnico(),
      titulo,
      descripcion,
      imagen,
      fecha: ahora
    };

    console.log(`Guardando: Id=${nueva.id}, Fecha=${new Date(nueva.fecha)
    .toLocaleString()}`);


    this._publicaciones.unshift(nueva);
    await this.sincronizarStorage();
  }
    
  // Carga las publicaciones desde el almacenamiento
  async cargarPublicaciones(): Promise<Publicacion[]>{
    const { value } = await Preferences.get({key: this.STORAGE_KEY });
    this._publicaciones = value ? JSON.parse(value) : [];

    console.log(`Publicaciones cargadas:`, this._publicaciones.length);
    this._publicaciones.forEach(p => {
      console.log(`- ID: ${p.id}, Fecha: ${new Date(p.fecha).toLocaleString()}`);
    });

    return this._publicaciones;
  }
  // Elimina una publicación por su ID
  async eliminarPublicacion(id: number) {
    this._publicaciones = this._publicaciones.filter(p => p.id !== id);
    await this.sincronizarStorage();
  }
  // Actualiza una publicación existente
  async actualizarPublicacion(
    id: number,
    titulo: string,
    descripcion: string,
    imagen: string
  ){
    const index = this._publicaciones.findIndex(p => p.id === id);
    if (index !== -1) {
      console.log(`Actualizando ID: ${id}`);
      this._publicaciones[index] = {
        ...this._publicaciones[index],
        titulo,
        descripcion,
        imagen
      };
      await this.sincronizarStorage();
    }
  }
 // Sincroniza la lista de publicaciones con el almacenamiento
  private async sincronizarStorage() {
    await Preferences.set({
      key: this.STORAGE_KEY,
      value: JSON.stringify(this._publicaciones)
    })
  }
}
