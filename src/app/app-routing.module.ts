import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './guards/auth.guard';
import { ReceptionComponent } from './reception/reception.component';
import { AdminGuard } from './guards/admin.guard';
import { ReceptionGuard } from './guards/reception.guard';
import { LoggedInGuard } from './guards/logged-in.guard';
import { AdminDashboardComponent } from './admin/staff/admin-dashboard/admin-dashboard.component';
import { AdminDoctorsComponent } from './admin/staff/admin-doctors/admin-doctors.component';
import { AdminNursesComponent } from './admin/staff/admin-nurses/admin-nurses.component';
import { AdminReceptionistsComponent } from './admin/staff/admin-receptionists/admin-receptionists.component';
import { AdminCriticalitiesComponent } from './admin/helpers/admin-criticalities/admin-criticalities.component';
import { AdminDepartmentsComponent } from './admin/helpers/admin-departments/admin-departments.component';
import { AdminSpecialitiesComponent } from './admin/helpers/admin-specialities/admin-specialities.component';
import { NurseComponent } from './nurse/nurse.component';
import { AppointmentsComponent } from './nurse/appointments/appointments.component';
import { QueueComponent } from './nurse/queue/queue.component';
import { NurseGuard } from './guards/nurse.guard';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/login'},
  {
    path: 'login',
    component: AuthenticationComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'admin/:id',
    component: AdminComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard'},
      { path: 'dashboard', component: AdminDashboardComponent},
      { path: 'doctors', component: AdminDoctorsComponent},
      { path: 'nurses', component: AdminNursesComponent},
      { path: 'receptionists', component: AdminReceptionistsComponent},
      { path: 'criticalities', component: AdminCriticalitiesComponent},
      { path: 'departments', component: AdminDepartmentsComponent},
      { path: 'specialities', component: AdminSpecialitiesComponent}
    ],
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'reception/:id',
    component: ReceptionComponent,
    canActivate: [AuthGuard, ReceptionGuard]
  },
  {
    path: 'nurse/:id',
    component: NurseComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'appointments'},
      { path: 'appointments', component: AppointmentsComponent},
      { path: 'doctors-queue', component: QueueComponent}
    ],
    canActivate: [AuthGuard, NurseGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
