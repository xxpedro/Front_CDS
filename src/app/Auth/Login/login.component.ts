import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthServices } from '../Service/auth-services.service';
import {  Router } from '@angular/router';
import { User } from 'src/app/Model/User/User';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { Auth } from '../ModelAuth/Auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  objUser!: User;
  constructor(private _AuthServices:AuthServices,private fb: FormBuilder,private router: Router,private localStorage:LocalStorageService )
  {
    this.loginForm = this.fb.group({
      name: [null, Validators.required],
      pass: [null, Validators.required],
    });
  }

  async login() {
    if (this.loginForm.valid) {
      const userLogged = this.loginForm.value;
      const authModel = new Auth(userLogged.name, userLogged.pass);

      this._AuthServices.Login(authModel).subscribe(
        (data) => {
          if (data.isAuthenticated) {
            this.localStorage.store("loggeduser", data.user);
            this.router.navigate(['/project']);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Credenciales incorrectas. Por favor, verifica tus datos e intenta de nuevo.',
            });
          }
        },
        (error) => {
          console.error('Error al iniciar sesión:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al iniciar sesión. Por favor, intenta de nuevo.',
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Campos requeridos',
        text: 'Todos los campos son requeridos para iniciar sesión.',
      });
    }
  }
}
