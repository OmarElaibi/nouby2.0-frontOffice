import { Component, OnInit, ViewChild } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Department } from 'src/app/shared/department.model';
import { AdminService } from 'src/app/shared/admin.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Doctor } from 'src/app/shared/doctor.model';
import { Speciality } from 'src/app/shared/speciality.model';

@Component({
  selector: 'app-admin-doctors',
  templateUrl: './admin-doctors.component.html',
  styleUrls: ['./admin-doctors.component.css']
})
export class AdminDoctorsComponent implements OnInit {

  @ViewChild('closeAddModal', { static: false }) closeAddModal;

  @ViewChild('closeUpdateModal', { static: false }) closeUpdateModal;

  @ViewChild('closeDeleteModal', { static: false }) closeDeleteModal;

  @ViewChild('openUpdateModal', { static: false }) openUpdateModal;

  @ViewChild('openDeleteModal', { static: false }) openDeleteModal;

  page = 1;
  searchTerm;
  allDoctors: Array<Doctor>;
  allDepartments: Array<Department>;
  allSpecialities: Array<Speciality>;
  selectedDoctor: Doctor;
  deletedDoctorId: number;

  constructor(private adminService: AdminService, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  doctorForm = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    fullName: ['', Validators.required],
    department: ['', Validators.required],
    speciality: ['', Validators.required],
    room: ['', Validators.required],
    refMedicale: ['', Validators.required]
  });

  doctorUpdateForm = this.formBuilder.group({
    id: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', Validators.required],
    fullName: ['', Validators.required],
    department: ['', Validators.required],
    speciality: ['', Validators.required],
    room: ['', Validators.required],
    refMedicale: ['', Validators.required]
  });

  ngOnInit() {
    this.getAllDoctors();
    this.getAllDepartments();
    this.getAllSpecialities();
  }

  getAllDoctors() {
    this.adminService.getAllDoctors().subscribe(
      data => {
        this.allDoctors = data;
      },
      err => console.warn(err)
    );
  }

  getAllDepartments() {
    this.adminService.getAllDepartments().subscribe(
      data => {
        this.allDepartments = data;
      },
      err => console.warn(err)
    );
  }

  getAllSpecialities() {
    this.adminService.getAllSpecialities().subscribe(
      data => {
        this.allSpecialities = data;
      },
      err => console.warn(err)
    );
  }

  addDoctor() {
    this.adminService.addDoctor(this.doctorForm.value).subscribe(
      () => {
        this.closeAddModal.nativeElement.click();
        this.getAllDoctors();
        this.toastr.success('Doctor added successfully !!');
        this.doctorForm.reset();
      },
      err => console.warn(err)
    );
  }

  getDoctorById(id: number) {
    this.adminService.getDoctorById(id).subscribe(
      data => {
        this.doctorUpdateForm.patchValue(data);
        this.openUpdateModal.nativeElement.click();
      },
      err => console.warn(err)
    );
  }

  updateDoctor() {
    this.adminService.updateDoctor(this.doctorUpdateForm.value).subscribe(
      () => {
        this.closeUpdateModal.nativeElement.click();
        this.getAllDoctors();
        this.toastr.info('Doctor modified successfully !!');
        this.doctorUpdateForm.reset();
      },
      err => console.warn(err)
    );
  }

  deleteDoctor(id: number) {
    this.adminService.deleteDoctor(id).subscribe(
      () => {
        this.closeDeleteModal.nativeElement.click();
        this.getAllDoctors();
        this.toastr.warning('Doctor deleted successfully !!');
      },
      err => console.warn(err)
    );
  }

  deleteModal(id: number) {
    this.deletedDoctorId = id;
    this.openDeleteModal.nativeElement.click();
  }

  compareFn(c1: Department, c2: Department): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  compareFn2(c1: Speciality, c2: Speciality): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

}
