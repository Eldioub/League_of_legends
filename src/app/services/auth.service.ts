import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  private users: User[] = [];

  private apiUrl = '/api/users';

  constructor(private http: HttpClient) { this.getUsers();  }

  getUsers(){
    return this.http.get<User[]>(this.apiUrl).subscribe(u => this.users = u);
  }

  login(email: string, password: string){    
    if(! this.users.map(x => x.email).includes(email)){
      return false;
    } else {
      if(! (this.users.filter(x => x.email === email).map(p => p.password)[0] === password) ){
        return false;
      } else {
        return true;
      }
    }
  }

  isLoggedIn(){
    return !! localStorage.getItem('user');
  }

}
