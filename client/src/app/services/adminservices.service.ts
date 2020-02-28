import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { tokenName } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class AdminservicesService {



  constructor( private http : HttpClient) { }
  authToken;
  user;
 options;


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
  login(user)
  {
      return this.http.post("http://localhost:3000/admin/adminlogin", user);
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  storeUserData(token,user)
  {
    localStorage.setItem('token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken=token;
    this.user=user;
  }
  
  getAdminProfile(){
   this.createAuthenticationHeaders();
   return this.http.get('http://localhost:3000/admin/adminprofile', this.options);
  }

loggedIn()
{
  return true;
}
}