import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationExtras } from '@angular/router';
import { PublicacionItemComponent } from '../components/publicacion-item-component/publicacion-item.component';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonCard,  IonCardContent,
  IonButton, IonIcon, IonFab, IonFabButton,
  IonModal, IonItem, IonLabel, IonList, IonNote, IonButtons, IonThumbnail,
  AlertController 
} from '@ionic/angular/standalone';
import { PublicacionesService } from '../services/publicaciones';
import { Publicacion } from '../models/publicacion.model';
import { addIcons } from 'ionicons';
import { trashOutline, add, createOutline, alertCircleOutline, time } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    PublicacionItemComponent, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonIcon, 
    IonFab, 
    IonFabButton
  ],
})
export class HomePage implements OnInit {
  publicaciones: Publicacion[] = [];
  publicacionSeleccionada: Publicacion | null = null;
  isModalOpen = false;

  constructor(
    private publicacionesService: PublicacionesService,
    private alertController: AlertController,
    private router: Router,
    private cdRef: ChangeDetectorRef,
  ) {
    addIcons({ trashOutline, add, createOutline, alertCircleOutline });
  }

  async ngOnInit() {
    await this.obtenerPublicaciones();

    setInterval(() => {
      this.cdRef.detectChanges(); 
    }, 60000);
  }

  async ionViewWillEnter() {
    await this.obtenerPublicaciones();
  }

  async obtenerPublicaciones() {
    this.publicaciones = await this.publicacionesService.cargarPublicaciones();
    console.log(`Publicaciones obtenidas:` , this.publicaciones.length);
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

  getColorPorHorario(fecha: any): string {
    const timeStamp = typeof fecha === 'number' ? fecha : Number(fecha);

    if (isNaN(timeStamp) || timeStamp <= 0) {
      console.warn('Fecha inválida:', fecha);
      return 'bg-noche';
    }

    // Creamos un objeto Date basado en el string guardado
    // JS ajustará esto automáticamente a la zona horaria de tu PC
    const fechaPublicacion = new Date(fecha);
    const hora = fechaPublicacion.getHours();

    if (hora >= 0 && hora < 6) return 'bg-madrugada';
    if (hora >= 6 && hora < 12) return 'bg-manana';
    if (hora >= 12 && hora < 18) return 'bg-tarde';
    return 'bg-noche';
  }
}