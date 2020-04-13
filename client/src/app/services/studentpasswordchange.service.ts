import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class StudentpasswordchangeService {

  constructor(private http : HttpClient) { }


  getCode(data)
  {
    return this.http.post('http://localhost:3000/changePassword/student',data);
  }

  verifyCode(data)
  {
    return this.http.post('http://localhost:3000/changePassword/student/code',data);
  }

  changePassword(data)
  {
    return this.http.post('http://localhost:3000/changePassword/student/code/changePassword',data);
  }
}

