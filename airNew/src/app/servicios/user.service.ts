import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioModelo } from '../modelos/usuario.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private seguridadService: SeguridadService
  ) { 
    this.token = this.seguridadService.getToken();
  }
  url = "http://localhost:3000"
  token: string = ''



  store(usuario: UsuarioModelo): Observable<UsuarioModelo> {
    return this.http.post<UsuarioModelo>(`${this.url}/users`, {
      Name: usuario.Name,
      lastName: usuario.lastName,
      phone: usuario.phone,
      email: usuario.email
    });
  }
getAll(): Observable<UsuarioModelo[]>{
    return this.http.get<UsuarioModelo[]>(`${this.url}/users`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }
update(usuario: UsuarioModelo): Observable<UsuarioModelo> {
    return this.http.put<UsuarioModelo>(`${this.url}/users/${usuario.Id}`, {
      Name: usuario.Name,
      lastName: usuario.lastName,
      phone: usuario.phone,
      email: usuario.email
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }
delete(id: string): Observable<UsuarioModelo[]>{
    return this.http.delete<UsuarioModelo[]>(`${this.url}/users/${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

getWithId(id: string): Observable<UsuarioModelo>{
    return this.http.get<UsuarioModelo>(`${this.url}/users/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
    
  }





}
