import { Component, OnInit, ViewChild } from '@angular/core';
import { NurseService } from 'src/app/shared/nurse.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Appointment } from 'src/app/shared/appointment.model';
import { Criticality } from 'src/app/shared/criticality.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  @ViewChild('openUpdateModal', { static: false }) openUpdateModal;

  @ViewChild('closeUpdateModal', { static: false }) closeUpdateModal;

  page = 1;
  searchTerm;

  nurseId;
  appointments: Appointment[];
  criticalities: Criticality[];
  checkedButtonIsToday = true;

  appointmentForm = this.formBuilder.group({
    id: ['', Validators.required],
    motif: ['', Validators.required],
    date: ['', Validators.required],
    status: ['', Validators.required],
    patient: ['', Validators.required],
    receptionist: ['', Validators.required],
    patientTemperature: [''],
    patientWeight: [''],
    patientBloodPressure: [''],
    allergies: [''],
    criticality: ['', Validators.required]
  });

  constructor(private nurseService: NurseService, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    this.nurseId = localStorage.getItem('current_user_id');
    this.getTodayAppointments();
    this.getAllCriticalities();
  }

  getAllAppointments() {
    this.checkedButtonIsToday = false;
    this.nurseService.getAllAppointments().subscribe(
      data => {
        this.appointments = data;
      },
      err => console.warn(err)
    );
  }

  getTodayAppointments() {
    this.checkedButtonIsToday = true;
    this.nurseService.getTodayAppointments().subscribe(
      data => {
        this.appointments = data;
      },
      err => console.warn(err)
    );
  }

  changeAppointmentStatus(id) {
    this.nurseService.changeAppointmentStatus(id).subscribe(
      () => {
        if (this.checkedButtonIsToday) {
          this.getTodayAppointments();
        } else {
          this.getAllAppointments();
        }
        this.toastr.info('Appointment Status changed successfully !!');
      },
      err => console.warn(err)
    );
  }

  getAllCriticalities() {
    this.nurseService.getAllCriticalities().subscribe(
      data => this.criticalities = data,
      err => console.warn(err)
    );
  }

  getAppointmentInfo(id) {
    this.nurseService.getAppointementById(id).subscribe(
      data => {
        this.appointmentForm.patchValue(data);
        this.openUpdateModal.nativeElement.click();
        console.log(this.appointmentForm.value);
      },
      err => console.warn(err)
    );
  }

  updateAppointment() {
    this.nurseService.completeAppointment(this.appointmentForm.value).subscribe(
      () => {
        this.closeUpdateModal.nativeElement.click();
        if (this.checkedButtonIsToday) {
          this.getTodayAppointments();
        } else {
          this.getAllAppointments();
        }
        this.toastr.info('Appointment Patient Check modified successfully !!');
        this.appointmentForm.reset();
      },
      err => console.warn(err)
    );
  }

  compareFn(c1: Criticality, c2: Criticality): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  addAppointmentToQueue(id) {
    this.nurseService.addQueuer(this.nurseId, id).subscribe(
      () => {
        this.toastr.success('Appointment added to queue successfully');
      },
      err => {
        console.warn(err);
        this.toastr.error(err);
      }
    );
  }

}
