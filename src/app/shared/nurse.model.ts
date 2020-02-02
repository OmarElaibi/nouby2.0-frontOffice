import { User } from './user.model';
import { Department } from './department.model';

export class Nurse extends User {
  refMedicale: string;
  department: Department;
}
