import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { tokenName } from '@angular/compiler';
import {Student} from '../studentprofile/student';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor( private http : HttpClient) { }
  authToken;
  user;
 options;
 stud:Student;
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
     return this.http.post("http://localhost:3000/student/studentlogin", user);
 }

 getdetails(user)
 {
   return this.http.post("http://localhost:3000/student/getdetails", { user });
 }

 updateDetails(user)
 {
   return this.http.post("http://localhost:3000/student/updatedetails", user );
 }
 getCollections()
 {
   return this.http.get("http://localhost:3000/student/getCollections");
 }

 logout(){
   this.authToken = null;
   this.user = null;
   localStorage.clear();
 }

 storeUserData(token,user, batch)
 {
   localStorage.setItem('token',token);
   localStorage.setItem('user',user);
   localStorage.setItem('batch', batch);
   this.authToken=token;
   this.user=user;
 }
  
 getRollno() {
   let user = localStorage.getItem('user');
  return user;
 }

 getBatch(){
   let batch = localStorage.getItem('batch');
   return batch;
 }


}
