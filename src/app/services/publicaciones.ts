import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Publicacion } from '../models/publicacion.model';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class PublicacionesService {
  private _publicaciones: any[] = [];
  private readonly STORAGE_KEY = 'avisos_publicaciones';

  constructor(){}

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
    const nueva: Publicacion ={
      id: Date.now(),
      titulo,
      descripcion,
      imagen,
      fecha: new Date()
    };
    this._publicaciones.unshift(nueva);
    await this.sincronizarStorage();
  }
    
  async cargarPublicaciones(): Promise<Publicacion[]>{
    const { value } = await Preferences.get({key: this.STORAGE_KEY });
    this._publicaciones = value ? JSON.parse(value) : [];
    return this._publicaciones;
  }

  async aliminarPublicacion(id: number) {
    this._publicaciones = this._publicaciones.filter(p => p.id !== id);
    await this.sincronizarStorage();
  }

  private async sincronizarStorage() {
    await Preferences.set({
      key: this.STORAGE_KEY,
      value: JSON.stringify(this._publicaciones)
    })
  }
}
