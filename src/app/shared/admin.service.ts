import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Department } from './department.model';
import { Criticality } from './criticality.model';
import { Speciality } from './speciality.model';
import { Receptionist } from './receptionist.model';
import { Nurse } from './nurse.model';
import { Doctor } from './doctor.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  endpoint = 'http://localhost:8015/api/admin';

  constructor(private router: Router, private http: HttpClient) { }

  getAdminInfo(id) {
    return this.http.get<User>(this.endpoint + '/' + id);
  }

  getAllNurses() {
    return this.http.get<any>(this.endpoint + '/nurses');
  }

  getAllReceptionists() {
    return this.http.get<any>(this.endpoint + '/receptionists');
  }

  getAllDoctors() {
    return this.http.get<any>(this.endpoint + '/doctors');
  }

  getAllCriticalities() {
    return this.http.get<any>(this.endpoint + '/criticalities');
  }

  getAllSpecialities() {
    return this.http.get<any>(this.endpoint + '/specialities');
  }

  getAllDepartments() {
    return this.http.get<any>(this.endpoint + '/departments');
  }

  // Getting by id SECTION

  getDepartmentById(id: number) {
    return this.http.get(this.endpoint + '/departments/' + id);
  }

  getCriticalityById(id: number) {
    return this.http.get(this.endpoint + '/criticalities/' + id);
  }

  getSpecialityById(id: number) {
    return this.http.get(this.endpoint + '/specialities/' + id);
  }

  getReceptionistById(id: number) {
    return this.http.get(this.endpoint + '/receptionists/' + id);
  }

  getNurseById(id: number) {
    return this.http.get(this.endpoint + '/nurses/' + id);
  }

  getDoctorById(id: number) {
    return this.http.get(this.endpoint + '/doctors/' + id);
  }

  // ADDING SECTION

  addDepartment(department: Department) {
    return this.http.post(this.endpoint + '/departments', department);
  }

  addCriticality(criticality: Criticality) {
    return this.http.post(this.endpoint + '/criticalities', criticality);
  }

  addSpeciality(speciality: Speciality) {
    return this.http.post(this.endpoint + '/specialities', speciality);
  }

  addReceptionist(receptionist: Receptionist) {
    return this.http.post(this.endpoint + '/receptionists', receptionist);
  }

  addNurse(nurse: Nurse) {
    return this.http.post(this.endpoint + '/nurses', nurse);
  }

  addDoctor(doctor: Doctor) {
    return this.http.post(this.endpoint + '/doctors', doctor);
  }

  // Updating SECTION

  updateDepartment(department: Department) {
    return this.http.patch(this.endpoint + '/departments/' + department.id, department);
  }

  updateCriticality(criticality: Criticality) {
    return this.http.patch(this.endpoint + '/criticalities/' + criticality.id, criticality);
  }

  updateSpeciality(speciality: Speciality) {
    return this.http.patch(this.endpoint + '/specialities/' + speciality.id, speciality);
  }

  updateReceptionist(receptionist: Receptionist) {
    return this.http.patch(this.endpoint + '/receptionists/' + receptionist.id, receptionist);
  }

  updateNurse(nurse: Nurse) {
    return this.http.patch(this.endpoint + '/nurses/' + nurse.id, nurse);
  }

  updateDoctor(doctor: Doctor) {
    return this.http.patch(this.endpoint + '/doctors/' + doctor.id, doctor);
  }

  // Deleting SECTION

  deleteDepartment(id: number) {
    return this.http.delete(this.endpoint + '/departments/' + id);
  }

  deleteCriticality(id: number) {
    return this.http.delete(this.endpoint + '/criticalities/' + id);
  }

  deleteSpeciality(id: number) {
    return this.http.delete(this.endpoint + '/specialities/' + id);
  }

  deleteReceptionist(id: number) {
    return this.http.delete(this.endpoint + '/receptionists/' + id);
  }

  deleteNurse(id: number) {
    return this.http.delete(this.endpoint + '/nurses/' + id);
  }

  deleteDoctor(id: number) {
    return this.http.delete(this.endpoint + '/doctors/' + id);
  }
}
