import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/shared/admin.service';
import { Criticality } from 'src/app/shared/criticality.model';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-criticalities',
  templateUrl: './admin-criticalities.component.html',
  styleUrls: ['./admin-criticalities.component.css']
})
export class AdminCriticalitiesComponent implements OnInit {

  @ViewChild('closeAddModal', { static: false }) closeAddModal;

  @ViewChild('closeUpdateModal', { static: false }) closeUpdateModal;

  @ViewChild('closeDeleteModal', { static: false }) closeDeleteModal;

  @ViewChild('openUpdateModal', { static: false }) openUpdateModal;

  @ViewChild('openDeleteModal', { static: false }) openDeleteModal;

  page = 1;
  searchTerm;
  allCriticalities: Array<Criticality>;
  selectedCriticality: Criticality;
  deletedCriticalityId: number;

  constructor(private adminService: AdminService, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  criticalityForm = this.formBuilder.group({
    grade: ['', Validators.required]
  });

  criticalityUpdateForm = this.formBuilder.group({
    id: ['', Validators.required],
    grade: ['', Validators.required]
  });

  ngOnInit() {
    this.getAllCriticalities();
  }

  getAllCriticalities() {
    this.adminService.getAllCriticalities().subscribe(
      data => {
        this.allCriticalities = data;
      },
      err => console.warn(err)
    );
  }

  addCriticality() {
    this.adminService.addCriticality(this.criticalityForm.value).subscribe(
      () => {
        this.closeAddModal.nativeElement.click();
        this.getAllCriticalities();
        this.toastr.success('Criticality added successfully !!');
        this.criticalityForm.reset();
      },
      err => console.warn(err)
    );
  }

  getCriticalityById(id: number) {
    this.adminService.getCriticalityById(id).subscribe(
      data => {
        this.criticalityUpdateForm.patchValue(data);
        this.openUpdateModal.nativeElement.click();
      },
      err => console.warn(err)
    );
  }

  updateCriticality() {
    this.adminService.updateCriticality(this.criticalityUpdateForm.value).subscribe(
      () => {
        this.closeUpdateModal.nativeElement.click();
        this.getAllCriticalities();
        this.toastr.info('Criticality modified successfully !!');
        this.criticalityUpdateForm.reset();
      },
      err => console.warn(err)
    );
  }

  deleteCriticality(id: number) {
    this.adminService.deleteCriticality(id).subscribe(
      () => {
        this.closeDeleteModal.nativeElement.click();
        this.getAllCriticalities();
        this.toastr.warning('Criticality deleted successfully !!');
      },
      err => console.warn(err)
    );
  }

  deleteModal(id: number) {
    this.deletedCriticalityId = id;
    this.openDeleteModal.nativeElement.click();
  }

}
