

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';// Importaciones necesarias de Angular e Ionic
import { CommonModule } from '@angular/common';// Módulo común de Angular
import { RouterModule, Router, NavigationExtras } from '@angular/router';// Módulos para enrutamiento
import { PublicacionItemComponent } from '../components/publicacion-item-component/publicacion-item.component';// Componente personalizado para mostrar una publicación
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonCard,  IonCardContent,
  IonButton, IonIcon, IonFab, IonFabButton,
  IonModal, IonItem, IonLabel, IonList, IonNote, IonButtons, IonThumbnail,
  AlertController 
} from '@ionic/angular/standalone';// Componentes de Ionic
import { PublicacionesService } from '../services/publicaciones';// Servicio para manejar publicaciones
import { Publicacion } from '../models/publicacion.model';//  
import { addIcons } from 'ionicons';// Función para agregar iconos personalizados
import { trashOutline, add, createOutline, alertCircleOutline, time } from 'ionicons/icons';//  Iconos de Ionicons

// Decorador del componente HomePage
@Component({
  selector: 'app-home',// Selector del componente
  templateUrl: 'home.page.html',// Ruta al archivo HTML del componente
  styleUrls: ['home.page.scss'],// Ruta al archivo SCSS del componente
  standalone: true,// Indica que es un componente independiente
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
  ],// Módulos importados para el componente
})
export class HomePage implements OnInit {// Clase del componente HomePage que implementa OnInit
  publicaciones: Publicacion[] = [];// Array para almacenar las publicaciones
  publicacionSeleccionada: Publicacion | null = null;// Publicación seleccionada para ver detalles
  isModalOpen = false;// Estado del modal para ver detalles de la publicación

  // Constructor del componente
  constructor(
    private publicacionesService: PublicacionesService,// Servicio para manejar publicaciones
    private alertController: AlertController,// Controlador de alertas de Ionic
    private router: Router,// Servicio de enrutamiento de Angular
    private cdRef: ChangeDetectorRef,// Servicio para detectar cambios en la vista
  ) {
    addIcons({ trashOutline, add, createOutline, alertCircleOutline });// Agrega iconos personalizados
  }

  // Método ngOnInit que se ejecuta al inicializar el componente
  async ngOnInit() {
    await this.obtenerPublicaciones();
    // Actualiza la vista cada minuto para reflejar cambios en los horarios
    setInterval(() => {
      this.cdRef.detectChanges(); 
    }, 60000);
  }

  // Método que se ejecuta cada vez que la vista está a punto de entrar
  async ionViewWillEnter() {
    await this.obtenerPublicaciones();
  }

  // Método para obtener las publicaciones desde el servicio
  async obtenerPublicaciones() {
    this.publicaciones = await this.publicacionesService.cargarPublicaciones();
    console.log(`Publicaciones obtenidas:` , this.publicaciones.length);
  }

  // Método para ver los detalles de una publicación
  verDetalle(p: Publicacion) {
    this.publicacionSeleccionada = p;
    this.isModalOpen = true;
  }

  /*cerrarModal() {
    this.isModalOpen = false;
  }*/

   // Método para confirmar la eliminación de una publicación 
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
    await alert.present();// Muestra la alerta de confirmación
  }

  // Método para cerrar el modal de detalles
  cerrarModal() {
    this.isModalOpen = false;
  }

  // Método para editar una publicación
  editar(publicacion: Publicacion) {
    this.isModalOpen = false;
    // Navega a la página de edición pasando la publicación como estado
    const extras: NavigationExtras = {
      state: { publicacion }
    };
    setTimeout(() => {// Retardo para asegurar que el modal se cierre antes de navegar
      this.router.navigate(['/nuevo'], extras);
    }, 300)
    
  }

  // Método para obtener el color de fondo según la hora de la publicación
  getColorPorHorario(fecha: any): string {
    const timeStamp = typeof fecha === 'number' ? fecha : Number(fecha);

    // Verificamos si la conversión fue exitosa
    if (isNaN(timeStamp) || timeStamp <= 0) {
      console.warn('Fecha inválida:', fecha);
      return 'bg-noche';
    }

    
    const fechaPublicacion = new Date(fecha);// Convertimos el timestamp a un objeto Date
    const hora = fechaPublicacion.getHours();// 
    // Determinamos el color según el rango horario
    if (hora >= 0 && hora < 6) return 'bg-madrugada';
    if (hora >= 6 && hora < 12) return 'bg-manana';
    if (hora >= 12 && hora < 18) return 'bg-tarde';
    return 'bg-noche';
  }
}