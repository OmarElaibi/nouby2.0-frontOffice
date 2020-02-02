import { Role } from './role.model';

export class User {
  id: number;
  username: string;
  password: string;
  fullName: string;
  email: string;
  role: Role;
}
