import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/shared/admin.service';
import { Nurse } from 'src/app/shared/nurse.model';
import { ToastrService } from 'ngx-toastr';
import { Department } from 'src/app/shared/department.model';

@Component({
  selector: 'app-admin-nurses',
  templateUrl: './admin-nurses.component.html',
  styleUrls: ['./admin-nurses.component.css']
})
export class AdminNursesComponent implements OnInit {

  @ViewChild('closeAddModal', { static: false }) closeAddModal;

  @ViewChild('closeUpdateModal', { static: false }) closeUpdateModal;

  @ViewChild('closeDeleteModal', { static: false }) closeDeleteModal;

  @ViewChild('openUpdateModal', { static: false }) openUpdateModal;

  @ViewChild('openDeleteModal', { static: false }) openDeleteModal;

  page = 1;
  searchTerm;
  allNurses: Array<Nurse>;
  allDepartments: Array<Department>;
  selectedNurse: Nurse;
  deletedNurseId: number;

  constructor(private adminService: AdminService, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  nurseForm = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    fullName: ['', Validators.required],
    department: ['', Validators.required],
    refMedicale: ['', Validators.required]
  });

  nurseUpdateForm = this.formBuilder.group({
    id: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', Validators.required],
    fullName: ['', Validators.required],
    department: ['', Validators.required],
    refMedicale: ['', Validators.required]
  });

  ngOnInit() {
    this.getAllNurses();
    this.getAllDepartments();
  }

  getAllNurses() {
    this.adminService.getAllNurses().subscribe(
      data => {
        this.allNurses = data;
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

  addNurse() {
    this.adminService.addNurse(this.nurseForm.value).subscribe(
      () => {
        this.closeAddModal.nativeElement.click();
        this.getAllNurses();
        this.toastr.success('Nurse added successfully !!');
        this.nurseForm.reset();
      },
      err => console.warn(err)
    );
  }

  getNurseById(id: number) {
    this.adminService.getNurseById(id).subscribe(
      data => {
        this.nurseUpdateForm.patchValue(data);
        this.openUpdateModal.nativeElement.click();
      },
      err => console.warn(err)
    );
  }

  updateNurse() {
    this.adminService.updateNurse(this.nurseUpdateForm.value).subscribe(
      () => {
        this.closeUpdateModal.nativeElement.click();
        this.getAllNurses();
        this.toastr.info('Nurse modified successfully !!');
        this.nurseUpdateForm.reset();
      },
      err => console.warn(err)
    );
  }

  deleteNurse() {
    this.adminService.deleteNurse(this.deletedNurseId).subscribe(
      () => {
        this.closeDeleteModal.nativeElement.click();
        this.getAllNurses();
        this.toastr.warning('Nurse deleted successfully !!');
      },
      err => console.warn(err)
    );
  }

  deleteModal(id: number) {
    this.deletedNurseId = id;
    this.openDeleteModal.nativeElement.click();
  }

  compareFn(c1: Department, c2: Department): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

}
