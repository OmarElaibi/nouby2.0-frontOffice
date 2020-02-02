import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ReceptionComponent } from './reception/reception.component';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin/staff/admin-dashboard/admin-dashboard.component';
import { AdminDoctorsComponent } from './admin/staff/admin-doctors/admin-doctors.component';
import { AdminReceptionistsComponent } from './admin/staff/admin-receptionists/admin-receptionists.component';
import { AdminNursesComponent } from './admin/staff/admin-nurses/admin-nurses.component';
import { AdminCriticalitiesComponent } from './admin/helpers/admin-criticalities/admin-criticalities.component';
import { AdminSpecialitiesComponent } from './admin/helpers/admin-specialities/admin-specialities.component';
import { AdminDepartmentsComponent } from './admin/helpers/admin-departments/admin-departments.component';
import { ErrorInterceptor } from './shared/error-interceptor';
import { JwtInterceptor } from './shared/jwt-interceptor';
import { ToastrModule } from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AppointmentsComponent } from './nurse/appointments/appointments.component';
import { QueueComponent } from './nurse/queue/queue.component';
import { NurseComponent } from './nurse/nurse.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    ReceptionComponent,
    AdminComponent,
    AdminDashboardComponent,
    AdminDoctorsComponent,
    AdminReceptionistsComponent,
    AdminNursesComponent,
    AdminCriticalitiesComponent,
    AdminSpecialitiesComponent,
    AdminDepartmentsComponent,
    AppointmentsComponent,
    QueueComponent,
    NurseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    NgxPaginationModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: () => {
    //       console.log(localStorage.getItem('access_token'));
    //       return localStorage.getItem('access_token');
    //     },
    //     whitelistedDomains: ['http://localhost:8015/api/'],
    //     skipWhenExpired: true
    //   }
    // })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
