import { Component, OnInit } from '@angular/core';
import { Publicacion } from '../models/publicacion.model';
import { PublicacionesService } from '../services/publicaciones';
import { addIcons } from 'ionicons';
import { add, trashOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent,
  IonButton, IonIcon, IonFab, IonFabButton 
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

  constructor(private publicacionesService: PublicacionesService) {
    addIcons({ trashOutline, add });
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
    await this.publicacionesService.eliminarPublicacion(id);
    await this.obtenerPublicaciones();
  }
}
