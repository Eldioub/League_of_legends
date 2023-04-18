import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login-main.component.css', './login-util.component.css']
})
export class LoginComponent implements OnInit {

  messageErreur  = '';
  
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  ngOnInit(){

  }

  constructor(private authService: AuthService, private router: Router) {}

  login(){
    console.log(this.loginForm);
    
    if(this.authService.login(' ', ' ')){
      this.router.navigateByUrl('');
    } else {
      this.messageErreur = 'Email ou mot de passe n\'est pas valide !';
    }
  }

}
