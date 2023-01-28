import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (state.url == '')
      return true

    if (localStorage.getItem('username') && localStorage.getItem('password')) {
      if (state.url == '/login') {
        this.router.navigate(['dashboard'])
        return false
      }
      if (!localStorage.getItem('dev') && (state.url == '/checkin' || state.url == '/registrations' || state.url == '/register')) {
        this.router.navigate(['dashboard'])
        return false
      }
      return true
    }

    if (!localStorage.getItem('username') && !localStorage.getItem('password')) {
      if (state.url != '/login') {
        this.router.navigate(['login'])
        return false
      }
      return true
    }

    return false
  }
}
