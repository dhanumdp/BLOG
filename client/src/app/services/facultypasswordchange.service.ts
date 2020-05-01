import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FacultypasswordchangeService {

  constructor(private http : HttpClient) { }


  getCode(data)
  {
    return this.http.post('https://mxiansportal.azurewebsites.net/changePassword/faculty',data);
  }

  verifyCode(data)
  {
    return this.http.post('https://mxiansportal.azurewebsites.net/changePassword/faculty/code',data);
  }

  changePassword(data)
  {
    return this.http.post('https://mxiansportal.azurewebsites.net/changePassword/faculty/code/changePassword',data);
  }
}
