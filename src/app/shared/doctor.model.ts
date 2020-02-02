import { User } from './user.model';
import { Speciality } from './speciality.model';
import { Department } from './department.model';

export class Doctor extends User {
  refMedicale: string;
  disponble: boolean;
  room: string;
  absReason: string;
  speciality: Speciality;
  department: Department;
}
