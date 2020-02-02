import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../shared/admin.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../shared/user.model';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild('closeLogoutModal', { static: false }) closebutton;

  adminId;
  currentAdmin: User;

  constructor(private adminService: AdminService, private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {
    this.adminId = this.route.snapshot.params.id;
    this.getAdminById();
  }

  getAdminById() {
    this.adminService.getAdminInfo(this.adminId).subscribe(
      data => {
        this.currentAdmin = data;
      },
      err => console.warn(err)
    );
  }

  logout() {
    this.closebutton.nativeElement.click();
    this.authService.logout();
  }

}
