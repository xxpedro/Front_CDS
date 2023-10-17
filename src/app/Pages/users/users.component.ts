import { Role } from './../../Model/Role/Role';
import { RoleServices } from './../PagesServices/RoleServices/roleServices';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServicesService } from '../PagesServices/UsersServices/user-services.service';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/User/User';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  userForm: FormGroup;
  objUser!: User;
  filteredUsers!:User[];
  users!:User[];
  isCreate:boolean = true;
  selectedUserModel!:User;
  filteredUser: User[] = [];
  filterCriteria: string = '';
  allRolls:Role[] =[]
  constructor(private modalService: NgbModal,private fb: FormBuilder,private _userServices:UserServicesService,private _role:RoleServices,private router: Router) {
    this.userForm = this.fb.group({
      name: [null, Validators.required],
      lastName: [null, Validators.required],
      roleId: [null, Validators.required],
      pass: [null, Validators.required],

    });
}

  ngOnInit(): void {
    this.getUsers();
    this.getAllRolls();
  }

  async createUser()
  {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      this.objUser = new User(userData.name, userData.lastName, userData.pass, 1);
      await this._userServices.createUser(this.objUser).subscribe(
        () => {
          Swal.fire('Éxito', 'Usuario creado con éxito', 'success');
          this.getUsers();
          this.userForm.reset();
        },
        (error) => {
          Swal.fire('Error', 'Error al crear usuario', 'error');
        }
      );
    }
    else
    {
      Swal.fire('', 'Todos los campos son requeridos', 'info');
    }
  }

  async getUsers() {
    await this._userServices.getUser().subscribe(
      (data: User[]) => {
        this.users = data;
        this.filteredUsers = this.users;
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
        Swal.fire('Error', 'Ocurrió un error al obtener usuarios', 'error');
      }
    );

  }
  async editUser() {
    try {
      if (this.userForm.valid) {
        const userData = this.userForm.value;
        const objUser = new User(userData.name, userData.lastName, userData.pass, userData.roleId);
        const data: User | undefined = await this._userServices.editUser(this.selectedUserModel.id, objUser).toPromise();
        if (data) {
          Swal.fire('', 'Proyecto editado con éxito', 'success');
          this.getUsers();
        } else {
          Swal.fire('Error', 'El proyecto no pudo ser editado', 'error');
        }
      } else {
        Swal.fire('Campos incompletos', 'Necesita llenar todos los campos', 'error');
      }
    } catch (error) {
      console.error('Error al editar el proyecto:', error);
      Swal.fire('Error', 'Hubo un error al editar el proyecto', 'error');
    }
  }

  deleteUser(userId:User) {
    Swal.fire({
      title: '¿Seguro que desea eliminar el usuario?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await this._userServices.deleteUser(userId.id).toPromise();
          Swal.fire('', 'usuario eliminado con éxito', 'success');
          this.getUsers();
        } catch (error) {
          console.error('Error al eliminar el usuario:', error);
          Swal.fire('Error', 'Hubo un error al eliminar el usuario', 'error');
        }
      } else if (result.isDismissed) {
      }
    });

  }

  async getAllRolls(){
    await this._role.getRole().subscribe((data:Role[])=>{
      this.allRolls= data;
    })
  }

  filterUsers(event:any) {


  }

  displayCreateModal(content:any) {
    this.userForm.reset();
    this.isCreate = true;
    this.modalService.open(content, { centered: true });
  }

  displayEditModal(projectModel:User, content:any)
  {
    this.isCreate = false;
    this.modalService.open(content, { centered: true });
    this.isCreate = false;
    this.selectedUserModel = projectModel;
    this.userForm.setValue(this.selectedUserModel);
  }
}
