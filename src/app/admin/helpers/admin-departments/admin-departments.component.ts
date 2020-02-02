import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/shared/admin.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Department } from 'src/app/shared/department.model';

@Component({
  selector: 'app-admin-departments',
  templateUrl: './admin-departments.component.html',
  styleUrls: ['./admin-departments.component.css']
})
export class AdminDepartmentsComponent implements OnInit {

  @ViewChild('closeAddModal', { static: false }) closeAddModal;

  @ViewChild('closeUpdateModal', { static: false }) closeUpdateModal;

  @ViewChild('closeDeleteModal', { static: false }) closeDeleteModal;

  @ViewChild('openUpdateModal', { static: false }) openUpdateModal;

  @ViewChild('openDeleteModal', { static: false }) openDeleteModal;

  page = 1;
  searchTerm;
  allDepartments: Array<Department>;
  selectedDepartment: Department;
  deletedDepartmentId: number;

  constructor(private adminService: AdminService, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  departmentForm = this.formBuilder.group({
    codeDep: ['', Validators.required],
    nomDep: ['', Validators.required]
  });

  departmentUpdateForm = this.formBuilder.group({
    id: ['', Validators.required],
    codeDep: ['', Validators.required],
    nomDep: ['', Validators.required]
  });

  ngOnInit() {
    this.getAllDepartments();
  }

  getAllDepartments() {
    this.adminService.getAllDepartments().subscribe(
      data => {
        this.allDepartments = data;
      },
      err => console.warn(err)
    );
  }

  addDepartment() {
    this.adminService.addDepartment(this.departmentForm.value).subscribe(
      () => {
        this.closeAddModal.nativeElement.click();
        this.getAllDepartments();
        this.toastr.success('Department added successfully !!');
        this.departmentForm.reset();
      },
      err => console.warn(err)
    );
  }

  getDepartmentById(id: number) {
    this.adminService.getDepartmentById(id).subscribe(
      data => {
        this.departmentUpdateForm.patchValue(data);
        this.openUpdateModal.nativeElement.click();
      },
      err => console.warn(err)
    );
  }

  updateDepartment() {
    this.adminService.updateDepartment(this.departmentUpdateForm.value).subscribe(
      () => {
        this.closeUpdateModal.nativeElement.click();
        this.getAllDepartments();
        this.toastr.info('Department modified successfully !!');
        this.departmentUpdateForm.reset();
      },
      err => console.warn(err)
    );
  }

  deleteDepartment(id: number) {
    this.adminService.deleteDepartment(id).subscribe(
      () => {
        this.closeDeleteModal.nativeElement.click();
        this.getAllDepartments();
        this.toastr.warning('Department deleted successfully !!');
      },
      err => console.warn(err)
    );
  }

  deleteModal(id: number) {
    this.deletedDepartmentId = id;
    this.openDeleteModal.nativeElement.click();
  }

}
