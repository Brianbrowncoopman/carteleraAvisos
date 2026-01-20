import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublicacionesService } from 'src/app/services/publicaciones';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { camera, save } from 'ionicons/icons';

@Component({
  selector: 'app-formulario-publicacion',
  templateUrl: './formulario-publicacion.component.html',
  styleUrls: ['./formulario-publicacion.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class FormularioPublicacionComponent  implements OnInit {

  public form: FormGroup;
  public fotoSeleccionada: string = '';

  constructor(
    private fb: FormBuilder,
    private publicacionesService: PublicacionesService,
    private router: Router
  ) { 
    addIcons({ camera, save })

    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.minLength(20)]]
    })
  }

  ngOnInit() {}

  async capturarFoto(){
    this.fotoSeleccionada = await this.publicacionesService.tomarFoto();
  }

  async guardar(){
    if (this.form.valid && this.fotoSeleccionada){
      const { titulo, descripcion } = this.form.value;
      await this.publicacionesService.guardarPublicacion(
        titulo,
        descripcion,
        this.fotoSeleccionada
      );
      this.router.navigate(['/home']);
    }
  }
}
