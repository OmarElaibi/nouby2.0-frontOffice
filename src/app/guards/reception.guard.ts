import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ReceptionGuard implements CanActivate {

  constructor(private authService: AuthService, private location: Location, private route: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(this.authService.currentUser);
      if (localStorage.getItem('current_user_role') !== '2') {
        window.alert('Access not allowed!');
        this.route.navigate(['login']);
        return false;
      }
      return true;
  }

}
