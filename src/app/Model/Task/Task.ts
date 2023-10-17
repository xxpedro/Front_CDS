export class Task {
  id!:number;
  name: string;
  projectId?: number;
  estado!:string;

  constructor(name: string, projectId: number, estado:string) {
    this.name = name;
    this.projectId = projectId;
    this.estado = estado;
  }
}
