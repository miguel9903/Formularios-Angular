import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: 'Julian',
    apellido: 'Gomez',
    correo: 'julian@gmail.com',
    pais: 'COL',
    genero: 'M'
  };

  paises: any[] = [];

  constructor( private paisesService: PaisesService ) { }

  ngOnInit(): void {
    this.paisesService.getPaises()
        .subscribe(paises => {
          this.paises = paises;
          this.paises.unshift({
            nombre: 'Seleccione un pais',
            codigo: ''
          });
        });
  }

  guardar(forma: NgForm): void {

    if (forma.invalid) {
      Object.values(forma.controls).forEach(control => {
        control.markAllAsTouched();
      });
      return;
    }

    console.log(forma);
    console.log(forma.value);
  }
}
