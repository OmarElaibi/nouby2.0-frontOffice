import { Component, OnInit, ViewChild } from '@angular/core';
import { Receptionist } from '../shared/receptionist.model';
import { ReceptionService } from '../shared/reception.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { Patient } from '../shared/patient.model';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Appointment } from '../shared/appointment.model';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.css']
})
export class ReceptionComponent implements OnInit {

  @ViewChild('closeLogoutModal', { static: false }) closeLogoutModal;

  @ViewChild('closeAddModal', { static: false }) closeAddModal;

  @ViewChild('closeAppointmentAddModal', { static: false }) closeAppointmentAddModal;

  @ViewChild('closeUpdateModal', { static: false }) closeUpdateModal;

  @ViewChild('closeDeleteModal', { static: false }) closeDeleteModal;

  @ViewChild('openUpdateModal', { static: false }) openUpdateModal;

  @ViewChild('openDeleteModal', { static: false }) openDeleteModal;

  @ViewChild('openAppointmentModal', { static: false }) openAppointmentModal;

  page = 1;
  searchTerm;
  receptionistId;
  currentReceptionist: Receptionist;
  allPatients: Array<Patient>;
  selectedPatient: Patient;
  deletedPatientId: number;
  patientIdForAddingAppointment;

  patientForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    age: ['', Validators.required],
    tel: ['', Validators.required],
    email: [''],
    cin: ['', Validators.required],
    civilStatus: ['', Validators.required],
    mutualized: ['']
  });

  appointmentForm = this.formBuilder.group({
    motif: ['', Validators.required]
  });

  patientUpdateForm = this.formBuilder.group({
    id: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    age: ['', Validators.required],
    tel: ['', Validators.required],
    email: [''],
    cin: ['', Validators.required],
    civilStatus: ['', Validators.required],
    mutualized: ['']
  });

  constructor(private receptionService: ReceptionService, private route: ActivatedRoute,
              private authService: AuthService, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    this.receptionistId = this.route.snapshot.params.id;
    this.getReceptionistById();
    this.getAllPatients();
  }

  getReceptionistById() {
    this.receptionService.getReceptionistInfo(this.receptionistId).subscribe(
      data => {
        this.currentReceptionist = data;
      },
      err => console.warn(err)
    );
  }

  getAllPatients() {
    this.receptionService.getPatients().subscribe(
      data => {
        this.allPatients = data;
      },
      err => console.warn(err)
    );
  }

  addPatient() {
    console.log(this.patientForm.value);
    this.receptionService.addPatient(this.patientForm.value).subscribe(
      () => {
        this.closeAddModal.nativeElement.click();
        this.getAllPatients();
        this.toastr.success('Patient added successfully !!');
        this.patientForm.reset();
      },
      err => {
        console.warn(err);
        this.toastr.warning('CIN already exists, please check it out !!');
      }
    );
  }

  addAppointmentToPatient() {
    this.receptionService.addAppointmentToPatient(this.receptionistId,
                        this.patientIdForAddingAppointment, this.appointmentForm.value).subscribe(
      () => {
        this.closeAppointmentAddModal.nativeElement.click();
        this.getAllPatients();
        this.toastr.success('Appointment added to patient successfully !!');
        this.appointmentForm.reset();
      },
      err => console.warn(err)
    );
  }

  getPatientById(id: number) {
    this.receptionService.getPatientById(id).subscribe(
      data => {
        this.patientUpdateForm.patchValue(data);
        this.openUpdateModal.nativeElement.click();
      },
      err => console.warn(err)
    );
  }

  updatePatient() {
    this.receptionService.updatePatient(this.patientUpdateForm.value).subscribe(
      () => {
        this.closeUpdateModal.nativeElement.click();
        this.getAllPatients();
        this.toastr.info('Patient modified successfully !!');
        this.patientUpdateForm.reset();
      },
      err => console.warn(err)
    );
  }

  deletePatient(id: number) {
    this.receptionService.deletePatient(id).subscribe(
      () => {
        this.closeDeleteModal.nativeElement.click();
        this.getAllPatients();
        this.toastr.warning('Patient deleted successfully !!');
      },
      err => console.warn(err)
    );
  }

  deleteModal(id: number) {
    this.deletedPatientId = id;
    this.openDeleteModal.nativeElement.click();
  }

  appointmentModal(id: number) {
    this.patientIdForAddingAppointment = id;
    this.openAppointmentModal.nativeElement.click();
  }

  compareFn(c1: string, c2: string): boolean {
    return c1 === c2 ? true : false;
  }

  logout() {
    this.closeLogoutModal.nativeElement.click();
    this.authService.logout();
  }

}
