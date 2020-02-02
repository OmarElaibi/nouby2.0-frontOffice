import { Patient } from './patient.model';
import { Criticality } from './criticality.model';
import { Receptionist } from './receptionist.model';

export class Appointment {
  id: number;
  date;
  motif: string;
  status: boolean;
  patientTemperature: number;
  patientBloodPressure: string;
  patientWeight: number;
  allergies: string;
  patient: Patient;
  criticality: Criticality;
  receptionist: Receptionist;
}
