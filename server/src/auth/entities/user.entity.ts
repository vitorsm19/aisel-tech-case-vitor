import { Role } from '../enums/role.enum';

export interface User {
  id: string;
  username: string;
  password: string;
  role: Role;
}