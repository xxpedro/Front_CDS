import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component } from '@angular/core';
import { TaskServices } from '../PagesServices/TasksServices/task-services.service';
import { Task } from 'src/app/Model/Task/Task';
import { ActivatedRoute } from '@angular/router';
import { Status } from 'src/app/Model/Status/Status';
import { NgxPermissionsService } from 'ngx-permissions';
import { PermssionServices } from '../PagesServices/PermissionServices/PermssionServices';
import { LocalStorageService } from 'ngx-webstorage';
import { Permission } from 'src/app/Model/Permission/Permission';
import { BreadcrumbService } from 'xng-breadcrumb';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  tasktForm: FormGroup;
  tasks!:Task []
  parameterId!:number;
  isCreate:boolean = true;
  selectedTaskModel!:Task ;
  filteredTask: Task[] = [];
  filterCriteria: string = '';
  statusSimulation:Status[] = [{name:"Por Hacer"},{name:"En Proceso"},{name:"Completado"}]
  taskDetail!:Task;
  breadcrumbs:any;

constructor(private breadcrumbService: BreadcrumbService,private _localStorage:LocalStorageService,private modalService: NgbModal, private _taskServices:TaskServices, private fb: FormBuilder,private route: ActivatedRoute, private NgxpermissionsService: NgxPermissionsService, private _permissionServices:PermssionServices){
  this.tasktForm = this.fb.group({
    name: [null, Validators.required],
    estado: [null, Validators.required],
  });

  this.urlParameter();
  this.getTask();
  this.getPermissions();
  this.getBreadCrumbs();
}

getPermissions()
{
  this._permissionServices.getUserPermissions().subscribe((data:Permission[]) =>{
    const logueedUser= this._localStorage.retrieve('loggeduser')['roleId'];
    const permisos = data.filter(x => x.roleId === logueedUser) .map(item => item.permiso);
    this.NgxpermissionsService.loadPermissions(permisos);

  })

}
  async CreateTask()
  {
    if (this.tasktForm.valid) {
      const taskData = this.tasktForm.value;
      const objTask = new Task(taskData.name, this.parameterId, taskData.estado);

      try {
        await this._taskServices.createTask(objTask).toPromise();
        Swal.fire('', 'Tarea creada con éxito', 'success');
        this.getTask();
        this.tasktForm.reset();
      } catch (error) {
        console.error('Error al crear la tarea:', error);
        Swal.fire('Error', 'Hubo un error al crear la tarea', 'error');
      }
    } else {
      Swal.fire('Campos incompletos', 'Todos los campos son requeridos', 'error');
    }

  }

  async getTask()
  {
    await this._taskServices.getTask().subscribe(async (response:Task[])=>{
      const filterTask = response.filter(x=>x.projectId == this.parameterId)
      this.tasks = filterTask;
      this.filteredTask =filterTask;
    })
  }

  async urlParameter()
  {
    await this.route.params.subscribe(params => {
      this.parameterId = params['id'];
    });

  }

  async deleteTask(taskId:number)
  {
    Swal.fire({
      title: '¿Seguro que desea eliminar la tarea?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await this._taskServices.deleteTask(taskId).subscribe(() => {
            Swal.fire('', 'Tarea eliminada con éxito', 'success');
            this.getTask();
          }, (error) => {
            console.error('Error al eliminar la tarea:', error);
            Swal.fire('Error', 'Hubo un error al eliminar la tarea', 'error');
          });
        } catch (error) {
          console.error('Error al eliminar la tarea:', error);
          Swal.fire('Error', 'Hubo un error al eliminar la tarea', 'error');
        }
      } else if (result.isDismissed) {
      }
    });

  }

  displayEditModal(taskModel:Task, content:any)
  {
    this.isCreate = false;
    this.modalService.open(content, { centered: true });
    this.isCreate = false;
    this.selectedTaskModel = taskModel;
    delete this.selectedTaskModel.projectId;
    this.tasktForm.setValue(this.selectedTaskModel);
  }

  async editTask()
  {
    try {
      const taskData = this.tasktForm.value;
      const objTask = new Task(taskData.name, this.parameterId, taskData.estado);

      this._taskServices.editTask(this.selectedTaskModel.id, objTask).subscribe(
        (data: Task) => {
          Swal.fire('', 'Tarea editada con éxito', 'success');
          this.getTask();
        },
        (error) => {
          console.error('Error al editar la tarea:', error);
          Swal.fire('Error', 'Hubo un error al editar la tarea', 'error');
        }
      );
    } catch (error) {
      console.error('Error al editar la tarea:', error);
      Swal.fire('Error', 'Hubo un error al editar la tarea', 'error');
    }
  }

  async getCardDetails(contentTask:any, taskModel:Task)
  {
    this.modalService.open(contentTask, { centered: true });
    this.taskDetail = taskModel;
  }

  displayCreateModal(content:any) {
    this.tasktForm.reset();
    this.isCreate = true;
    this.modalService.open(content, { centered: true });
  }

  filterTask() {
    this.filteredTask= this.tasks.filter(task => task.name.includes(this.filterCriteria));
  }

  getBreadCrumbs()
  {
    this.breadcrumbService.breadcrumbs$.subscribe((breadcrumbs) => {
      this.breadcrumbs = breadcrumbs;
    });
  }


}
