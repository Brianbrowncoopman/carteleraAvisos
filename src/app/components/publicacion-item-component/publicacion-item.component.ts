import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonCard, IonCardContent, IonList, IonItem, IonThumbnail, 
  IonLabel, IonNote, IonButton, IonIcon, IonModal, 
  IonHeader, IonToolbar, IonTitle, IonButtons, IonContent 
} from '@ionic/angular/standalone';
import { Publicacion } from '../../models/publicacion.model';
import { addIcons } from 'ionicons';
import { trashOutline, createOutline } from 'ionicons/icons';

@Component({
  selector: 'app-publicacion-item',
  templateUrl: './publicacion-item.component.html',
  standalone: true,
  imports: [
    CommonModule, IonCard, IonCardContent, IonList, IonItem, IonThumbnail, 
    IonLabel, IonNote, IonButton, IonIcon, IonModal, 
    IonHeader, IonToolbar, IonTitle, IonButtons, IonContent
  ]
})
export class PublicacionItemComponent {
  @Input() p!: Publicacion;
  @Output() onDelete = new EventEmitter<number>();
  @Output() onEdit = new EventEmitter<Publicacion>();

  isModalOpen = false;

  constructor() {
    addIcons({ trashOutline, createOutline });
  }

  verDetalle() {
    this.isModalOpen = true;
  }

  cerrarModal() {
    this.isModalOpen = false;
  }

  confirmarEliminacion(id: number) {
    this.onDelete.emit(id);
    this.isModalOpen = false;
  }

  editar() {
    this.onEdit.emit(this.p);
    this.isModalOpen = false;
  }

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
