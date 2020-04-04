
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { tokenName } from '@angular/compiler';
import {Alumni} from '../alumniprofile/alumni'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http : HttpClient) { }
  authToken;
  user;
 options;

 alumni : Alumni;

  createAuthenticationHeaders()
  {
      this.loadToken();
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization':this.authToken
     });
     this.options = {
        headers: headers
     }       
  }

  loadToken()
  {
    const token =localStorage.getItem('token');
    this.authToken = token;
  }

  registerUser(user)
  {
    return this.http.post("http://localhost:3000/alumni/register", user);
  }

  checkEmail(email)
  {
    return this.http.get("http://localhost:3000/alumni/register"+email);
  }

  checkUsername(username)
  {
    return this.http.get("http://localhost:3000/alumni/register"+username);
  }

  login(user)
  {
      return this.http.post("http://localhost:3000/alumni/alumnilogin", user);
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  storeUserData(token,user)
  {
    localStorage.setItem('token',token);
    localStorage.setItem('user',user);
    this.authToken=token;
    this.user=user;
  }

  getAlumniProfile(){
   this.createAuthenticationHeaders();
   return this.http.get('http://localhost:3000/alumni/alumniprofile', this.options);
  }

 
loggedIn()
{
  return true;
}

getdetails(user)
{

  return this.http.post("http://localhost:3000/alumni/getdetails", { user });
}
updatedetails(user)
{
  return this.http.post("http://localhost:3000/alumni/updatedetails", user );
}
}