import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { API } from '../api/API';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  private users: User[] = [];

  private apiUrlUsers = API.USERS;

  constructor(private http: HttpClient) { this.getUsers();  }

  getUsers(){
    return this.http.get<User[]>(this.apiUrlUsers).subscribe(u => this.users = u);
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
