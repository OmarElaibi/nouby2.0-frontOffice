import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NurseService } from 'src/app/shared/nurse.service';
import { Doctor } from 'src/app/shared/doctor.model';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {

  page = 1;
  searchTerm;

  nurseId;
  doctors: Doctor[];
  queue;

  constructor(private nurseService: NurseService, private toastr: ToastrService) { }

  ngOnInit() {
    this.nurseId = localStorage.getItem('current_user_id');
    this.getDepartmentDoctors();
    this.getDepartmentQueue();
  }

  getDepartmentDoctors() {
    this.nurseService.getDepartmentDoctors(this.nurseId).subscribe(
      data => {
        this.doctors = data;
        console.log(this.doctors);
      },
      err => console.warn(err)
    );
  }

  changeDoctorDisponibility(docId) {
    this.nurseService.changeDoctorDisponibility(this.nurseId, docId).subscribe(
      () => {
        this.getDepartmentDoctors();
        this.toastr.info('Doctor disponibility changed successfully !!');
      },
      err => {
        console.warn(err);
      }
    );
  }

  getDepartmentQueue() {
    this.nurseService.getDepartmentNotAssignedQueue(this.nurseId).subscribe(
      data => {
        this.queue = data;
        console.log(this.queue.length);
      },
      err => console.warn(err)
    );
  }

  assignQueuerToDoctor(docId) {
    this.nurseService.assignQueuerToDoctor(this.queue[0].id, docId).subscribe(
      () => {
        this.toastr.success('patient assigned to doctor successfully !!');
        this.getDepartmentQueue();
        this.getDepartmentDoctors();
      },
      err => console.warn(err)
    );
  }

  queuerAbsentOrRecheck(queuerId) {
    this.nurseService.queuerAbsentOrRecheck(this.nurseId,queuerId).subscribe(
      () => {
        this.toastr.success('patient should recheck the doc or is absent  !!');
        this.getDepartmentQueue();
        this.getDepartmentDoctors();
      },
      err => console.warn(err)
    );
  }

  styleDocCardBorder(dispo) {
    if (dispo) {
      return 'border-left-success';
    } else {
      return 'border-left-secondary';
    }
  }

}
