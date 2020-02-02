import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Nurse } from '../shared/nurse.model';
import { NurseService } from '../shared/nurse.service';

@Component({
  selector: 'app-nurse',
  templateUrl: './nurse.component.html',
  styleUrls: ['./nurse.component.css']
})
export class NurseComponent implements OnInit {

  @ViewChild('closeLogoutModal', { static: false }) closeLogoutModal;

  nurseId;
  currentNurse: Nurse;

  constructor(private authService: AuthService, private route: ActivatedRoute, private nurseService: NurseService) { }

  ngOnInit() {
    this.nurseId = this.route.snapshot.params.id;
    this.getNurseInfo();
  }

  logout() {
    this.closeLogoutModal.nativeElement.click();
    this.authService.logout();
  }

  getNurseInfo() {
    this.nurseService.getNurseInfo(this.nurseId).subscribe(
      data => {
        this.currentNurse = data;
      },
      err => console.warn(err)
    );
  }

}
