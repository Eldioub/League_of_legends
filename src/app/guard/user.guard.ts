import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router : Router) {}

  canActivate(){
    if(this.authService.isLoggedIn()){
      return true;
    }
    alert("Vous n'avez pas accès à cette page, veuillez vous connecter d'abord.");
    this.router.navigateByUrl('login');
    return false;
  }
  
}
