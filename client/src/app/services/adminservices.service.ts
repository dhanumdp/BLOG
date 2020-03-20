import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Clas} from '../adminprofile/clas';
import { tokenName } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class AdminservicesService {



  constructor( private http : HttpClient) { }
  authToken;
  user;
 options;

 Clas : Clas;
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

  createClass(cla)
  {
    
    return this.http.post('http://localhost:3000/admin/createClass',cla);
  }
  deleteClass(cla)
  {
    return this.http.post('http://localhost:3000/admin/deleteClass',cla);
  }

  createFaculty(fac)
  {
    return this.http.post('http://localhost:3000/admin/createFaculty',fac);
  }

  createPage(batch)
  {
    return this.http.post('http://localhost:3000/admin/createPage',batch);
  }

  deleteStudent(stud)
  {
    return this.http.post('http://localhost:3000/admin/deleteStudent',stud);
  }

  deleteFaculty(fac)
  {
    return this.http.post('http://localhost:3000/admin/deleteFaculty',fac);
  }

  getPages()
 {
   return this.http.get("http://localhost:3000/admin/getPages");
 }

 deletePage(page)
 {
   return this.http.post('http://localhost:3000/admin/deletePage', page);
 }

loggedIn()
{
  return true;
}
}