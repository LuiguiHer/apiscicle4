import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AirportModelo } from '../modelos/airport.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  constructor(
    private http: HttpClient,
    private seguridadService: SeguridadService
  ) { 
    this.token = this.seguridadService.getToken();
  }
  url = "http://localhost:3000"
  token: string = ''

  store(airport: AirportModelo): Observable<AirportModelo> {
    return this.http.post<AirportModelo>(`${this.url}/airports`, {
      Name: airport.Name,
      City: airport.City,
      Country: airport.Country,
      CoordX: airport.CoordX,
      CoordY: airport.CoordY,
      Acronym: airport.Acronym,
      Type: airport.Type
      
    });
  }
/* getAll(): Observable<UsuarioModelo[]>{
    return this.http.get<UsuarioModelo[]>(`${this.url}/usuarios`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }
update(usuario: UsuarioModelo): Observable<UsuarioModelo> {
    return this.http.put<UsuarioModelo>(`${this.url}/usuarios/${usuario.id}`, {
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      telefono: usuario.telefono,
      correo: usuario.correo
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }
delete(id: string): Observable<UsuarioModelo[]>{
    return this.http.delete<UsuarioModelo[]>(`${this.url}/usuarios/${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }
getWithId(id: string): Observable<UsuarioModelo>{
    return this.http.get<UsuarioModelo>(`${this.url}/usuarios/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  } */
}
