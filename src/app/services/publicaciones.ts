import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Publicacion } from '../models/publicacion.model';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class PublicacionesService {
  private _publicaciones: Publicacion[] = [];
  private readonly STORAGE_KEY = 'avisos_publicaciones';
  private _contadorId = 0;

  constructor(){}

  private generarIdUnico():number {
    this._contadorId++;
    return Date.now() + this._contadorId;
  }


  async tomarFoto(): Promise<string> {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    return image.dataUrl || '';
  }

  async guardarPublicacion(
    titulo: string,
    descripcion: string,
    imagen: string
  ){

    const ahora = Date.now();

    const nueva: Publicacion ={
      id: this.generarIdUnico(),
      titulo,
      descripcion,
      imagen,
      fecha: ahora
    };

    console.log(`Guardando: Id=${nueva.id}, Fecha=${new Date(nueva.fecha).toLocaleString()}`);


    this._publicaciones.unshift(nueva);
    await this.sincronizarStorage();
  }
    
  async cargarPublicaciones(): Promise<Publicacion[]>{
    const { value } = await Preferences.get({key: this.STORAGE_KEY });
    this._publicaciones = value ? JSON.parse(value) : [];

    console.log(`Publicaciones cargadas:`, this._publicaciones.length);
    this._publicaciones.forEach(p => {
      console.log(`- ID: ${p.id}, Fecha: ${new Date(p.fecha).toLocaleString()}`);
    });

    return this._publicaciones;
  }

  async eliminarPublicacion(id: number) {
    this._publicaciones = this._publicaciones.filter(p => p.id !== id);
    await this.sincronizarStorage();
  }

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

  private async sincronizarStorage() {
    await Preferences.set({
      key: this.STORAGE_KEY,
      value: JSON.stringify(this._publicaciones)
    })
  }
}
