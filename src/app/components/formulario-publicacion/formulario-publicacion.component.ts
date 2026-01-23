import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublicacionesService } from 'src/app/services/publicaciones';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { camera, save } from 'ionicons/icons';
import { ActivatedRoute } from '@angular/router';
import { 
  IonHeader, IonToolbar, IonButtons, IonBackButton, 
  IonTitle, IonContent, IonItem, IonLabel, IonInput, 
  IonButton, IonIcon, IonText, IonTextarea 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-formulario-publicacion',
  templateUrl: './formulario-publicacion.component.html',
  styleUrls: ['./formulario-publicacion.component.scss'],
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, IonHeader, IonToolbar, IonButtons, IonBackButton, 
    IonTitle, IonContent, IonItem, IonLabel, IonInput, 
    IonButton, IonIcon, IonText, IonTextarea]
})
export class FormularioPublicacionComponent  implements OnInit {

  public form: FormGroup;
  public fotoSeleccionada: string = '';
  public editandoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private publicacionesService: PublicacionesService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    addIcons({ camera, save })

    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.minLength(20)]]
    })
  }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const p = navigation.extras.state['publicacion'];
      this.editandoId = p.id;
      this.fotoSeleccionada = p.imagen;
      this.form.patchValue({
        titulo: p.titulo,
        descripcion: p.descripcion
      });
    }
  }

  async capturarFoto(){
    this.fotoSeleccionada = await this.publicacionesService.tomarFoto();
  }

  async guardar(){
    if (this.form.valid && this.fotoSeleccionada){
      const { titulo, descripcion } = this.form.value;

      if (this.editandoId) {
          await this.publicacionesService.actualizarPublicacion(
            this.editandoId,
            titulo,
            descripcion,
            this.fotoSeleccionada
          );
      } else {  
          await this.publicacionesService.guardarPublicacion(
            titulo,
            descripcion,
            this.fotoSeleccionada
          );
        }
      this.router.navigate(['/home']);
    }
  }
}
