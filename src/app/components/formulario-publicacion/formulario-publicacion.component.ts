import { Component, OnInit } from '@angular/core'; // Importa Component e OnInit desde el núcleo de Angular
import { CommonModule } from '@angular/common';   // Importa el módulo común de Angular
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';// Importa módulos y clases para formularios reactivos de Angular
import { PublicacionesService } from 'src/app/services/publicaciones';//  Importa el servicio de publicaciones personalizado
import { Router } from '@angular/router'; // Importa el servicio de enrutamiento de Angular
import { addIcons } from 'ionicons'; // Importa la función para agregar iconos de Ionicons
import { camera, save } from 'ionicons/icons'; // Importa los iconos específicos de Ionicons
import { ActivatedRoute } from '@angular/router';//
import { 
  IonHeader, IonToolbar, IonButtons, IonBackButton, 
  IonTitle, IonContent, IonItem, IonLabel, IonInput, 
  IonButton, IonIcon, IonText, IonTextarea 
} from '@ionic/angular/standalone';// Importa componentes de Ionic

// Decorador de componente que define metadatos para el componente
@Component({
  selector: 'app-formulario-publicacion',// Selector del componente
  templateUrl: './formulario-publicacion.component.html',// Ruta al archivo de plantilla HTML
  styleUrls: ['./formulario-publicacion.component.scss'],// Ruta al archivo de estilos SCSS
  standalone: true,// Indica que el componente es independiente
  imports: [ CommonModule, ReactiveFormsModule, IonHeader, IonToolbar, IonButtons, IonBackButton, 
    IonTitle, IonContent, IonItem, IonLabel, IonInput, 
    IonButton, IonIcon, IonText, IonTextarea]// Módulos y componentes que el componente utiliza
})
export class FormularioPublicacionComponent  implements OnInit {// Define la clase del componente que implementa OnInit

  public form: FormGroup;// Propiedad para el formulario reactivo
  public fotoSeleccionada: string = '';// Propiedad para almacenar la foto seleccionada
  public editandoId: number | null = null;//  Propiedad para almacenar el ID de la publicación en edición

  constructor(// Inyección de dependencias en el constructor
    private fb: FormBuilder,//  Inyección del FormBuilder para crear formularios
    private publicacionesService: PublicacionesService,// Inyección del servicio de publicaciones
    private router: Router,// Inyección del servicio de enrutamiento
    private route: ActivatedRoute// Inyección del servicio de ruta activa
  ) { 
    addIcons({camera,save});// Agrega los iconos de Ionicons al proyecto
    // Inicializa el formulario con controles y validaciones
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],// Control para el título con validaciones
      descripcion: ['', [Validators.required, Validators.minLength(20)]]// Control para la descripción con validaciones
    })
  }
  // Método que se ejecuta al inicializar el componente
  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();// Obtiene la navegación actual
    if (navigation?.extras.state) {// Verifica si hay estado en los extras de navegación
      const p = navigation.extras.state['publicacion'];
      this.editandoId = p.id;
      this.fotoSeleccionada = p.imagen;
      this.form.patchValue({
        titulo: p.titulo,
        descripcion: p.descripcion
      });
    }
  }
  // Método para capturar una foto utilizando el servicio de publicaciones
  async capturarFoto(){
    this.fotoSeleccionada = await this.publicacionesService.tomarFoto();
  }
  // Método para guardar o actualizar la publicación
  async guardar(){
    // Verifica si el formulario es válido y si hay una foto seleccionada
    if (this.form.valid && this.fotoSeleccionada){
      const { titulo, descripcion } = this.form.value;
      // Si se está editando una publicación, actualiza; de lo contrario, guarda una nueva
      if (this.editandoId) {
          await this.publicacionesService.actualizarPublicacion(
            this.editandoId,
            titulo,
            descripcion,
            this.fotoSeleccionada
          );
      } else {  // Nueva publicación
          await this.publicacionesService.guardarPublicacion(
            titulo,
            descripcion,
            this.fotoSeleccionada
          );
        }
      this.router.navigate(['/home']);// Navega de vuelta a la página principal después de guardar o actualizar
    }
  }
}
