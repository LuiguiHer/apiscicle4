import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModelo } from 'src/app/modelos/usuario.model';
import { UserService } from 'src/app/servicios/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router

  ) { }

  fgValidacion = this.fb.group({
    Name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });


  ngOnInit(): void {
  }

  store(){
    let usuario = new UsuarioModelo();
    usuario.Name = this.fgValidacion.controls["Name"].value;
    usuario.lastName = this.fgValidacion.controls["lastName"].value;
    usuario.email = this.fgValidacion.controls["email"].value;
    usuario.phone = this.fgValidacion.controls["phone"].value;
 
    this.userService.store(usuario).subscribe((data: UsuarioModelo)=> {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/admin/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

}
