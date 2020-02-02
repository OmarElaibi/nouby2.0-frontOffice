import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/shared/admin.service';
import { Receptionist } from 'src/app/shared/receptionist.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-receptionists',
  templateUrl: './admin-receptionists.component.html',
  styleUrls: ['./admin-receptionists.component.css']
})
export class AdminReceptionistsComponent implements OnInit {

  @ViewChild('closeAddModal', { static: false }) closeAddModal;

  @ViewChild('closeUpdateModal', { static: false }) closeUpdateModal;

  @ViewChild('closeDeleteModal', { static: false }) closeDeleteModal;

  @ViewChild('openUpdateModal', { static: false }) openUpdateModal;

  @ViewChild('openDeleteModal', { static: false }) openDeleteModal;

  page = 1;
  searchTerm;
  allReceptionists: Array<Receptionist>;
  selectedReceptionist: Receptionist;
  deletedReceptionistId: number;

  constructor(private adminService: AdminService, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  receptionistForm = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    fullName: ['', Validators.required],
    regCode: ['', Validators.required]
  });

  receptionistUpdateForm = this.formBuilder.group({
    id: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', Validators.required],
    fullName: ['', Validators.required],
    regCode: ['', Validators.required]
  });

  ngOnInit() {
    this.getAllReceptionists();
  }

  getAllReceptionists() {
    this.adminService.getAllReceptionists().subscribe(
      data => {
        this.allReceptionists = data;
      },
      err => console.warn(err)
    );
  }

  addReceptionist() {
    this.adminService.addReceptionist(this.receptionistForm.value).subscribe(
      () => {
        this.closeAddModal.nativeElement.click();
        this.getAllReceptionists();
        this.toastr.success('Receptionist added successfully !!');
        this.receptionistForm.reset();
      },
      err => console.warn(err)
    );
  }

  getReceptionistById(id: number) {
    this.adminService.getReceptionistById(id).subscribe(
      data => {
        this.receptionistUpdateForm.patchValue(data);
        this.openUpdateModal.nativeElement.click();
      },
      err => console.warn(err)
    );
  }

  updateReceptionist() {
    this.adminService.updateReceptionist(this.receptionistUpdateForm.value).subscribe(
      () => {
        this.closeUpdateModal.nativeElement.click();
        this.getAllReceptionists();
        this.toastr.info('Receptionist modified successfully !!');
        this.receptionistUpdateForm.reset();
      },
      err => console.warn(err)
    );
  }

  deleteReceptionist(id: number) {
    this.adminService.deleteReceptionist(id).subscribe(
      () => {
        this.closeDeleteModal.nativeElement.click();
        this.getAllReceptionists();
        this.toastr.warning('Receptionist deleted successfully !!');
      },
      err => console.warn(err)
    );
  }

  deleteModal(id: number) {
    this.deletedReceptionistId = id;
    this.openDeleteModal.nativeElement.click();
  }

}
