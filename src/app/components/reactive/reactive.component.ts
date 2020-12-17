import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private validadores: ValidadoresService) {
    this.crearFormulario();
    this.cargarDatosFormulario();
    this.crearListeners();
   }

  ngOnInit(): void {
  }

  get pasatiempos(): any {
    return this.forma.get('pasatiempos') as FormArray;
  }

  get nombreNoValido(): boolean {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }

  get apellidoNoValido(): boolean {
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched;
  }

  get correoNoValido(): boolean {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }

  get usuarioNoValido(): boolean {
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched;
  }

  get distritoNoValido(): boolean {
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched;
  }

  get ciudadNoValida(): boolean {
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched;
  }

  get pass1Invalida(): boolean {
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched;
  }

  get pass2Invalida(): boolean {
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;
    return (pass1 === pass2) ? false : true;
  }

  crearFormulario(): void {
    this.forma = this.formBuilder.group({
      // Prametros: valor por defecto, validadores sincronos, validadores asincronos
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, this.validadores.noHerrera]],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      usuario: ['', , this.validadores.existeUsuario],
      direccion: this.formBuilder.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required]
      }),
      pasatiempos: this.formBuilder.array([])
    },{
      validators: this.validadores.passwordsIguales('pass1', 'pass2')
    });
  }

  crearListeners(){
    /*this.forma.valueChanges.subscribe(valor => {
      console.log(valor);
    });

    this.forma.statusChanges.subscribe(status => console.log(status));*/
    this.forma.get('nombre').valueChanges.subscribe(console.log);
  }

  cargarDatosFormulario(): void {
    // this.forma.setValue({
      this.forma.reset({
      nombre: 'Julian',
      apellido: 'Rodriguez',
      correo: 'julian@gmail.com',
      pass1: '123',
      pass2: '123',
      direccion: {
        distrito: 'Cra. 30  24A-50',
        ciudad: 'Bogotá D.C.'
      }
    });
    //['Comer', 'Dormir'].forEach(valor => this.pasatiempos.push(this.formBuilder.control(valor)));
  }

  agregarPasatiempo(): void {
    this.pasatiempos.push(this.formBuilder.control('Nuevo elemento'));
  }

  borrarPasatiempo(index: number): void {
    this.pasatiempos.removeAt(index);
  }

  guardar(): void {
    console.log(this.forma);
    if (this.forma.invalid) {
       Object.values(this.forma.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(ctr => ctr.markAllAsTouched());
        } else {
          control.markAllAsTouched();
        }
      });
    }
    // Posteo de informacion
    //this.forma.reset({
      //nombre: 'Sin nombre'
    //});
  }
}
