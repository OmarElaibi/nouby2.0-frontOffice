import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  result: {
    user: {},
    token: string
  };

  signinForm = this.fb.group({
    username: [''],
    password: ['']
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  loginUser() {
    this.authService.signIn(this.signinForm.value).subscribe(
      (data: any) => {
        console.log(data);
        this.authService.afterLoginUser(data);
        if (data.user.role.id === 1) {
          this.router.navigate(['admin/' + data.user.id]);
        }
        if (data.user.role.id === 2) {
          this.router.navigate(['reception/' + data.user.id]);
        }
        if (data.user.role.id === 3) {
          this.router.navigate(['nurse/' + data.user.id]);
        }
      },
      err => {
        console.warn(err);
      }
    );
  }

}
