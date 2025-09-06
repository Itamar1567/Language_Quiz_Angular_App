import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    //Signed in do nothing
    if (this.auth.signedInSignalValue())
    {
     
      return true;
    } 
    //else migrate the user to /login
    console.log("Redirected to login");
    this.router.navigate(['/login']);
    return false;
  }
}
