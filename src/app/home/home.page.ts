import { Component, OnInit } from '@angular/core';
import { Publicacion } from '../models/publicacion.model';
import { PublicacionesService } from '../services/publicaciones';
import { addIcons } from 'ionicons';
import { add, trashOutline,createOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationExtras } from '@angular/router'; 
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
  IonButton, IonIcon, IonFab, IonFabButton, AlertController
} from '@ionic/angular/standalone';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, 
    RouterModule,
    IonHeader, IonToolbar, IonTitle, IonContent, 
    IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
    IonButton, IonIcon, IonFab, IonFabButton],
})
export class HomePage implements OnInit {
  publicaciones: Publicacion[] = [];

  constructor(
    private publicacionesService: PublicacionesService,
    private router: Router,
    private alertController: AlertController
  ) {
    addIcons({ trashOutline, add, createOutline });
  }

  async ngOnInit() {
    await this.obtenerPublicaciones()
  }

  async ionViewWillEnter(){
    await this.obtenerPublicaciones()
  }

  async obtenerPublicaciones(){
    this.publicaciones = await this.publicacionesService.cargarPublicaciones();
  }

  async confirmarEliminacion(id: number){
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar esta publicación?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, 
        {
          text: 'Eliminar',
          handler: async () => {
            await this.publicacionesService.eliminarPublicacion(id);
            await this.obtenerPublicaciones();
          }
        }
      ]
    });
    await alert.present();
  }

  editar(publicacion: Publicacion){
    const extras: NavigationExtras = {
    state: { publicacion } 
  };
    this.router.navigate(['/nuevo'], extras);
  }
}
