import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Receptionist } from './receptionist.model';
import { Patient } from './patient.model';
import { Appointment } from './appointment.model';

@Injectable({
  providedIn: 'root'
})
export class ReceptionService {

  endpoint = 'http://localhost:8015/api/receptionist';

  constructor(private router: Router, private http: HttpClient) { }

  getReceptionistInfo(id) {
    return this.http.get<Receptionist>(this.endpoint + '/' + id);
  }

  getPatients() {
    return this.http.get<Array<Patient>>(this.endpoint + '/patients');
  }

  getPatientById(id: number) {
    return this.http.get(this.endpoint + '/patients/' + id);
  }

  addPatient(patient: Patient) {
    return this.http.post(this.endpoint + '/patients', patient);
  }

  updatePatient(patient: Patient) {
    return this.http.patch(this.endpoint + '/patients/' + patient.id, patient);
  }

  deletePatient(id: number) {
    return this.http.delete(this.endpoint + '/patients/' + id);
  }

  addAppointmentToPatient(rid: number, pid: number, appointment: Appointment) {
    return this.http.post(this.endpoint + '/' + rid + '/patients/' + pid + '/appointments', appointment);
  }

  updatePatientAppointment(rid: number, pid: number, appointment: Appointment) {
    return this.http.post(this.endpoint + '/' + rid + '/patients/' + pid + '/appointments/' + appointment.id, appointment);
  }

  getPatientAppointments(pid: number) {
    return this.http.get(this.endpoint + '/patients/' + pid + '/appointments/');
  }
}
