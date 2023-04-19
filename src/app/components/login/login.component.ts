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

  errorMessage = {email : '', password: '', login: ''};
  submitted = false;
  
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  ngOnInit(){ }

  constructor(private authService: AuthService, private router: Router) {}

  login(){
    this.submitted = true;
    if(this.loginForm.controls.email.hasError('required')) this.errorMessage.email = 'Email est obligtoire.';
    else if(this.loginForm.controls.email.hasError('email')) this.errorMessage.email = 'Entrez une adresse e-mail valide.';

    if(this.loginForm.controls.password.hasError('required')) this.errorMessage.password = 'Mot de passe est obligtoire.';
    else if(this.loginForm.controls.password.hasError('minlength')) this.errorMessage.password = 'Entrez un mot de passe d\'une longueur supérieure à 8 caractères.';
    
    if(this.loginForm.valid) {
      let email = this.loginForm.controls.email.value; email = email ? email : '';
      let password = this.loginForm.controls.password.value; password = password ? password : '';
      if(this.authService.login(email , password)){
        localStorage.setItem('user', email);
        this.router.navigateByUrl('');
      } else {
        this.errorMessage.login = 'Email ou mot de passe invalide !';
      }
    }
  }

}
