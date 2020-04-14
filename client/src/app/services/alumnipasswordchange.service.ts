import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlumnipasswordchangeService {

  constructor( private http : HttpClient) { }

  getCode(data)
  {
    return this.http.post('http://localhost:3000/changePassword/alumni',data);
  }

  verifyCode(data)
  {
    return this.http.post('http://localhost:3000/changePassword/alumni/code',data);
  }

  changePassword(data)
  {
    return this.http.post('http://localhost:3000/changePassword/alumni/code/changePassword',data);
  }
}
