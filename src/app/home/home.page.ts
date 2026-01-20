import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationExtras } from '@angular/router';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
  IonButton, IonIcon, IonFab, IonFabButton,
  IonModal, IonItem, IonLabel, IonList, IonNote, IonButtons, IonThumbnail,
  AlertController 
} from '@ionic/angular/standalone';
import { PublicacionesService } from '../services/publicaciones';
import { Publicacion } from '../models/publicacion.model';
import { addIcons } from 'ionicons';
import { trashOutline, add, createOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    IonHeader, IonToolbar, IonTitle, IonContent, 
    IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
    IonButton, IonIcon, IonFab, IonFabButton,
    IonModal, IonItem, IonLabel, IonList, IonNote, IonButtons,IonThumbnail
  ],
})
export class HomePage implements OnInit {
  publicaciones: Publicacion[] = [];
  publicacionSeleccionada: Publicacion | null = null;
  isModalOpen = false;

  constructor(
    private publicacionesService: PublicacionesService,
    private alertController: AlertController,
    private router: Router
  ) {
    addIcons({ trashOutline, add, createOutline });
  }

  async ngOnInit() {
    await this.obtenerPublicaciones();
  }

  async ionViewWillEnter() {
    await this.obtenerPublicaciones();
  }

  async obtenerPublicaciones() {
    this.publicaciones = await this.publicacionesService.cargarPublicaciones();
  }

  // ESTE ES EL MÉTODO QUE TE FALTABA
  verDetalle(p: Publicacion) {
    this.publicacionSeleccionada = p;
    this.isModalOpen = true;
  }

  /*cerrarModal() {
    this.isModalOpen = false;
  }*/

  async confirmarEliminacion(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas borrar este aviso?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: async () => {
            await this.publicacionesService.eliminarPublicacion(id);
            await this.obtenerPublicaciones();
            this.isModalOpen = false; // Cerramos el modal si se borra desde ahí
          }
        }
      ]
    });
    await alert.present();
  }

  cerrarModal() {
    this.isModalOpen = false;
  }


 

  editar(publicacion: Publicacion) {
    this.isModalOpen = false;

    const extras: NavigationExtras = {
      state: { publicacion }
    };
    setTimeout(() => {
      this.router.navigate(['/nuevo'], extras);
    }, 300)
    
  }

  getColorPorHorario(fecha: Date | string): string {
    const date = new Date(fecha);
    const hora = date.getHours();

    if (hora >= 0 && hora < 6) {
      return 'bg-madrugada'; 
    } else if (hora >= 6 && hora < 12) {
      return 'bg-manana';
    } else if (hora >= 12 && hora < 18){
      return 'bg-tarde'; 
    } else {
      return 'bg-noche'
    }
  }
}