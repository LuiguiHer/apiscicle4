import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioModelo } from 'src/app/modelos/usuario.model';
import { UserService } from 'src/app/servicios/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  fgValidacion = this.fb.group({
    id: ['', [Validators.required]],
    Name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
  });

  id: string=''

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.buscarRegistro(this.id);
  }

  buscarRegistro(id: string){
    this.userService.getWithId(id).subscribe((data: UsuarioModelo) => {
      console.log(data)
      this.fgValidacion.controls["id"].setValue(id)
      this.fgValidacion.controls["Name"].setValue(data.Name)
      this.fgValidacion.controls["lastName"].setValue(data.lastName)
      this.fgValidacion.controls["email"].setValue(data.email)
      this.fgValidacion.controls["phone"].setValue(data.phone)
    })
  }
  edit(){
    let usuario = new UsuarioModelo();
    usuario.Id = this.fgValidacion.controls["id"].value;
    usuario.Name = this.fgValidacion.controls["Name"].value;
    usuario.lastName = this.fgValidacion.controls["lastName"].value;
    usuario.email = this.fgValidacion.controls["email"].value;
    usuario.phone = this.fgValidacion.controls["phone"].value;
 
    this.userService.update(usuario).subscribe((data: UsuarioModelo)=> {
      Swal.fire('Editado Correctamente!', '', 'success')
      this.router.navigate(['/admin/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }


  
}
