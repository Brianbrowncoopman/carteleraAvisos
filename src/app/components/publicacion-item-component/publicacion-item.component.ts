// publicacion-item.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';// Componente para mostrar un item de publicación
import { CommonModule } from '@angular/common';// Módulo común de Angular
import { 
  IonCard, IonCardContent, IonList, IonItem, IonThumbnail, 
  IonLabel, IonNote, IonButton, IonIcon, IonModal, 
  IonHeader, IonToolbar, IonTitle, IonButtons, IonContent 
} from '@ionic/angular/standalone';// Componentes de Ionic
import { Publicacion } from '../../models/publicacion.model';// Modelo de Publicación
import { addIcons } from 'ionicons';// Función para agregar iconos de Ionicons
import { trashOutline, createOutline } from 'ionicons/icons';// Iconos de Ionicons

// Decorador del componente
@Component({
  selector: 'app-publicacion-item',// Selector del componente
  templateUrl: './publicacion-item.component.html',// 
  standalone: true,// Indica que es un componente independiente
  imports: [
    CommonModule, IonCard, IonCardContent, IonList, IonItem, IonThumbnail, 
    IonLabel, IonNote, IonButton, IonIcon, IonModal, 
    IonHeader, IonToolbar, IonTitle, IonButtons, IonContent
  ]// Módulos importados
})
export class PublicacionItemComponent {// Clase del componente
  @Input() p!: Publicacion;// Entrada de datos: publicación
  @Output() onDelete = new EventEmitter<number>();// Salida de datos: evento de eliminación
  @Output() onEdit = new EventEmitter<Publicacion>();// Salida de datos: evento de edición

  isModalOpen = false;// Estado del modal

  constructor() {// Constructor del componente
    addIcons({ trashOutline, createOutline });// Agrega los iconos necesarios
  }
  // Método para ver el detalle de la publicación
  verDetalle() {
    this.isModalOpen = true;
  }
  // Método para cerrar el modal
  cerrarModal() {
    this.isModalOpen = false;
  }
 // Método para confirmar la eliminación de la publicación
  confirmarEliminacion(id: number) {
    this.onDelete.emit(id);
    this.isModalOpen = false;
  }
  // Método para editar la publicación
  editar() {
    this.onEdit.emit(this.p);
    this.isModalOpen = false;
  }
  // Método para obtener el color de fondo según el horario de la publicación
  getColorPorHorario(fecha: any): string {
    const fechaPublicacion = new Date(fecha);
    const hora = fechaPublicacion.getHours();

    if (isNaN(hora)) return 'bg-noche';

    if (hora >= 0 && hora < 6) return 'bg-madrugada';
    if (hora >= 6 && hora < 12) return 'bg-manana';
    if (hora >= 12 && hora < 18) return 'bg-tarde';
    return 'bg-noche';
  }
}
