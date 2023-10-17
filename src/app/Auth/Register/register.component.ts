
import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthServices } from '../Service/auth-services.service';
import { User } from 'src/app/Model/User/User';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  objUser!: User;

  constructor(private fb: FormBuilder,private _AuthServices:AuthServices,private router: Router) {
      this.registerForm = this.fb.group({
        name: [null, Validators.required],
        lastName: [null, Validators.required],
        pass: [null, Validators.required],

      });
  }


  async registerUser() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
      this.objUser = new User(userData.name, userData.lastName, userData.pass, 2);

      await this._AuthServices.registerUser(this.objUser).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'Usuario creado',
            text: 'El usuario se ha creado con éxito.',
          });
          this.registerForm.reset();
        },
        (error) => {
          console.error('Error al crear usuario:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al crear el usuario. Por favor, inténtalo de nuevo.',
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Campos requeridos',
        text: 'Todos los campos son requeridos para crear un usuario.',
      });
    }
  }


}
