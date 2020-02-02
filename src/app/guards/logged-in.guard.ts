import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor(private authService: AuthService, private location: Location, private route: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.isLoggedIn()) {
        const id = localStorage.getItem('current_user_id');
        if (localStorage.getItem('current_user_role') === '1') {
          this.route.navigate(['admin/' + id]);
        }
        if (localStorage.getItem('current_user_role') === '2') {
          this.route.navigate(['reception/' + id]);
        }
        if (localStorage.getItem('current_user_role') === '3') {
          this.route.navigate(['nurse/' + id]);
        }
      }
      return true;
  }

}
