import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Faculty} from '../facultyprofile/faculty';
import { tokenName } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class FacultyService {


  constructor( private http:HttpClient) { }
   authToken;
   user;
  options;
  fac:Faculty;
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
     return this.http.post("https://mxiansportal.azurewebsites.net/faculty/facultylogin", user);
 }

 getdetails(user)
 {

   return this.http.post("https://mxiansportal.azurewebsites.net/faculty/getdetails", { user });
 }
 getUsername() {
  let user = localStorage.getItem('user');
 return user;
}

 logout(){
  this.authToken = null;
  this.user = null;
  localStorage.clear();
}
updateDetails(user)
{
  return this.http.post("https://mxiansportal.azurewebsites.net/faculty/updatedetails", user );
}
getAlumniNames()
{
  return this.http.get('https://mxiansportal.azurewebsites.net/faculty/alumniNames');

}

getAlumniDetails(username)
{
  return this.http.post('https://mxiansportal.azurewebsites.net/faculty/alumniDetails',{username});
}

getStudentDetails(user)
{
  return this.http.post('https://mxiansportal.azurewebsites.net/faculty/studentDetails',{user});
}



storeUserData(token,user)
{
  localStorage.setItem('token',token);
  localStorage.setItem('user',user);
  this.authToken=token;
  this.user=user;
}

}
