import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../shared/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  numberOfNurses;
  numberOfReceptionists;
  numberOfDoctors;
  numberOfCriticalities;
  numberOfSpecialitiess;
  numberOfDepartments;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.getCriticalities();
    this.getDepartments();
    this.getDoctors();
    this.getNurses();
    this.getReceptionists();
    this.getSpecialities();
  }

  getCriticalities() {
    this.adminService.getAllCriticalities().subscribe(
      data => {
        this.numberOfCriticalities = data.length;
      }
    );
  }

  getDepartments() {
    this.adminService.getAllDepartments().subscribe(
      data => {
        this.numberOfDepartments = data.length;
      }
    );
  }

  getSpecialities() {
    this.adminService.getAllSpecialities().subscribe(
      data => {
        this.numberOfSpecialitiess = data.length;
      }
    );
  }

  getNurses() {
    this.adminService.getAllNurses().subscribe(
      data => {
        this.numberOfNurses = data.length;
      }
    );
  }

  getDoctors() {
    this.adminService.getAllDoctors().subscribe(
      data => {
        this.numberOfDoctors = data.length;
      }
    );
  }

  getReceptionists() {
    this.adminService.getAllReceptionists().subscribe(
      data => {
        this.numberOfReceptionists = data.length;
      }
    );
  }

}
