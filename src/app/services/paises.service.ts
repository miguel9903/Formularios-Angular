import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  constructor(private http: HttpClient) { }

  getPaises(): any {
    return this.http.get('https://restcountries.eu/rest/v2/lang/es')
      .pipe(map( (res: any[]) => {
        return res.map(pais => {
          return {
            nombre: pais.name,
            codigo: pais.alpha3Code
          }
        });
      }));
  }
}
