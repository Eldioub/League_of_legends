import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
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
    alert('Vous n\'avez pas l\'acces à cette page, vous connecter d\'abord');
    this.router.navigateByUrl('login');
    return false;
  }
  
}
