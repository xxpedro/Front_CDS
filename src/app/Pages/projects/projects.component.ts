import { Permission } from './../../Model/Permission/Permission';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, } from '@angular/core';
import { NgbModal,  } from '@ng-bootstrap/ng-bootstrap';
import { Project } from 'src/app/Model/Project/Project';
import { ProjectServices } from '../PagesServices/ProjectServices/project-services';
import { NgxPermissionsService } from 'ngx-permissions';
import { PermssionServices } from '../PagesServices/PermissionServices/PermssionServices';
import { LocalStorageService } from 'ngx-webstorage';
import { BreadcrumbService } from 'xng-breadcrumb';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})


export class ProjectsComponent {
  projectForm: FormGroup;
  objProject!: Project;
  projects!:Project []
  selectedProjectModel!:Project;
  isCreate:boolean = true;
  filteredProjects: Project[] = [];
  filterCriteria: string = '';
  breadcrumbs:any;
  constructor(private breadcrumbService: BreadcrumbService ,private _localStorage:LocalStorageService ,private modalService: NgbModal,private fb: FormBuilder, private _projectServices:ProjectServices, private NgxpermissionsService: NgxPermissionsService, private _permissionServices:PermssionServices)
  {
    this.projectForm = this.fb.group({
      name: [null, Validators.required]
    });

  }

  ngOnInit(): void {
    this.getBreadCrumbs();
    this.getProjects();
    this.getPermissions();
  }

  async getPermissions()
  {
    await this._permissionServices.getUserPermissions().subscribe((data:Permission[]) =>{
      const logueedUser= this._localStorage.retrieve('loggeduser')['roleId'];
      const permisos = data.filter(x => x.roleId === logueedUser) .map(item => item.permiso);
      this.NgxpermissionsService.loadPermissions(permisos);

    })
  }

  abrirModal(content:any) {
    this.modalService.open(content, { centered: true });
  }

  async CreateProject()
  {
    if (this.projectForm.valid) {
      const projectData = this.projectForm.value;
      this.objProject = new Project(projectData.name);
      this._projectServices.createProject(this.objProject).subscribe(
        () => {
          Swal.fire('', 'Proyecto creado con éxito', 'success');
          this.filteredProjects.push(this.objProject);
          this.getProjects();
          this.projectForm.reset();
          this.modalService.open({ centered: true }).close();
        },
        (error) => {
          console.error('Error al crear el proyecto:', error);
          Swal.fire('Error', 'Hubo un error al crear el proyecto', 'error');
        }
      );
    } else {
      Swal.fire('Campos incompletos', 'Necesita llenar todos los campos', 'error');
    }
  }

  async getProjects()
  {
    await this._projectServices.getProject().subscribe(async (response:Project[])=>{
      this.projects = response;
      this.filteredProjects = response
    })
  }

  async deleteProject(ProjectId:number)
  {
    Swal.fire({
      title: '¿Seguro que desea eliminar el proyecto?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await this._projectServices.deleteProject(ProjectId).toPromise();
          Swal.fire('', 'Proyecto eliminado con éxito', 'success');
          this.getProjects();
        } catch (error) {
          console.error('Error al eliminar el proyecto:', error);
          Swal.fire('Error', 'Hubo un error al eliminar el proyecto', 'error');
        }
      } else if (result.isDismissed) {
      }
    });

  }


  displayEditModal(projectModel:Project, content:any)
  {
    this.isCreate = false;
    this.modalService.open(content, { centered: true });
    this.isCreate = false;
    this.selectedProjectModel = projectModel;
     this.projectForm.setValue(this.selectedProjectModel);
  }

  async editProject()
  {
    try {
      debugger
      if (this.projectForm.valid) {
        const projectData = this.projectForm.value;
        const objProject = new Project(projectData.name);
        debugger
        const data: Project | undefined = await this._projectServices.editProject(this.selectedProjectModel.id, objProject).toPromise();

        if (data) {
          Swal.fire('', 'Proyecto editado con éxito', 'success');
          this.getProjects();
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

  displayCreateModal(content:any) {
    this.projectForm.reset();
    this.isCreate = true;
    this.modalService.open(content, { centered: true });
  }

  filterProjects() {
    this.filteredProjects = this.projects.filter(project => project.name.includes(this.filterCriteria));
  }

  getBreadCrumbs()
  {
    this.breadcrumbService.breadcrumbs$.subscribe((breadcrumbs) => {
      this.breadcrumbs = breadcrumbs;
      ;

    });
  }
}
