import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/shared/admin.service';
import { Speciality } from 'src/app/shared/speciality.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-specialities',
  templateUrl: './admin-specialities.component.html',
  styleUrls: ['./admin-specialities.component.css']
})
export class AdminSpecialitiesComponent implements OnInit {

  @ViewChild('closeAddModal', { static: false }) closeAddModal;

  @ViewChild('closeUpdateModal', { static: false }) closeUpdateModal;

  @ViewChild('closeDeleteModal', { static: false }) closeDeleteModal;

  @ViewChild('openUpdateModal', { static: false }) openUpdateModal;

  @ViewChild('openDeleteModal', { static: false }) openDeleteModal;

  page = 1;
  searchTerm;
  allSpecialities: Array<Speciality>;
  selectedSpeciality: Speciality;
  deletedSpecialityId: number;

  constructor(private adminService: AdminService, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  specialityForm = this.formBuilder.group({
    label: ['', Validators.required]
  });

  specialityUpdateForm = this.formBuilder.group({
    id: ['', Validators.required],
    label: ['', Validators.required]
  });

  ngOnInit() {
    this.getAllSpecialities();
  }

  getAllSpecialities() {
    this.adminService.getAllSpecialities().subscribe(
      data => {
        this.allSpecialities = data;
      },
      err => console.warn(err)
    );
  }

  addSpeciality() {
    this.adminService.addSpeciality(this.specialityForm.value).subscribe(
      () => {
        this.closeAddModal.nativeElement.click();
        this.getAllSpecialities();
        this.toastr.success('Speciality added successfully !!');
        this.specialityForm.reset();
      },
      err => console.warn(err)
    );
  }

  getSpecialityById(id: number) {
    this.adminService.getSpecialityById(id).subscribe(
      data => {
        this.specialityUpdateForm.patchValue(data);
        this.openUpdateModal.nativeElement.click();
      },
      err => console.warn(err)
    );
  }

  updateSpeciality() {
    this.adminService.updateSpeciality(this.specialityUpdateForm.value).subscribe(
      () => {
        this.closeUpdateModal.nativeElement.click();
        this.getAllSpecialities();
        this.toastr.info('Speciality modified successfully !!');
        this.specialityUpdateForm.reset();
      },
      err => console.warn(err)
    );
  }

  deleteSpeciality(id: number) {
    this.adminService.deleteSpeciality(id).subscribe(
      () => {
        this.closeDeleteModal.nativeElement.click();
        this.getAllSpecialities();
        this.toastr.warning('Speciality deleted successfully !!');
      },
      err => console.warn(err)
    );
  }

  deleteModal(id: number) {
    this.deletedSpecialityId = id;
    this.openDeleteModal.nativeElement.click();
  }

}
