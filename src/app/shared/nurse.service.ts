import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Nurse } from './nurse.model';
import { Appointment } from './appointment.model';
import { Doctor } from './doctor.model';
import { Criticality } from './criticality.model';

@Injectable({
  providedIn: 'root'
})
export class NurseService {

  endpoint = 'http://localhost:8015/api/nurse';

  constructor(private router: Router, private http: HttpClient) { }

  getNurseInfo(id) {
    return this.http.get<Nurse>(this.endpoint + '/' + id);
  }

  getAllAppointments() {
    return this.http.get<Appointment[]>(this.endpoint + '/appointments');
  }

  getTodayAppointments() {
    return this.http.get<Appointment[]>(this.endpoint + '/appointments/today');
  }

  getAppointementById(id) {
    return this.http.get(this.endpoint + `/appointments/${id}`);
  }

  getAllCriticalities() {
    return this.http.get<Criticality[]>(this.endpoint + '/criticalities');
  }

  getDepartmentNotAssignedQueue(nurseId) {
    return this.http.get<any[]>(this.endpoint + `/${nurseId}/queuers`);
  }

  getDepartmentDoctors(nurseId) {
    return this.http.get<Doctor[]>(this.endpoint + `/${nurseId}/doctors`);
  }

  addQueuer(nurseId, appointmentId) {
    return this.http.post(this.endpoint + `/${nurseId}/appointments/${appointmentId}/add-to-queue`, null);
  }

  // updateQueuerStatus(nurseId, queuerId) {
  //   return this.http.patch(this.endpoint + `${nurseId}/queuers/${queuerId}`, null);
  // }

  reorderQueue(nurseId, queuerId) {
    return this.http.patch(this.endpoint + `${nurseId}/queuers/${queuerId}/absent-or-recheck`, null);
  }

  deleteQueuer(nurseId, queuerId) {
    return this.http.delete(this.endpoint + `${nurseId}/queuers/${queuerId}`);
  }

  changeDoctorDisponibility(nurseId, doctorId) {
    return this.http.patch(this.endpoint + `${nurseId}/doctors/${doctorId}/change-dispo`, null);
  }

  assignQueuerToDoctor(queuerId, doctorId) {
    return this.http.patch(this.endpoint + `queuers/${queuerId}/assign-to-doctor/${doctorId}`, null);
  }

  changeAppointmentStatus(appId) {
    return this.http.patch(this.endpoint + `/appointments/${appId}/change-status`, null);
  }

  completeAppointment(appointment: Appointment) {
    return this.http.put(this.endpoint + `/appointments/${appointment.id}`, appointment);
  }
}
