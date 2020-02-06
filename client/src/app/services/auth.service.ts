import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http : HttpClient) { }

  registerUser(user)
  {
    return this.http.post("http://localhost:3000/authentication/register", user);
  }

  checkEmail(email)
  {
    return this.http.get("http://localhost:3000/authentication/register"+email);
  }

  checkUsername(username)
  {
    return this.http.get("http://localhost:3000/authentication/register"+username);
  }

}
