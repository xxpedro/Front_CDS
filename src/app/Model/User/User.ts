export class User {
  id!: Number
  name: string | null;
  lastName: string | null;
  pass: string | null;
  roleId: Number | null;

  constructor(
    name: string | null,
    lastName: string | null,
    pass: string | null,
    roleId: Number | null,

  ) {

    this.name = name;
    this.lastName = lastName;
    this.pass = pass;
    this.roleId = roleId;
  }
}
